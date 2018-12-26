// DirLight or SpotLight
float CalcLightShadow(vec4 fragPosLightSpace, sampler2D shadowMap, int shadowType, float shadowMapSize, float shadowBias) {
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
    if(frustumTest) {
        if(shadowType == 1) {
            float shadowRadius = 1.0;
            vec2 texelSize = vec2( 1.0 ) / vec2( shadowMapSize );
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
        } else if (shadowType == 2) {
            float shadowRadius = 1.0;
            vec2 sizeVec2 = vec2( shadowMapSize );
            vec2 texelSize = vec2( 1.0 ) / sizeVec2;
            float dx0 = - texelSize.x * shadowRadius;
            float dy0 = - texelSize.y * shadowRadius;
            float dx1 = + texelSize.x * shadowRadius;
            float dy1 = + texelSize.y * shadowRadius;
            shadow = (
                texture2DShadowLerp( shadowMap, sizeVec2, projCoords.xy + vec2( dx0, dy0 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, sizeVec2, projCoords.xy + vec2( 0.0, dy0 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, sizeVec2, projCoords.xy + vec2( dx1, dy0 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, sizeVec2, projCoords.xy + vec2( dx0, 0.0 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, sizeVec2, projCoords.xy, currentDepth ) +
                texture2DShadowLerp( shadowMap, sizeVec2, projCoords.xy + vec2( dx1, 0.0 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, sizeVec2, projCoords.xy + vec2( dx0, dy1 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, sizeVec2, projCoords.xy + vec2( 0.0, dy1 ), currentDepth ) +
                texture2DShadowLerp( shadowMap, sizeVec2, projCoords.xy + vec2( dx1, dy1 ), currentDepth )
            ) * ( 1.0 / 9.0 );
        } else {
            shadow = texture2DCompare( shadowMap, projCoords.xy, currentDepth );
        }
    }
    return shadow;
}

float CalcPointLightShadow(samplerCube shadowMap, vec3 lightPosition, float range, int shadowType, float shadowMapSize, float shadowBias) {
    vec3  fragToLight =  v_vertex_position - lightPosition;
    float size = shadowMapSize;
    float currentDepth =  length(fragToLight);
    float bias = shadowBias;
    float shadow = 0.0;
    if(shadowType == 1 || shadowType == 2) {
        float offset = 1.0 / size;
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
    vec3 dir = v_vertex_position - lightPosition;
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