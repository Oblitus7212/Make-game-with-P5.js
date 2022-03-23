let isPause = true;
let saveButton;
let canvas;

// player data
let p1data;
let p1datax;
let p1datay;

// bot da6ta
let botdata;
let botdatax;
let botdatay;

let phase; //Game interface
let targetFrameRate = 24;

// Utility function to create 2-digits string
valueTo2IndexString = (i) => {
    return (i < 10) ? "0" + i : i;
}
preload = () => {
    p1data = {
            idleImg: loadImage("data/p1/Base pack/Player/p1_duck.png"),
            playIndex: 0
        }
        // Derive a names of p1 walk resource
    p1data.rscWalkImages = new Array(11).fill("p1_walk").map(
        (value, i) => { return value + valueTo2IndexString(i + 1) + ".png"; }
    );

    botdata = {
            idleImg: loadImage("data/p1/Base pack/Player/p2_duck.png"),
            playIndex: 0
        }
        // Derive a names of p1 walk resource
    botdata.rscWalkImages = new Array(11).fill("p2_walk").map(
        (value, i) => { return value + valueTo2IndexString(i + 1) + ".png"; }
    );

    Startmenu = {
        startImg: loadImage("data/p1/Buildings expansion/sample.png"),
        houseBeige: loadImage("data/p1/Buildings expansion/Tiles/houseBeige.png"),
    }

    // Assign a resource to the p1data
    p1data.walkImages = p1data.rscWalkImages.map(
        filename => loadImage("data/p1/Base pack/Player/p1_walk/PNG/" + filename)
    );
    print(p1data.walkImages);

    botdata.walkImages = botdata.rscWalkImages.map(
        filename => loadImage("data/p1/Base pack/Player/p2_walk/PNG/" + filename)
    );
    print(botdata.walkImages);
}

setup = () => {
    phase = 0; // Check if it still on menu
    frameRate(targetFrameRate);
    createCanvas(windowWidth, windowHeight);
    // player start point
    p1datax = windowWidth / 17;
    p1datay = windowHeight / 2;
    textSize(60);
    //bot start point
    botdatax = windowWidth / 17;
    botdatay = (windowHeight / 2) - 100;
}

draw = () => {
    if (phase == 0) {
        background(Startmenu.startImg);
        textAlign(CENTER);
        text('Click left mouse to start', windowWidth / 2, windowHeight / 2);
    }
    if (phase == 1) {
        background(Startmenu.houseBeige);

        fill('White');
        rect(windowWidth / 12, windowHeight * 0, 10, 2000);

        fill('Black');
        rect(windowWidth * 0.9, windowHeight * 0, 10, 2000);

        textSize(60);
        text('The green one is you', windowWidth / 2, windowHeight / 2.5);
        text('Press w to start the race then mash d to run', windowWidth / 2, windowHeight / 2);
        text('And you can pause anytime just press w again', windowWidth / 2, windowHeight / 1.7);

        textSize(16);
        text('This is you', p1datax - windowWidth / 27, windowHeight * 0.6, 200, 200)
            // Do Something here
        if (!isPause) {
            // Playing walk sequences
            image(p1data.walkImages[p1data.playIndex], p1datax, p1datay);
            (p1data.playIndex >= p1data.walkImages.length - 1) ? p1data.playIndex = 0: p1data.playIndex++;

            image(botdata.walkImages[botdata.playIndex], botdatax, botdatay);
            (botdata.playIndex >= botdata.walkImages.length - 1) ? botdata.playIndex = 0: botdata.playIndex++;
            setTimeout(botdatax += (windowWidth / 300), 1000);
            if (p1datax >= windowWidth * 0.9) {
                isPause = !isPause;
                phase = 2;
            }
            if (botdatax >= windowWidth * 0.9) {
                isPause = !isPause;
                phase = 3;
            }
        } else {
            // Standing idle
            //player
            image(p1data.idleImg, p1datax, p1datay);
            //bot
            image(botdata.idleImg, botdatax, botdatay);
        }
    }
    if (phase == 2) {
        background(Startmenu.houseBeige);
        textAlign(CENTER);
        textSize(60);
        text('YOU WIN!!!', windowWidth / 2, windowHeight / 2);
        text('Press p to play again', windowWidth / 2, windowHeight / 1.7);
    }
    if (phase == 3) {
        background(Startmenu.houseBeige);
        textAlign(CENTER);
        textSize(60);
        text('YOU LOSE TRY AGAIN', windowWidth / 2, windowHeight / 2);
        text('Press p to play again', windowWidth / 2, windowHeight / 1.7);
    }
}

function mouseClicked() {
    if (mouseButton == LEFT) {
        phase = 1;
    }
    // prevent default
    return false;
}

function reset() {
    p1datax = windowWidth / 17;
    //bot start point
    botdatax = windowWidth / 17;
}

keyPressed = () => {
    if (key === 'w') {
        p1data.playIndex = 0;
        botdata.playIndex = 0;
        isPause = !isPause;
    }
    if (key === 'd') {
        if (!isPause) {
            p1datax += (windowWidth / 150);
        }
    }
    if (key === 'p') {
        reset();
        phase = 1;
    }
}