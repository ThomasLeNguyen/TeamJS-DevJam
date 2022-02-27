const canvas = document.getElementById("gameArea");
const context = canvas.getContext("2d");

let keys = { w: false, a: false, s: false, d: false, }

document.documentElement.style.cursor = "url(img/base_aim.png), auto";

addEventListener("keydown", event => {
    if(event.key === "w") keys.w = true;
    // if(keys.w) console.log("W key pressed!");
    if(event.key === "a") keys.a = true;
    // if(keys.a) console.log("A key pressed!");
    if(event.key === "s") keys.s = true;
    // if(keys.s) console.log("S key pressed!");
    if(event.key === "d") keys.d = true;
    // if(keys.d) console.log("D key pressed!");
});

addEventListener("keyup", event => {
    if(event.key === "w") keys.w = false;
    // if(!keys.w) console.log("W key unpressed!");
    if(event.key === "a") keys.a = false;
    // if(!keys.a) console.log("A key unpressed!");
    if(event.key === "s") keys.s = false;
    // if(!keys.s) console.log("S key unpressed!");
    if(event.key === "d") keys.d = false;
    // if(!keys.d) console.log("D key unpressed!");
});

let mouseClick = false;
addEventListener('click', event => {
    console.log("Click");
    mouseClick = true;
});

// All images will use this class
class GameImage {
    constructor(img, xPos, yPos, imgSize, speed, canMove, timer, xRand, yRand, isMC, isAlive, isCoin) {
        this.img = new Image();
        this.img.src = img;
        this.xPos = xPos;
        this.yPos = yPos;
        this.imgSize = imgSize;
        this.speed = speed;
        this.canMove = canMove;
        this.timer = timer;
        this.xRand = xRand;
        this.yRand = yRand;
        this.isMC = isMC;
        this.isAlive = isAlive;
        this.isCoin = isCoin;
    }

    moveX() {
        if (this.canMove) {
            if (keys.d && this.xPos < 725) return this.xPos + this.speed;
            if (keys.a && this.xPos > -20) return this.xPos - this.speed;
        } else {
            if (this.timer <= 36) {
                if (this.xPos < 700 && this.xRand > 0.50) return this.xPos + this.speed;
                if (this.xPos > -20 && this.xRand < 0.50) return this.xPos - this.speed;
            }
        }

        return this.xPos;
    }

    moveY() {
        if (this.canMove) {
            if (keys.w && this.yPos > -20) return this.yPos - this.speed;
            if (keys.s && this.yPos < 500) return this.yPos + this.speed;
        } else {
            if (this.timer <= 36) {
                if (this.yPos > -20 && this.yRand < 0.50) return this.yPos - this.speed;
                if (this.yPos < 500 && this.yRand > 0.50) return this.yPos + this.speed;
            }
        }

        return this.yPos;
    }

    characterXPos() {
        if (this.isMC) return this.xPos;
    }

    characterYPos() {
        if (this.isMC) return this.yPos;
    }

    distanceFromCoins(mcXPos, mcYPos) {
        if (this.isCoin) {
            // console.log("Coin x Pos", this.xpos, "Coin y Pos", this.ypos);
            let dis = Math.sqrt(Math.abs(Math.sqrt(mcXPos * this.xPos)) + Math.abs(Math.sqrt(mcYPos * this.yPos)));
            console.log(dis);
        }
    }

    update() {
        if (this.timer == 0 || this.timer >= 39) {
            this.xRand = Math.random();
            this.yRand = Math.random();
            this.timer = 0;
        }

        this.timer = this.timer + Math.random();

        if (this.isCoin) {
            //this.distanceFromCoins();
        }
    }

    place(context) {
        this.update();
        this.xPos = this.moveX();
        this.yPos = this.moveY();
        context.drawImage(this.img, this.xPos, this.yPos, this.imgSize, this.imgSize);
    }
}

// Array of GameImages
let images = []
// X Position of Images
let xpos;
// Y Position of Images
let ypos;

// Slime Size
let slimeSize = 96;
// Slime Spawn
for (i = 0; i < 20; i++) {
    xpos = Math.random() * 650;
    ypos = Math.random() * 450;
    let img = new GameImage('img/slime_base.png', xpos, ypos, slimeSize, 1.5, false, 0, 0.5, 0.5, false, true, false);
    images.push(img);
}

let img = new GameImage('img/slime_base.png', xpos, ypos, slimeSize, 1.5, true, 0, 0, 0, false, true, false);
images.push(img);

// Coin Size
let coinSize = 64;
// Coin x Position
let coinXPos = [100, 200, 300];
// Coin y Position
let coinYPos = [100, 200, 300];
// Coin Spawn
for (i = 0; i < 1; i++) {
    img = new GameImage('img/coin.png', coinXPos[i], coinYPos[i], coinSize, 0, false, 0, 0, 0, false, false, true);
    images.push(img);
}

// Crosshair
function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    img = new GameImage('img/base_aim_1.png', x, y, 100, 0, false, i , 0 ,0 ,0 , true, false, false);
}

function placeImages() {
    context.clearRect(0, 0, 800, 600);

    images.forEach(element => {
        element.place(context);
    });

    requestAnimationFrame(placeImages);
}

// Prints the Array of GameImages
// console.log(images);
placeImages();