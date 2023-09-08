/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvasTurtle");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 350;
CANVAS_HEIGHT = canvas.height = 800;
const numberOfEnemies = 2;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = "../assets/turtle/turtleSpriteSheetTransparent.png";
        this.speed = Math.random() * 100 + 100;
        this.spriteWidth = 179;
        this.spriteHeight = 161;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * canvas.width;
        this.newY = Math.random() * canvas.height;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 50);
        this.interval = Math.floor(Math.random() * 1 + 200);
    
    }
    update(){
        if (gameFrame % this.interval === 0) {
            this.newX = Math.random() * canvas.width;
            this.newY = Math.random() * canvas.height; 
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;

        this.x -= dx/50;
        this.y -= dy/50;

        if (this.x + this.width < 0) this.x = canvas.width;

            if (gameFrame % this.flapSpeed === 0){
                this.frame > 2 ? this.frame = 0 : this.frame++;
            }
        }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
            this.x, this.y, this.width, this.height);
    }
};

for (let i = 0; i < numberOfEnemies; i++){
    enemiesArray.push(new Enemy());
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    enemiesArray.forEach(enemy => {
        enemy.update()
        enemy.draw()
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
