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


// These will have all the images that we want
class Image {
    constructor(xpos, ypos, direction) {
        
    }

    directionFunc() {

    }
}

