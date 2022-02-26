const canvas = document.getElementById("gameArea");
const context = canvas.getContext("2d");

let keys = { w: false, a: false, s: false, d: false }

addEventListener("keydown", event => {
    if(event.key === "w") keys.w = true;
    if(event.key === "a") keys.a = true;
    if(event.key === "s") keys.s = true;
    if(event.key === "d") keys.d = true;
    // if(keys.w) console.log("W key pressed!");
    // if(keys.a) console.log("A key pressed!");
    // if(keys.s) console.log("S key pressed!");
    // if(keys.d) console.log("D key pressed!");
});

addEventListener("keyup", event => {
    if(event.key === "w") keys.w = false;
    if(event.key === "a") keys.a = false;
    if(event.key === "s") keys.s = false;
    if(event.key === "d") keys.d = false;
    // if(!keys.w) console.log("W key unpressed!");
    // if(!keys.a) console.log("A key unpressed!");
    // if(!keys.s) console.log("S key unpressed!");
    // if(!keys.d) console.log("D key unpressed!");
});

// All images will use this class
class GameImage {
    constructor(img, xpos, ypos, wdh, hgt, speed, move, which, reset) {
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
    }

    moveX() {
        if (this.move) {
            if (keys.d && this.xpos < 725) return this.xpos + this.speed;

            if (keys.a && this.xpos > -20) return this.xpos - this.speed;
        } else {
            let rand = Math.random();
            console.log(this.which);
            console.log(rand);
            this.reset = this.reset + 0.000000000000000000000000000000000000001;
            if (this.xpos < 725 && rand > 0.50 && this.reset <= 1) return this.xpos + this.speed;
            if (this.xpos > -20 && rand < 0.50 && this.reset <= 1) return this.xpos - this.speed;

            if (this.reset >= 1) this.reset = 0;
        }

        return this.xpos;
    }

    moveY() {
        if (this.move) {
            if (keys.w) return this.ypos - this.speed;

            if (keys.s) return this.ypos + this.speed;
        } else {
            
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

let xpos = Math.random() * 700;
let ypos = Math.random() * 500;

let slime = new GameImage('img/slime_base.png', xpos, ypos, 96, 96, 3, true, 0, 0);

images.push(slime);

for (i = 0; i < 30; i++) {
    xpos = Math.random() * 700;
    ypos = Math.random() * 500;
    slime = new GameImage('img/slime_base.png', xpos, ypos, 96, 96, 3, false, i + 1, 0);
    images.push(slime);
}

function placeImages() {
    context.clearRect(0, 0, 800, 600);

    images.forEach(element => { 
        element.place(context);
    });
    requestAnimationFrame(placeImages);
}

console.log(images);
placeImages();