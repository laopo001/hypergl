/*
 * ProjectName: hypergl
 * FilePath: \demo\index8.ts
 * Created Date: Friday, November 9th 2018, 8:38:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, November 23rd 2018, 1:24:14 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Entity, Script, StandardMaterial, Config } from '../src';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Rotate } from './utils/rotate';
import { Vec3 } from '../src/math';
import { Color } from '../src/core';
import { Constructor } from 'src/types';


async function main() {
    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    console.log(app);
    let material = new StandardMaterial();
    material.diffuseColor.set(1, 0, 1);
    material.update();


    let camera = new Entity('camera')
        .addComponent('camera', {
            type: 'perspective',
            perspective: {
                fov: 90,
                aspectRatio: app.canvas.width / app.canvas.height,
                near: 1,
                far: 10000
            }
        })
        .setPosition(-2, 5, 10).lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 0.5 })]);
    app.scene.root.addChild(camera);

    let light = new Entity('light')
        .addComponent('light', {
            type: 'directional',
            castShadows: true
        })
        .setPosition(0, 2, 0);
    app.scene.root.addChild(light);


    let box = new Entity('box')
        .addComponent('model', {
            type: 'box'
        })
        .setLocalPosition(-1, 0, 0);

    let box2 = new Entity('box2')
        .addComponent('model', {
            type: 'box'
        }).setLocalPosition(1, 0, 0);

    let temp = new Entity('temp');
    temp.addChild(box).addChild(box2);
    temp.addComponent('script', [new Rotate({ speed: 2 })]);

    box.model!.material = material;
    app.scene.root.addChild(temp);

    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane'
        })
        .setPosition(0, -2, 0).setLocalScale(10, 1, 10);

    app.scene.root.addChild(plane);

    app.start();
}

main();

function classDecorator(arr: string[]) {
    return function fn(c: Constructor<Greeter>) {
        return class extends c {
            constructor() {
                super();
                arr.forEach(key => {
                    Object.defineProperty(this, key, {
                        get: () => { return 'get'; },
                        set: () => { return 'set'; },
                    });
                });
            }
        };
    };

}
interface I {
    range: string;
}

@classDecorator(['range'])
class Greeter implements I {
    name = 123;
    range!: string;
}

let g = new Greeter();
console.log((g as any).range);


