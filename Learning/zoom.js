let isPause = true;
let saveButton;
let clearButton;
let canvas;
let radius = 50;
let zoomOutRadius = 200;
let zoomInRadius = 5
let isZoomOut = true;
let zoomSpeed = 5;

function setup() {
    canvas = createCanvas(400, 400);
    saveButton = createButton("Save PNG");
    clearButton = createButton("Clear canvas Or you can press 'C'");
    clearButton.mousePressed(Clearcanvas);
    saveButton.mousePressed(savePng);
}

function draw() {
    background(220);
    if (!isPause) {
        if (radius > zoomOutRadius)
            zoomSpeed = -5;
        else if (radius < zoomInRadius)
            zoomSpeed = 5;
        radius += zoomSpeed;
    }
    ellipse(mouseX, mouseY, radius, radius);
}

function mouseClicked() {
    if (mouseButton == LEFT) {
        isPause = !isPause;
        print("isPause is now = " + isPause);
    }
    // prevent default
    return false;
}

function keyPressed() {
    if (key === 'c') {
        print("Cleared canvas");
        clear();
    }
}

function Clearcanvas() {
    print("Cleared canvas");
    clear();
}

function savePng() {
    save(canvas, "canvas.png");
}