# hypergl

| branch   |   jest   | karma |
|:--------:|:----------:|:------:|
| master   |  [![Build Status](https://travis-ci.org/laopo001/hypergl.svg?branch=master)](https://travis-ci.org/laopo001/hypergl) | [![Build status](https://ci.appveyor.com/api/projects/status/j1lt85wxmd0ok3il/branch/master?svg=true)](https://ci.appveyor.com/project/laopo001/hypergl/branch/master) |
| develop  |    [![Build Status](https://travis-ci.org/laopo001/hypergl.svg?branch=develop)](https://travis-ci.org/laopo001/hypergl) |   [![Build status](https://ci.appveyor.com/api/projects/status/j1lt85wxmd0ok3il/branch/develop?svg=true)](https://ci.appveyor.com/project/laopo001/hypergl/branch/develop)  |



a simple 3d game engine

# Test

npm run test 

npm run test:browser (测试依赖浏览器的部分)

# Features
 * entity component system 
 * component: light, model, camera, script, audio, listener, etc.
 * support web-audio 3d (with howler)
 * fog
 * skybox
 * physical system and rigid-body
 * pbr material

# Roadmap
 * webgl2 -> webgl1
 * multiple scene manage

# examples
 * [3d-audio](https://stackblitz.com/edit/hypegl-3d-audio)
 * [skybox](https://stackblitz.com/edit/hypegl-skybox)
 * [gltf-loader](https://stackblitz.com/edit/hypegl-gltf)
 * [material](https://stackblitz.com/edit/hypegl-material)