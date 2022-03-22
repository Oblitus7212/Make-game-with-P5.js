let isPause = true;
let saveButton;
let clearButton;
let canvas;

function setup() {
    canvas = createCanvas(400, 400);
    saveButton = createButton("Save PNG");
    clearButton = createButton("Clear canvas Or you can press 'C'");
    clearButton.mousePressed(Clearcanvas);
    saveButton.mousePressed(savePng);
}

function draw() {
    //background(220);
    if (!isPause) {
        // Face
        ellipse(mouseX, mouseY, 80, 80);
        // Left.Eye and Right.Eye
        ellipse(mouseX - 20, mouseY, 10, 20);
        ellipse(mouseX + 20, mouseY, 10, 20);
    }
}

function mouseClicked() {
    if (mouseButton == LEFT) {
        isPause = !isPause;
        print("isPause is now = " + isPause);
    }
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