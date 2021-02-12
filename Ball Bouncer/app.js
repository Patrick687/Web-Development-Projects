var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");

//Window width
var tx = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var ty = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

//Set canvas dimensions
canvas.width = tx;
canvas.height = ty;

var mousex = 0;
var mousey = 0;

//Add event for mouseOver
addEventListener("mousemove", function() {
    mousex = event.clientX;
    mousey = event.clientY;
})


// generates a random RGB value string
function randomColor() {
    return (
        "rgba(" +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.ceil(Math.random() * 10) /10 +
        ")"
    )
}

//Ball Object
function Ball() {
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = Math.random() * (tx - this.radius * 2) + this.radius;
    this.y = Math.random() * (ty - this.radius);

    //vertical velocity change
    this.dy = Math.random() * 2;
    //horizontal velocity change
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.vel = Math.random() /5;
    this.update = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
    };
}

var grav = .99;
context.strokeWidth=5;


var balls = [];
for(var i =0; i<50; i++) {
    balls.push(new Ball());
}


function animate() {

    //If user changes window size during animation, compensate.
    if(tx != window.innerWidth || ty != window.innerHeight) {
        tx = window.innerWidth;
        ty = window.innerHeight;
        canvas.width = tx;
        canvas.height = ty;
    }

    requestAnimationFrame(animate);

    context.clearRect(0, 0, tx, ty);
    for(var i =0; i<balls.length; i++) {
        balls[i].update();
        balls[i].y += balls[i].dy;
        balls[i].x += balls[i].dx;
        if(balls[i].y + balls[i].radius >= ty) {
            balls[i].dy = -balls[i].dy * grav;
        } else {
            balls[i].dy += balls[i].vel;
        }

        if(balls[i].x + balls[i].radius > tx || balls[i].x - balls[i].radius < 0) {
            balls[i].dx = -balls[i].dx;
        }


        if(mousex > balls[i].x - 20 && 
            mousex < balls[i].x + 20 &&
            mousey > balls[i].y -50 &&
            mousey < balls[i].y +50 &&
            balls[i].radius < 70){
              //bal[i].x += +1;
              balls[i].radius +=5; 
            } else {
              if(balls[i].radius > balls[i].startradius){
                balls[i].radius += -5;
              }
            }
    }
}

animate();

//Because balls stop bouncing, remove a ball and add a new one every second.
setInterval(function() {
    balls.push(new Ball());
    balls.splice(0,1);
}, 1000);