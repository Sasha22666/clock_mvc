"use strict";
const NUMBER_SIZE = 50; //размер шрифта счетчика очков
const BUTTON_WIDTH = 100;
const WIDTH_FIELD = 800; //ширина поля
const HEIGHT_FIELD = 400; //высота поля
const RADIUS_BALL = 20; //радиус мяча
const WIDTH_RACKET = 7; //ширина ракетки
const SDVIG = 3;
const HEIGHT_RACKET = 100; //высота ракетки
const HEIGHT_KONTEINER = HEIGHT_FIELD + NUMBER_SIZE;

let counterL = 0;
let counterR = 0;

const centerX = WIDTH_FIELD / 2;
const centerY = HEIGHT_FIELD / 2 + RADIUS_BALL * 2;

const konteiner = document.createElement('canvas'); //контейнер, в котором игра
konteiner.width = WIDTH_FIELD;
konteiner.height = HEIGHT_FIELD + NUMBER_SIZE;
document.body.appendChild(konteiner);

const ctx = konteiner.getContext("2d");

function drawRect(x, y, w, h, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
    ctx.closePath();
}

function drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}

ctx.beginPath();
ctx.fillStyle = 'gray';
ctx.fillRect(0, 0, BUTTON_WIDTH, NUMBER_SIZE / 1.5);
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = 'black';
ctx.font = 'normal normal ' + NUMBER_SIZE / 2 + 'px Arial';
ctx.textAlign = 'center';
ctx.fillText('Старт!', BUTTON_WIDTH / 2, NUMBER_SIZE / 2);
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = 'black';
ctx.font = 'normal normal ' + NUMBER_SIZE + 'px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

ctx.fillText(counterL + ':' + counterR, WIDTH_FIELD / 2, NUMBER_SIZE / 2);

var ballH = {
    posX: centerX,
    posY: centerY,
    speedX: 0,
    speedY: 0,

    update: function () {
        drawCircle(this.posX, this.posY, RADIUS_BALL, 'red');
    }
}

var field = {
    PosX: 0,
    PosY: NUMBER_SIZE,
    width: WIDTH_FIELD,
    height: HEIGHT_FIELD,

    update: function () {
        drawRect(this.PosX, this.PosY, this.width, this.height, "yellow");
    }
};

var racketL = {
    PosX: 0,
    PosY: ((HEIGHT_FIELD) / 2 - HEIGHT_RACKET / 2 + NUMBER_SIZE),
    Speed: 0,
    width: WIDTH_RACKET,
    height: HEIGHT_RACKET,

    update: function () {
        drawRect(this.PosX, this.PosY, this.width, this.height, "blue");
    }
};

var racketR = {
    PosX: (WIDTH_FIELD - WIDTH_RACKET),
    PosY: ((HEIGHT_FIELD) / 2 - HEIGHT_RACKET / 2 + NUMBER_SIZE),
    Speed: 0,
    width: WIDTH_RACKET,
    height: HEIGHT_RACKET,

    update: function () {
        drawRect(this.PosX, this.PosY, this.width, this.height, "green");
    }
};

konteiner.addEventListener('click', function (EO) {
    EO = EO || window.event;
    var mouseX = EO.offsetX;
    var mouseY = EO.offsetY;
    if (mouseX>0&mouseX<BUTTON_WIDTH&mouseY>0&mouseY<NUMBER_SIZE) {

        start();
    }
});

 window.addEventListener('keydown', function (EO) {
        EO = EO || window.event;

        if (EO.keyCode === 17) {
            racketL.Speed = 12;
        }
        if (EO.keyCode === 16) {
            racketL.Speed = -12;
        }
        if (EO.keyCode === 40) {
            racketR.Speed = 12;
        }
        if (EO.keyCode === 38) {
            racketR.Speed = -12;
        }
    });

    window.addEventListener('keyup', function (EO) {
        EO = EO || window.event;

        if (EO.keyCode === 17) {
            racketL.Speed = 0;
        }
        if (EO.keyCode === 16) {
            racketL.Speed = 0;
        }
        if (EO.keyCode === 40) {
            racketR.Speed = 0;
        }
        if (EO.keyCode === 38) {
            racketR.Speed = 0;
        }

    });

function start() {

    ballH.posX = centerX;
    ballH.posY = centerY;
    do {
        var speedXNotNull = randomDiap(-4, 4) * 2;
        var speedYNotNull = randomDiap(-2, 2) * 2;
    } while (speedXNotNull == 0 || speedYNotNull == 0);
    ballH.speedX = speedXNotNull;
    ballH.speedY = speedYNotNull;

    function randomDiap(n, m) {
        return Math.floor(Math.random() * (m - n + 1)) + n;
    }
}

function tick() {

    racketL.PosY += racketL.Speed;
    racketR.PosY += racketR.Speed;

   

    //ракетка ниже стены?            
    if (racketL.PosY <= NUMBER_SIZE) {
        racketL.PosY = NUMBER_SIZE;
    }
    if (racketR.PosY <= NUMBER_SIZE) {
        racketR.PosY = NUMBER_SIZE;
    }

    //ракетка ниже стены?
    if (racketL.PosY + HEIGHT_RACKET / 2 > HEIGHT_FIELD) {
        racketL.PosY = HEIGHT_FIELD - HEIGHT_RACKET / 2;
    }
    if (racketR.PosY + HEIGHT_RACKET / 2 > HEIGHT_FIELD) {
        racketR.PosY = HEIGHT_FIELD - HEIGHT_RACKET / 2;
    }

    ballH.posX += ballH.speedX;
    ballH.posY += ballH.speedY;

    // ударился ли мяч о левую ракетку?
    if (ballH.posX - RADIUS_BALL <= WIDTH_RACKET) {
        if (ballH.posY - RADIUS_BALL >= racketL.PosY && ballH.posY + RADIUS_BALL <= racketL.PosY + HEIGHT_RACKET) {
            ballH.speedX = -ballH.speedX;
        }
        else if (ballH.posX < RADIUS_BALL) {
            ballH.speedX = 0;
            ballH.speedY = 0;
            ballH.posX = RADIUS_BALL;
            counterR++;
            ctx.clearRect(WIDTH_FIELD/2-WIDTH_FIELD/10, 0, WIDTH_FIELD/5, NUMBER_SIZE);
            ctx.fillStyle = 'black';
            ctx.fillText(counterL + ':' + counterR, WIDTH_FIELD / 2, NUMBER_SIZE / 2);
        }
    }

    // ударился ли мяч о правую ракетку?
    if (ballH.posX + RADIUS_BALL >= (WIDTH_FIELD - WIDTH_RACKET)) {
        if (ballH.posY - RADIUS_BALL >= racketR.PosY && ballH.posY + RADIUS_BALL <= racketR.PosY + HEIGHT_RACKET) {
            ballH.speedX = -ballH.speedX;
        }
        else if (ballH.posX > WIDTH_FIELD - RADIUS_BALL) {
            ballH.speedX = 0;
            ballH.speedY = 0;
            ballH.posX = WIDTH_FIELD - RADIUS_BALL;
            counterL++;
            ctx.clearRect(WIDTH_FIELD/2-WIDTH_FIELD/10, 0, WIDTH_FIELD/5, NUMBER_SIZE);
            ctx.fillStyle = 'black';
            ctx.fillText(counterL + ':' + counterR, WIDTH_FIELD / 2, NUMBER_SIZE / 2);
        }
    }

    // мяч ниже пола?
    if (ballH.posY + RADIUS_BALL > HEIGHT_FIELD + NUMBER_SIZE - SDVIG) {
        ballH.speedY = -ballH.speedY;
    }

    // мяч выше потолка?
    if (ballH.posY < NUMBER_SIZE + RADIUS_BALL + SDVIG) {
        ballH.speedY = -ballH.speedY;
    }

    field.update();
    racketL.update();
    racketR.update();
    ballH.update();

    requestAnimationFrame(tick);
}

tick();