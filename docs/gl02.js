onload = function(){
    var c = document.getElementById('canvas');
    c.width = 320;
    c.height = 240;
    
    var gl = c.getContext('webgl') || c.getContext('experimental-webgl');

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
};


function create_shader(id){
    var shader;

    var scriptElement = document.getElementById(id);

    if(!scriptElement){
        return;
    }

    switch(scriptElement.type){
        case 'x-shader/x-vartex':
            shader = gl.createShader(gl.VERTEX_SHADER);
            break;
        case 'x-shader/x-fragment':
            shader = gl.createShader(gl.FRAGMENT_SHADER);
            break;
            default :
            return;
    }
    gl.shaderSource(shader, scriptElement.text);

    gl.compileShader(shader);

    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        return shader;
    }
    else{
        alert(gl.getShaderInfoLog(shader));
    }
}

function create_program(vs, fs){
    var program = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    if(gl.getProgramParameter(program, gl.LINK_STATUS)){
        gl.useProgram(program);

        return program;
    }
    else{
        alert(gl.getprogramInfoLog(program));
    }
}