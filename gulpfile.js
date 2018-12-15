const gulp = require('gulp')
const replace = require('gulp-replace')
const minimist = require('minimist');
const child_process = require('child_process');
var co = require('co');
var fs = require('fs');
var OSS = require('ali-oss')
var path = require('path');

var knownOptions = {
    string: 'demo',
    default: { demo: 0 }
};

var options = minimist(process.argv.slice(2), knownOptions);

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
// console.log(process.argv[3])




gulp.task('version', function (cb) {
    let text = fs.readFileSync('./package.json', {
        encoding: 'utf8'
    });
    let package = JSON.parse(text);
    let version = package.version;
    let [a, b] = version.split('-');
    let [c, d, e] = b.split('.');
    let dt = new Date().format('yyyyMMdd');
    if (dt === d) {
        e = parseInt(e) + 1;
    } else {
        d = dt;
        e = 0;
    }
    b = [c, d, e].join('.');
    version2 = [a, b].join('-');
    let res = text.replace(version, version2);
    fs.writeFileSync('./package.json', res);
    // child_process.execSync(`git commit -am "${version2}"`);
    // package.version = version2;
    // fs.writeFileSync('./package.json', JSON.stringify(package));
    cb();
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
// var client = new OSS({
//     region: '',
//     accessKeyId: '',
//     accessKeySecret: '',
//     bucket: ''
// });

// gulp.task('upload', ['replace', 'move'], function (cb) {
//     let files = getAllFiles(path.resolve(__dirname, './deploy'));
//     co(function* () {
//         for (let i = 0; i < files.length; i++) {
//             file = files[i];
//             // console.log(file,path.resolve(__dirname, file), demo);
//             var result = yield client.put(`webgl-learn/demo${options.demo}/${file}`, path.resolve(__dirname, file));
//             console.log(result.url);
//         }
//     }).then(cb).catch(function (err) {
//         console.log(err);
//     });
// });


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

gulp.task('replaceTests', function (cb) {
    let stream = gulp.src('./testsOnbrowser/**')
        .pipe(replace("'../src/index'", "'../dist/index'"))
        .pipe(gulp.dest('_temp'))
    return stream;
});