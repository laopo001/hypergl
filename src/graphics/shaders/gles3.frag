#version 300 es
#define GL2
// #define varying in
out highp vec4 hyper_fragColor;
#define gl_FragColor hyper_fragColor
#define texture2D texture
#define textureCube texture
#define texture2DProj textureProj
#define texture2DLodEXT textureLod
#define texture2DProjLodEXT textureProjLod
#define textureCubeLodEXT textureLod
#define texture2DGradEXT textureGrad
#define texture2DProjGradEXT textureProjGrad
#define textureCubeGradEXT textureGrad
precision highp sampler2DShadow;
#define SHADER_NAME {{data.name}}
