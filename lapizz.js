window.addEventListener("load", iniciar, false);
let Toolselect = "linea";
var r=0, g=0, b=0;
var c_r=0, c_g=0, c_b=0;
var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
var dibujos_g = {
    dibujos:
    {
    }
}

function iniciar() {
var limpiar = document.getElementById("limpiar");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
colores();
var cw = canvas.width = 500;
var ch = canvas.height = 500;
var reader = new FileReader();
var dibujar = false;
var Trazados = [];
var puntos = [];
ctx.lineJoin = "round";

limpiar.addEventListener('click', function(evt) {
dibujar = false;
ctx.clearRect(0, 0, cw, ch);
Trazados.length = 0;
puntos.length = 0;
dibujos_g = {
    dibujos:
    {
    }
};
}, false);


canvas.addEventListener('mousedown', function(evt) {
x1 = evt.layerX;
y1 = evt.layerY;
dibujar = true;
puntos.length = 0;
ctx.beginPath();

}, false);

canvas.addEventListener('mouseup', function(evt) {
dibujos_g.dibujos[Object.keys(dibujos_g.dibujos).length] = {"tipo":Toolselect,
"color_linea":{"r":r,"g":g,"b":b,},
"color_relleno":{"r":c_r,"g":c_g,"b":c_b,},
"x1":x1,"y1":y1,"x2":x2,"y2":y2};
redibujarTrazados();
redibujarfiguras();
}, false);

canvas.addEventListener("mouseout", function(evt) {
redibujarTrazados();
redibujarfiguras();
}, false);

canvas.addEventListener("mousemove", function(evt) {
if (dibujar) {
    if (Toolselect == "lapiz") {
        var m = oMousePos(canvas, evt);
        puntos.push(m);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
    } else {
        ctx.closePath();
        ctx.clearRect(0, 0, cw, ch);
        x2 = evt.layerX;
        y2 = evt.layerY;
        redibujarTrazados();
        dibujar = true;
        redibujarfiguras();
        dibujar_figuras(Toolselect, x1,x2,y1,y2,r,g,b,c_r,c_g,c_b);
    }
}
}, false);

function reducirArray(elArray) {
var nuevoArray = [];
nuevoArray[0] = elArray[0];
for (var i = 0; i < elArray.length; i++) {
    if (true) {
    nuevoArray[nuevoArray.length] = elArray[i];
    }
}
nuevoArray[nuevoArray.length - 1] = elArray[elArray.length - 1];
Trazados.push(nuevoArray);
}
function alisarTrazado(ry) {
if (ry.length > 1) {
    //console.log(ry)
    /* ry.map((row) =>{
    console.log("trazados: "+row.x)
}) */
    //var ultimoPunto = ry.length - 1;
    ctx.beginPath();
    ctx.moveTo(ry[0].x, ry[0].y);
    for (i = 1; i < ry.length - 2; i++) {
        ctx.lineTo(ry[i].x, ry[i].y);
    }
    ctx.stroke();
}
}


function redibujarTrazados(){
dibujar = false;
ctx.clearRect(0, 0, cw, ch);
reducirArray(puntos);
for(var i = 0; i < Trazados.length; i++)
alisarTrazado(Trazados[i]);
}
function redibujarfiguras(){
    for (let i = 0; i < Object.keys(dibujos_g.dibujos).length; i++) {
        
        dibujar_figuras(dibujos_g.dibujos[i].tipo, dibujos_g.dibujos[i].x1,dibujos_g.dibujos[i].x2,dibujos_g.dibujos[i].y1,dibujos_g.dibujos[i].y2,
            dibujos_g.dibujos[i].color_linea.r,
            dibujos_g.dibujos[i].color_linea.g,
            dibujos_g.dibujos[i].color_linea.b,
            dibujos_g.dibujos[i].color_relleno.r,
            dibujos_g.dibujos[i].color_relleno.g,
            dibujos_g.dibujos[i].color_relleno.b);
    }
}

function oMousePos(canvas, evt) {
var ClientRect = canvas.getBoundingClientRect();
return {
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
}
}

    
function dibujar_figuras(dibujo, x1,x2,y1,y2,r,g,b,c_r,c_g,c_b){
    ctx.strokeStyle = "rgb("+r+", "+g+", "+b+")";
    ctx.fillStyle = "rgb("+c_r+", "+c_g+", "+c_b+")";
    ctx.beginPath();
    if (dibujo == "linea") {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    } else if (dibujo == "elipse"){
        var dx = Math.sqrt(Math.pow(x2-x1,2));
        var dy = Math.sqrt(Math.pow(y2-y1,2));
        ctx.ellipse(x1, y1,dx,dy,Math.PI / 4,0,2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
    } else if (dibujo == "circulo"){
        var radio = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
        ctx.arc(x1, y1, radio, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
    } else if (dibujo == "rectangulo"){
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y1);
        ctx.lineTo(x2, y2);
		ctx.lineTo(x1, y2);
		ctx.lineTo(x1, y1);
        ctx.fill(); 
        ctx.stroke();
        
    } else if (dibujo == "cuadrado"){
        var distancia = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
        ctx.moveTo(x1, y1);
        if (x2 > x1 && y2 < y1) {
            ctx.lineTo(x1+distancia, y1); 
            ctx.lineTo(x1+distancia, y1-distancia); 
            ctx.lineTo(x1, y1-distancia); 
            ctx.lineTo(x1, y1); 
        } else if (x2 > x1 && y2 > y1) {
            ctx.lineTo(x1+distancia, y1); 
            ctx.lineTo(x1+distancia, y1+distancia); 
            ctx.lineTo(x1, y1+distancia); 
            ctx.lineTo(x1, y1); 
        } 
        else if (x2 < x1 && y2 > y1) {
            ctx.lineTo(x1-distancia, y1); 
            ctx.lineTo(x1-distancia, y1+distancia); 
            ctx.lineTo(x1, y1+distancia); 
            ctx.lineTo(x1, y1); 
        } 
        else if (x2 < x1 && y2 < y1) {
            ctx.lineTo(x1-distancia, y1); 
            ctx.lineTo(x1-distancia, y1-distancia); 
            ctx.lineTo(x1, y1-distancia); 
            ctx.lineTo(x1, y1); 
    }
    ctx.fill();
    ctx.stroke(); 
    }
}
function colores(){
var input = document.querySelectorAll("input");
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("input", function(){
        r = document.getElementById("red").value,
        g = document.getElementById("green").value,
        b = document.getElementById("blue").value,
        c_r = document.getElementById("c_red").value,
        c_g = document.getElementById("c_green").value,
        c_b = document.getElementById("c_blue").value;
        var display = document.getElementById("display");
        display.style.background = "rgba("+r+", "+g+", "+b+")";
        display = document.getElementById("c_display")
        display.style.background = "rgba("+c_r+", "+c_g+", "+c_b+")";
    });
}
}

document.getElementById('save').addEventListener('click', () => {
    var canvasContents = canvas.toDataURL();
    var data = { image: canvasContents, date: Date.now() };
    var string = JSON.stringify(data);

    var file = new Blob([string], {
      type: 'application/json'
    });

    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'draw.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  document.getElementById('load').addEventListener('change', function() {
    if (this.files[0]) {
      reader.readAsText(this.files[0]);
    }
  });

  reader.onload = function() {
    var data = JSON.parse(reader.result);
    var image = new Image();
    image.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);
    }
    image.src = data.image;
  };

}
function Select(botonClicked){
    document.getElementById("linea").className = "btn btn-no";
    document.getElementById("lapiz").className = "btn btn-no";
    document.getElementById("elipse").className = "btn btn-no";
    document.getElementById("circulo").className = "btn btn-no";
    document.getElementById("rectangulo").className = "btn btn-no";
    document.getElementById("cuadrado").className = "btn btn-no";
    document.getElementById(botonClicked).className = "btn btn-yes";
    Toolselect = botonClicked;
}