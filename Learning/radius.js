function setup() {
    createCanvas(400, 400);
    print("Setup is called")
}

function draw() {
    background(220);
    ellipse(50, 50, 80, 80);
    ellipse(50, 350, 80, 80);
    ellipse(200, 200, 80, 80);
    rect(300, 20, 80, 80);
    rect(350, 350, 80, 80);
    print("Draw is called")
}