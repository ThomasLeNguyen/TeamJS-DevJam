const canvas = document.getElementById("gameArea");
const context = canvas.getContext("2d");

let keys = { w: false, a: false, s: false, d: false }

addEventListener("keydown", function() {
    if(!keys.w) keys.w = true;

    if(keys.w) console.log("W key pressed!");

    if(!keys.a) keys.a = true;

    if(keys.a) console.log("A key pressed!");

    if(!keys.s) keys.s = true;

    if(keys.s) console.log("S key pressed!");

    if(!keys.d) keys.d = true;

    if(keys.d) console.log("D key pressed!");
});

addEventListener("keyup", function() {
    if(keys.w) keys.w = false;

    if(!keys.w) console.log("W key unpressed!");

    if(keys.a) keys.a = false;

    if(!keys.a) console.log("A key unpressed!");

    if(keys.s) keys.s = false;

    if(!keys.s) console.log("S key unpressed!");

    if(keys.d) keys.d = false;

    if(!keys.d) console.log("D key unpressed!");
});


// These will have all the images that we want
class Image {
    constructor(xpos, ypos, direction) {
        
    }

    directionFunc() {

    }
}

