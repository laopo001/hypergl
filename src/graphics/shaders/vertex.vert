#version 300 es
in vec4 a_Position;
in vec4 a_Color;
uniform mat4 u_MvpjMatrix;
out vec4 v_Color;

void main(){  
    gl_Position = u_MvpjMatrix * a_Position;
    v_Color = a_Color;
}