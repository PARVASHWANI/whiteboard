let canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var io = io.connect('http://localhost:3000');

let ctx = canvas.getContext('2d');

let x;
let y; 
let mousedown = false;

window.onmousedown = (e) => {
    ctx.moveTo(x, y);
    io.emit('down', { x , y });
    mousedown = true;
}

window.onmouseup = (e) => {
    mousedown = false;
}

io.on('ondraw', ({x , y}) => {
    ctx.lineTo(x, y);
    ctx.stroke();
});

io.on("ondown", ({x, y}) => {
    ctx.moveTo(x, y);
});

window.onmousemove = (e) => {
    x = e.clientX;
    y = e.clientY;

    if (mousedown) {
        io.emit('draw', { x: x, y: y });
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}