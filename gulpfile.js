const gulp = require('gulp')
const replace = require('gulp-replace')
const minimist = require('minimist');
var knownOptions = {
    string: 'demo',
    default: { demo: 0 }
};

var options = minimist(process.argv.slice(2), knownOptions);


// console.log(process.argv[3])

var co = require('co');
var fs = require('fs');
var OSS = require('ali-oss')
var path = require('path');
var client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'KyVKg6tfdreplWYe',
    accessKeySecret: 'mg9bzeiZKfCiBfi6v2KtSZMZKr2QUB',
    bucket: 'dadigua'
});



gulp.task('replace', function (cb) {
    let stream = gulp.src(['./build/**', '!./build/assets/**'])
        .pipe(replace('script src="', `script src="http://dadigua.oss-cn-shenzhen.aliyuncs.com/webgl-learn/demo${options.demo}/deploy/`))
        .pipe(replace('sourceMappingURL=', `sourceMappingURL=http://dadigua.oss-cn-shenzhen.aliyuncs.com/webgl-learn/demo${options.demo}/deploy/`))
        .pipe(gulp.dest('deploy'))
    return stream;
});

gulp.task('move', function (cb) {
    let stream = gulp.src('./build/assets/**')
        .pipe(gulp.dest('deploy/assets'))
    return stream;
});

gulp.task('upload', ['replace', 'move'], function (cb) {
    let files = getAllFiles(path.resolve(__dirname, './deploy'));
    co(function* () {
        for (let i = 0; i < files.length; i++) {
            file = files[i];
            // console.log(file,path.resolve(__dirname, file), demo);
            var result = yield client.put(`webgl-learn/demo${options.demo}/${file}`, path.resolve(__dirname, file));
            console.log(result.url);
        }
    }).then(cb).catch(function (err) {
        console.log(err);
    });
});


function getAllFiles(root) {
    var res = [], files = fs.readdirSync(root);
    files.forEach(function (file) {
        var pathname = root + '/' + file
            , stat = fs.lstatSync(pathname);

        if (!stat.isDirectory()) {
            res.push(path.relative(__dirname, pathname));
        } else {
            res = res.concat(getAllFiles(pathname));
        }
    });
    return res
}