"use strict";
class ClockViewDOM {

    constructor(radius, clockPojas) {

        this.clockPojas = clockPojas;

        const CLOCK_NUMBER = 12; //число чисел на циферблате
        const SDVIG_STR = 0.9;
        let angleValue = 0;
        const distanceOfDigits = 30; // расстояние в градусах между цифрами на часах
        const clockRadius = radius * 2;
        const clockNumberRadius = radius * 0.3;
        const clockNumberOkrRadius = radius * 0.8;
        const numberSize = radius * 0.2;
        const strWidth = radius * 0.03;
        const strHeithChas = radius * 0.6;
        const strWidthMin = radius * 0.02;
        const strWidthSek = radius * 0.01;
        const strHeithSek = radius * 0.9;

        this.clock = document.createElement('div'); //сами часы
        this.clock.style.width = clockRadius + 'px';
        this.clock.style.height = this.clock.style.width;
        this.clock.style.position = "relative";
        this.clock.style.borderRadius = "50%";
        this.clock.style.backgroundColor = 'yellow';
       
        const redCenterX = this.clock.offsetLeft + radius;
        const redCenterY = this.clock.offsetTop + radius;
        const arrClockNumber = [];

        for (let i = 1; i <= CLOCK_NUMBER; i++) {
            arrClockNumber[i] = document.createElement('div'); //кружок, в котором будут цифры
            arrClockNumber[i].style.width = clockNumberRadius + 'px';
            arrClockNumber[i].style.height = arrClockNumber[i].style.width;
            arrClockNumber[i].style.position = 'absolute';
            arrClockNumber[i].style.borderRadius= '50%';
            arrClockNumber[i].style.backgroundColor='green';
            this.clock.appendChild(arrClockNumber[i]);
            angleValue += distanceOfDigits; // по кругу в цикле продвигаемся на шаг через 30 градусов
            const angle = angleValue / 180 * Math.PI; // градусы переводим в радианы
            let greenCenterX = redCenterX + clockNumberOkrRadius * Math.sin(angle);
            let greenCenterY = redCenterY - clockNumberOkrRadius * Math.cos(angle);

            arrClockNumber[i].style.left = Math.round(greenCenterX - clockNumberRadius / 2) + 'px';
            arrClockNumber[i].style.top = Math.round(greenCenterY - clockNumberRadius / 2) + 'px';
            arrClockNumber[i].innerText = i;
            arrClockNumber[i].style.fontSize = numberSize / 2 + 'px';
            arrClockNumber[i].style.lineHeight = clockNumberRadius + 'px';
            arrClockNumber[i].style.textAlign = 'center';
        }

        this.strChas = document.createElement('div'); //создаем часовую стрелку и позиционируем
        this.strChas.style.width = strWidth + 'px';
        this.strChas.style.height = strHeithChas + 'px';
        this.strChas.style.borderRadius = strWidth + 'px';
        this.strChas.style.backgroundColor = 'black';
        this.strChas.style.position = 'absolute';
        this.clock.appendChild(this.strChas);
        this.strChas.style.left = redCenterX - strWidth / 2 + "px";
        this.strChas.style.top = redCenterY - strHeithChas * SDVIG_STR + "px";
        this.strChas.style.transformOrigin = 'center ' + strHeithChas * 0.9 + 'px';

        this.strMin = document.createElement('div'); //создаем минутную стрелку и позиционируем
        this.strMin.style.width = strWidthMin + 'px';
        this.strMin.style.height = clockNumberOkrRadius + 'px';
        this.strMin.style.borderRadius = strWidthMin + 'px';
        this.strMin.style.backgroundColor = 'black';
        this.strMin.style.position = 'absolute';
        this.clock.appendChild(this.strMin);
        this.strMin.style.left = redCenterX - strWidthMin / 2 + "px";
        this.strMin.style.top = redCenterY - clockNumberOkrRadius * SDVIG_STR + "px";
        this.strMin.style.transformOrigin = 'center ' + clockNumberOkrRadius * 0.9 + 'px ';

        this.strSek = document.createElement('div'); //создаем секундную стрелку и позиционируем
        this.strSek.style.width = strWidthSek + 'px';
        this.strSek.style.height = strHeithSek + 'px';
        this.strSek.style.borderRadius = strWidthSek + 'px';
        this.strSek.style.backgroundColor = 'black';
        this.strSek.style.position = 'absolute';
        this.clock.appendChild(this.strSek);
        this.strSek.style.left = redCenterX - strWidthSek / 2 + "px";
        this.strSek.style.top = redCenterY - strHeithSek * SDVIG_STR + "px";
        this.strSek.style.transformOrigin = 'center ' + strHeithSek * 0.9 + 'px'; //сдвигаем нижнюю часть стрелки
    }

    updateTime = () => {

        const seconds = this.clockPojas.getSeconds();
        const minutes = this.clockPojas.getMinutes();
        const hours = this.clockPojas.getHours();

        const ANGLE_SEK = 360 / 60; //в полном круге 360градусов, секундная стрелка делает оборот за 60 секунд, значит это 6 градусов в секунду
        const ANGLE_HOURS = 360 / 12; //часовая стрелка делает оборот за 12 часов
             
        this.strSek.style.transform = 'rotate(' + seconds * ANGLE_SEK + 'deg)';//задаем угол вращения
        this.strMin.style.transform = 'rotate(' + Number(minutes * ANGLE_SEK + (seconds * ANGLE_SEK / 60)) + 'deg)';
        this.strChas.style.transform = 'rotate(' + Number((hours - 12) * ANGLE_HOURS + (minutes * ANGLE_HOURS / 60)) + 'deg)';
        this.timer = setTimeout (this.updateTime, 1020-this.clockPojas.getMilliseconds());
    }

    modelClock () {
        return this.clock;
    }

    stop () {
        if (this.timer)
        clearTimeout (this.timer);
    }

        
}

