{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;

uniform vec4 ambientColor;
uniform vec4 diffuseColor;
uniform sampler2D diffuseTexture;
uniform vec2 diffuseMapOffset;
uniform vec4 specularColor;
uniform vec4 specularTexture;
uniform float shininess;
uniform vec3 uCameraPosition;
uniform float opacity;
uniform sampler2D opacityTexture;
uniform float fogDensity;
uniform vec3 fogColor;
uniform vec2 fogDist;
// directionalLight start
{{#each uniforms._directionalLightArr}}
uniform vec4 {{this.color}};
uniform vec3 {{this.direction}};
uniform sampler2D {{this.shadowMap}};
uniform mat4 {{this.lightSpaceMatrix}};
uniform int {{this.shadowType}};
uniform vec2 {{this.shadowMapSize}};
uniform float {{this.shadowBias}};
{{/each}}
// directionalLight end
// pointLight start
{{#each uniforms._pointLightArr}}
uniform vec3 {{this.position}};
uniform vec4 {{this.color}};
uniform float {{this.range}};
uniform samplerCube {{this.shadowMap}};
uniform int {{this.shadowType}};
uniform vec2 {{this.shadowMapSize}};
uniform float {{this.shadowBias}};
{{/each}}
// pointLight end
// soptLight start
{{#each uniforms._spotLightArr}} 
uniform vec3 {{this.position}};
uniform vec3 {{this.direction}};
uniform vec4 {{this.color}};
uniform float {{this.range}};
uniform float {{this.innerConeAngle}};
uniform float {{this.outerConeAngle}};
uniform sampler2D {{this.shadowMap}};
uniform mat4 {{this.lightSpaceMatrix}};
uniform int {{this.shadowType}};
uniform vec2 {{this.shadowMapSize}};
uniform float {{this.shadowBias}};
{{/each}}
// soptLight end

//////////////
in vec2 out_vertex_texCoord0;
in vec3 out_normal;
in vec3 out_vertex_position;

vec3 getDiffuseColor;

// {{#if attributes.vertex_color}}
// in vec4 vColor;
// vec4 getOutColor() {
//     return vColor;
// }
// {{else}}
// {{/if}}
vec3 getOutDiffuseColor() {
    {{#if uniforms.diffuseTexture}}
    return texture2D(diffuseTexture, out_vertex_texCoord0 - diffuseMapOffset).rgb;
    {{else}}
    return diffuseColor.rgb;
    {{/if}}
}

{{> fog.frag}}

vec4 getOutSpecularColor() {
    {{#if uniforms.specularTexture}}
    return texture2D(specularTexture, out_vertex_texCoord0);
    {{else}}
    return specularColor;
    {{/if}}
}

float getOutOpacityColor() {
    {{#if uniforms.opacityTexture}}
    return texture2D(opacityTexture, out_vertex_texCoord0).r;
    {{else}}
    return opacity;
    {{/if}}
}


const float PackUpscale = 256. / 255.;
const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
    vec4 r = vec4( fract( v * PackFactors ), v );
    r.yzw -= r.xyz * ShiftRight8;
    return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
    return dot( v, UnpackFactors );
}
vec3 lessThan2(vec3 a, vec3 b) {
    return clamp((b - a)*1000.0, 0.0, 1.0);
    // softer version
}

float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
    return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
}

float texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {
    const vec2 offset = vec2( 0.0, 1.0 );
    vec2 texelSize = vec2( 1.0 ) / size;
    vec2 centroidUV = floor( uv * size + 0.5 ) / size;
    float lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );
    float lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );
    float rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );
    float rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );
    vec2 f = fract( uv * size + 0.5 );
    float a = mix( lb, lt, f.y );
    float b = mix( rb, rt, f.y );
    float c = mix( a, b, f.x );
    return c;
}
// DirLight or SpotLight
float CalcLightShadow(vec4 fragPosLightSpace, sampler2D shadowMap, int shadowType, vec2 shadowMapSize, float shadowBias) {
    // 执行透视除法
    vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
      // 变换到[0,1]的范围
    projCoords = projCoords * 0.5 + 0.5;
    float currentDepth = projCoords.z - shadowBias;
    bvec4 inFrustumVec = bvec4 ( projCoords.x >= 0.0, projCoords.x <= 1.0, projCoords.y >= 0.0, projCoords.y <= 1.0 );
    bool inFrustum = all( inFrustumVec );
    bvec2 frustumTestVec = bvec2( inFrustum, projCoords.z <= 1.0 );
    bool frustumTest = all( frustumTestVec );
    float shadow = 0.0;
    // if(frustumTest) {
        if(shadowType == 1) {
            float shadowRadius = 1.0;
            vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
            float dx0 = - texelSize.x * shadowRadius;
            float dy0 = - texelSize.y * shadowRadius;
            float dx1 = + texelSize.x * shadowRadius;
            float dy1 = + texelSize.y * shadowRadius;
            shadow = (
                texture2DCompare( shadowMap, projCoords.xy + vec2( dx0, dy0 ), currentDepth ) +
                texture2DCompare( shadowMap, projCoords.xy + vec2( 0.0, dy0 ), currentDepth ) +
                texture2DCompare( shadowMap, projCoords.xy + vec2( dx1, dy0 ), currentDepth ) +
                texture2DCompare( shadowMap, projCoords.xy + vec2( dx0, 0.0 ), currentDepth ) +
                texture2DCompare( shadowMap, projCoords.xy, currentDepth ) +
                texture2DCompare( shadowMap, projCoords.xy + vec2( dx1, 0.0 ), currentDepth ) +
                texture2DCompare( shadowMap, projCoords.xy + vec2( dx0, dy1 ), currentDepth ) +
                texture2DCompare( shadowMap, projCoords.xy + vec2( 0.0, dy1 ), currentDepth ) +
                texture2DCompare( shadowMap, projCoords.xy + vec2( dx1, dy1 ), currentDepth )
            ) * ( 1.0 / 9.0 );
        } else if (shadowType==2) {
            float shadowRadius = 1.0;
            vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
            float dx0 = - texelSize.x * shadowRadius;
            float dy0 = - texelSize.y * shadowRadius;
            float dx1 = + texelSize.x * shadowRadius;
            float dy1 = + texelSize.y * shadowRadius;
            shadow = (
                texture2DShadowLerp( shadowMap, shadowMapSize, projCoords.xy + vec2( dx0, dy0 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, shadowMapSize, projCoords.xy + vec2( 0.0, dy0 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, shadowMapSize, projCoords.xy + vec2( dx1, dy0 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, shadowMapSize, projCoords.xy + vec2( dx0, 0.0 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, shadowMapSize, projCoords.xy, currentDepth ) +
                texture2DShadowLerp( shadowMap, shadowMapSize, projCoords.xy + vec2( dx1, 0.0 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, shadowMapSize, projCoords.xy + vec2( dx0, dy1 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, shadowMapSize, projCoords.xy + vec2( 0.0, dy1 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, shadowMapSize, projCoords.xy + vec2( dx1, dy1 ), currentDepth )
            ) * ( 1.0 / 9.0 );
        } else {
            shadow = texture2DCompare( shadowMap, projCoords.xy, currentDepth );
        }
    // }
    return shadow;
}



// 计算方向
vec3 CalcDirLight(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightDirection) {
    vec3 lightDir = normalize(-lightDirection);
    // 计算漫反射强度
    float diff = max(dot(normal, lightDir), 0.0);
    // 计算镜面反射强度
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    // 合并各个光照分量
    vec3 diffuse  = lightColor * diff * getDiffuseColor.xyz;
    vec3 specular = lightColor * spec * getOutSpecularColor().xyz;
    return diffuse + specular;
}  



float CalcPointLightShadow(samplerCube shadowMap, vec3 lightPosition, float range, int shadowType, vec2 shadowMapSize, float shadowBias) {
    vec3  fragToLight =  out_vertex_position - lightPosition;
    float size = shadowMapSize[0];
    float currentDepth =  length(fragToLight);
    float bias = shadowBias;
    float shadow = 0.0;
    if(shadowType == 1 || shadowType == 2) {
        float offset = 1.0 / size; // 2048.0
        for(float x = -offset; x <= offset; x += offset)
        {
            for(float y = -offset; y <= offset; y += offset)
            {
                for(float z = -offset; z <= offset; z += offset)
                {  
                    float closestDepth = unpackRGBAToDepth(texture(shadowMap, fragToLight + vec3(x, y, z))); 
                    closestDepth *= range;   // Undo mapping [0;1]
                    shadow += step(currentDepth - bias, closestDepth);
                    // if(currentDepth - bias > closestDepth)
                    //     shadow += 1.0;
                }
            }
        }
        shadow /= 27.0;
    } else {
        float closestDepth = unpackRGBAToDepth( texture(shadowMap, fragToLight ) ); 
        closestDepth *= range;
        shadow += step(currentDepth - bias, closestDepth);
    }
    return shadow;
}

float CalcPointLightShadowPCF3x3(samplerCube shadowMap, vec3 lightPosition, float range) {
    vec3 dir = out_vertex_position - lightPosition;
    vec4 shadowParams = vec4(2048, 0.0500, -0.0020, 0.1250);
    vec3 tc = normalize(dir);
    vec3 tcAbs = abs(tc);
    vec4 dirX = vec4(1, 0, 0, tc.x);
    vec4 dirY = vec4(0, 1, 0, tc.y);
    float majorAxisLength = tc.z;
    if ((tcAbs.x > tcAbs.y) && (tcAbs.x > tcAbs.z)) {
        dirX = vec4(0, 0, 1, tc.z);
        dirY = vec4(0, 1, 0, tc.y);
        majorAxisLength = tc.x;
    }
    else if ((tcAbs.y > tcAbs.x) && (tcAbs.y > tcAbs.z)) {
        dirX = vec4(1, 0, 0, tc.x);
        dirY = vec4(0, 0, 1, tc.z);
        majorAxisLength = tc.y;
    }
    float shadowParamsInFaceSpace = ((1.0/shadowParams.x) * 2.0) * abs(majorAxisLength);
    vec3 xoffset = (dirX.xyz * shadowParamsInFaceSpace);
    vec3 yoffset = (dirY.xyz * shadowParamsInFaceSpace);
    vec3 dx0 = -xoffset;
    vec3 dy0 = -yoffset;
    vec3 dx1 = xoffset;
    vec3 dy1 = yoffset;
    mat3 shadowKernel;
    mat3 depthKernel;
    depthKernel[0][0] = unpackRGBAToDepth(textureCube(shadowMap, tc + dx0 + dy0));
    depthKernel[0][1] = unpackRGBAToDepth(textureCube(shadowMap, tc + dx0));
    depthKernel[0][2] = unpackRGBAToDepth(textureCube(shadowMap, tc + dx0 + dy1));
    depthKernel[1][0] = unpackRGBAToDepth(textureCube(shadowMap, tc + dy0));
    depthKernel[1][1] = unpackRGBAToDepth(textureCube(shadowMap, tc));
    depthKernel[1][2] = unpackRGBAToDepth(textureCube(shadowMap, tc + dy1));
    depthKernel[2][0] = unpackRGBAToDepth(textureCube(shadowMap, tc + dx1 + dy0));
    depthKernel[2][1] = unpackRGBAToDepth(textureCube(shadowMap, tc + dx1));
    depthKernel[2][2] = unpackRGBAToDepth(textureCube(shadowMap, tc + dx1 + dy1));
    // depthKernel *= range;
    vec3 shadowZ = vec3(length(dir) * shadowParams.w + shadowParams.z);
    shadowKernel[0] = vec3(lessThan2(depthKernel[0], shadowZ));
    shadowKernel[1] = vec3(lessThan2(depthKernel[1], shadowZ));
    shadowKernel[2] = vec3(lessThan2(depthKernel[2], shadowZ));
    vec2 uv = (vec2(dirX.w, dirY.w) / abs(majorAxisLength)) * 0.5;
    vec2 fractionalCoord = fract( uv * shadowParams.x );
    shadowKernel[0] = mix(shadowKernel[0], shadowKernel[1], fractionalCoord.x);
    shadowKernel[1] = mix(shadowKernel[1], shadowKernel[2], fractionalCoord.x);
    vec4 shadowValues;
    shadowValues.x = mix(shadowKernel[0][0], shadowKernel[0][1], fractionalCoord.y);
    shadowValues.y = mix(shadowKernel[0][1], shadowKernel[0][2], fractionalCoord.y);
    shadowValues.z = mix(shadowKernel[1][0], shadowKernel[1][1], fractionalCoord.y);
    shadowValues.w = mix(shadowKernel[1][1], shadowKernel[1][2], fractionalCoord.y);
    return 1.0 - dot( shadowValues, vec4( 1.0 ) ) * 0.25;
}


// 计算定点光在确定位置的光照颜色
vec3 CalcPointLight(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightPosition, float range) {
    vec3 lightDirection = normalize(out_vertex_position - lightPosition);
    vec3 color = CalcDirLight(normal, viewDir, lightColor, lightDirection);
    float distance = length(lightPosition - out_vertex_position);
    if(distance > range){
        return vec3(0);
    } else {
        return color * (1.0 - distance / range);
    }
}


vec3 CalcSpotLight(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightPosition, vec3 direction, float range, float innerConeAngle, float outerConeAngle) {
    vec3 lightDirection = out_vertex_position - lightPosition;
    vec3 lightDirectionNorm = normalize(lightDirection);
    float cosAngle = dot(lightDirectionNorm, direction);
    float f = smoothstep(outerConeAngle, innerConeAngle, cosAngle);
    vec3 color = CalcPointLight(normal, viewDir, lightColor, lightPosition, range) * f;    
    return color;
}  



void main(void) {
    // vec4 outColor = getOutColor();
    getDiffuseColor = getOutDiffuseColor();
    vec3 norm = normalize(out_normal);
    vec3 viewDir = normalize(uCameraPosition - out_vertex_position);

    // start
    vec3 result = ambientColor.xyz * getDiffuseColor.xyz;
    {{#each uniforms._directionalLightArr}}

    {{#if this.castShadows}}
        float shadow = CalcLightShadow({{this.lightSpaceMatrix}} * vec4(out_vertex_position, 1.0), {{this.shadowMap}}, {{this.shadowType}}, {{this.shadowMapSize}}, {{this.shadowBias}});    
        vec3 color = CalcDirLight(norm, viewDir, vec3({{this.color}}), {{this.direction}});
        result += shadow * color;
    {{else}}
        result += CalcDirLight(norm, viewDir, vec3({{this.color}}), {{this.direction}} );
    {{/if}}

    {{/each}}
    {{#each uniforms._pointLightArr}}

    {{#if this.castShadows}}
        float shadow = CalcPointLightShadow({{this.shadowMap}}, {{this.position}}, {{this.range}}, {{this.shadowType}}, {{this.shadowMapSize}}, {{this.shadowBias}});    
        vec3 color = CalcPointLight(norm, viewDir, vec3({{this.color}}), {{this.position}}, {{this.range}});
        result += shadow * color;
    {{else}}
        result += CalcPointLight(norm, viewDir, vec3({{this.color}}), {{this.position}}, {{this.range}} );
    {{/if}}
    
    {{/each}}
    {{#each uniforms._spotLightArr}}

    {{#if this.castShadows}}
        vec3 color = CalcSpotLight(norm, viewDir, vec3({{this.color}}), {{this.position}}, {{this.direction}}, {{this.range}}, {{this.innerConeAngle}}, {{this.outerConeAngle}} );
        float shadow = CalcLightShadow({{this.lightSpaceMatrix}} * vec4(out_vertex_position, 1.0), {{this.shadowMap}}, {{this.shadowType}}, {{this.shadowMapSize}}, {{this.shadowBias}});    
        result += shadow * color;
    {{else}}
        result += CalcSpotLight(norm, viewDir, vec3({{this.color}}), {{this.position}}, {{this.direction}}, {{this.range}}, {{this.innerConeAngle}}, {{this.outerConeAngle}} );
    {{/if}}
    
    {{/each}}
    // end
    
    // {{#ifEq uniforms.fog 1}}
    // float fogFactor = (fogDist.y - out_Dist) / (fogDist.y - fogDist.x);
    // result = mix(fogColor, vec3(result), clamp(fogFactor, 0.0, 1.0));
    // {{/ifEq}}
    result = addFog(result);
    // result = ambient + diffuse + specular;
    gl_FragColor = vec4(result, getOutOpacityColor());

}

