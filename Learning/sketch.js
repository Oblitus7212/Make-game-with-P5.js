let isPause = true;
let saveButton;
let canvas;
let p1data;
let isP1Walk;
let targetFrameRate = 24;

// Utility function to create 2-digits string
valueTo2IndexString = (i) => {
    return (i < 10) ? "0" + i : i;
}
preload = () => {
    p1data = {
            idleImg: loadImage("data/p1/Base pack/Player/p1_front.png"),
            playIndex: 0
        }
        // Derive a names of p1 walk resource
    p1data.rscWalkImages = new Array(11).fill("p1_walk").map(
        (value, i) => { return value + valueTo2IndexString(i + 1) + ".png"; }
    );
    //print(p1data.rscWalkImages);

    // Assign a resource to the p1data
    p1data.walkImages = p1data.rscWalkImages.map(
        filename => loadImage("data/p1/Base pack/Player/p1_walk/PNG/" + filename)
    );
    print(p1data.walkImages);
}

setup = () => {
    frameRate(targetFrameRate);
    canvas = createCanvas(400, 400);
    saveButton = createButton("Save PNG");
    saveButton.mousePressed(savePng);
}

draw = () => {
    if (!isPause) {
        imageMode(CENTER);
        // Do Something here
        background(220);
        textSize(32);
        text('FPS:' + int(frameRate()), 10, 30);
        if (isP1Walk) {
            // Playing walk sequences
            image(p1data.walkImages[p1data.playIndex],
                width / 2, height / 2);
            (p1data.playIndex >= p1data.walkImages.length - 1) ?
            p1data.playIndex = 0: p1data.playIndex++;
        } else {
            // Standing idle
            image(p1data.idleImg, width / 2, height / 2);
        }
    }
}

function mouseClicked() {
    if (mouseButton == LEFT) {
        isPause = !isPause;
        print(
            "isPause is now = " + isPause);
    }
    // prevent default
    return false;
}

function savePng() {
    save(canvas, "canvas.png");
}

keyPressed = () => {
    if (key === 'c') {
        print("Cleared canvas");
        clear();
    }
    if (key === 'w') {
        isP1Walk = !isP1Walk;
        p1data.playIndex = 0;
        print("isP1Walk = " + isP1Walk);
    }
    if (key === 'q') {
        frameRate(--targetFrameRate);
        print("FrameRate = " + targetFrameRate);
    }
    if (key === 'e') {
        frameRate(++targetFrameRate);
        print("FrameRate = " + targetFrameRate);
    }
}