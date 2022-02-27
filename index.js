const canvas = document.getElementById("gameArea");
const context = canvas.getContext("2d");

let keys = { w: false, a: false, s: false, d: false }
let leftClick = false;
let mouseX = null;
let mouseY = null;
document.documentElement.style.cursor = "url(img/base_aim.png), auto";

addEventListener("keydown", event => {
    if (event.key === "w") keys.w = true;
    if (event.key === "a") keys.a = true;
    if (event.key === "s") keys.s = true;
    if (event.key === "d") keys.d = true;
    // if(keys.w) console.log("W key pressed!");
    // if(keys.a) console.log("A key pressed!");
    // if(keys.s) console.log("S key pressed!");
    // if(keys.d) console.log("D key pressed!");
});

addEventListener("keyup", event => {
    if (event.key === "w") keys.w = false;
    if (event.key === "a") keys.a = false;
    if (event.key === "s") keys.s = false;
    if (event.key === "d") keys.d = false;
    // if(!keys.w) console.log("W key unpressed!");
    // if(!keys.a) console.log("A key unpressed!");
    // if(!keys.s) console.log("S key unpressed!");
    // if(!keys.d) console.log("D key unpressed!");
});

addEventListener("click", event => {
    leftClick = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// All images will use this class
class GameImage {
    constructor(img, xpos, ypos, wdh, hgt, speed, move, which, reset, xrand, yrand) {
        this.img = new Image();
        this.img.src = img;
        this.xpos = xpos;
        this.ypos = ypos;
        this.wdh = wdh;
        this.hgt = hgt;
        this.speed = speed;
        this.move = move;
        this.which = which;
        this.reset = reset;
        this.xrand = xrand;
        this.yrand = yrand;
    }

    moveX() {
        if (this.move) {
            if (keys.d && this.xpos < 725) return this.xpos + this.speed;
            if (keys.a && this.xpos > -20) return this.xpos - this.speed;
        } else {
            if (this.reset == 0 || this.reset >= 39) {
                this.xrand = Math.random();
                this.reset = 0;
            }
            // console.log(this.which);
            // console.log(rand);
            this.reset = this.reset + Math.random();
            if (this.reset <= 36) {
                if (this.xpos < 700 && this.xrand > 0.50) return this.xpos + this.speed;
                if (this.xpos > -20 && this.xrand < 0.50) return this.xpos - this.speed;
            }
        }

        return this.xpos;
    }

    moveY() {
        if (this.move) {
            if (keys.w && this.ypos > -20) return this.ypos - this.speed;
            if (keys.s && this.ypos < 500) return this.ypos + this.speed;
        } else {
            if (this.reset == 0 || this.reset >= 39) {
                this.yrand = Math.random();
            }
            if (this.reset <= 36) {
                if (this.ypos > -20 && this.yrand < 0.50) return this.ypos - this.speed;
                if (this.ypos < 500 && this.yrand > 0.50) return this.ypos + this.speed;
            }
        }

        return this.ypos;
    }

    direction() {

    }

    place(context) {
        this.xpos = this.moveX();
        this.ypos = this.moveY();
        context.drawImage(this.img, this.xpos, this.ypos, this.wdh, this.hgt);
    }
}

// Array of Images
let images = []

let xpos = Math.random() * 650;
let ypos = Math.random() * 450;

let slime;

for (i = 0; i < 20; i++) {
    xpos = Math.random() * 650;
    ypos = Math.random() * 450;
    slime = new GameImage('img/slime_base.png', xpos, ypos, 96, 96, 1.5, false, i + 1, 0, 0.5, 0.5);

    images.push(slime);
}

slime = new GameImage('img/slime_base.png', xpos, ypos, 96, 96, 1.5, true, 0, 0, 0, 0);
images.push(slime);

function placeImages() {
    context.clearRect(0, 0, 800, 600);

    images.forEach(element => {
        element.place(context);
    });
    requestAnimationFrame(placeImages);
}

// console.log(images);
placeImages();