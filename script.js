const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);  
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'white';
ctx.fillRect(1, 1, 2, 2);

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // setting canvas objects Removes all the drawing on the canvas
});

const colours = {
    0: 'red', 1: 'blue', 2: 'green', 3: 'yellow', 4: 'white', 5: 'black', 6: 'pink', 7: 'cyan', 8: 'seagreen', 9: 'golden', 10: 'peach'
}

const mouse = {
    x:undefined,
    y:undefined
}
let follow = false;

canvas.addEventListener('click', (event) => {
    follow = !follow;
})

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
}) 

class Particle{
    constructor(fill='cyan'){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*9 + 1;
        this.vx = Math.random()*4 - 2;
        this.vy = Math.random()*4 - 2;
        this.fill = fill
    }
    update(){
        this.x += this.vx;
        this.y += this.vy;
        if(follow !== undefined && follow && mouse !== undefined && mouse.x !== undefined && mouse.y !== undefined){
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            this.x += 2 * dx / Math.abs(dx);
            this.y += 2 * dy / Math.abs(dy);
        }
        if(this.x >= canvas.width || this.x <= 0){
            this.vx = -this.vx;
            this.x += this.vx;
        }
        if(this.y >= canvas.height || this.y <= 0){
            this.vy = -this.vy;
            this.y += this.vy;
        }


    }
    draw(size=this.size, fill=this.fill){
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(this.x,this.y,size,0,Math.PI*2);
        ctx.fill();           
    }
}

const particles = [];

const init = (num=300) => {
    for(let i=0; i<num; ++i){
        particles.push(new Particle());
    }    
}
init();

const generate = () => {    
    for(let i=0; i<particles.length; ++i){
        particles[i].update();
        let color = colours[Math.floor(Math.random()*10)];
        particles[i].draw(Math.random()*15 + 1, color); //blinking particles
    }
}

const animate = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    generate();
    requestAnimationFrame(animate);
}
animate();
