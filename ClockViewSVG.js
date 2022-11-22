"use strict";
class ClockViewSVG {

    constructor(radius, clockPojas) {

        this.clockPojas = clockPojas;

        const CLOCK_NUMBER = 12; //число чисел на циферблате
        const SDVIG_STR = 1.1;

        const urlNS = "http://www.w3.org/2000/svg";
        let ANGLE_VALUE = 0;
        let DISTANCE_OF_DIGITS = 30; // расстояние в градусах между цифрами на часах
        const clockRadius = radius * 2;
        const clockNumberRadius = radius * 0.3;
        const clockNumberOkrRadius = radius * 0.8;
        const numberSize = radius * 0.2;
        const strWidth = radius * 0.03;
        const strHeithChas = radius * 0.6;
        const strWidthMin = radius * 0.02;
        const strWidthSek = radius * 0.01;
        const strHeithSek = radius * 0.9;

        this.konteiner = document.createElementNS(urlNS, 'svg'); //контейнер, в котором часы
        this.konteiner.setAttribute('width', clockRadius);
        this.konteiner.setAttribute('height', clockRadius)
       
        this.clockSVG = document.createElementNS(urlNS, 'circle');//создаем сами часы
        this.clockSVG.setAttribute("fill", "yellow");
        this.clockSVG.setAttribute("r", radius);
        this.clockSVG.setAttribute("cx", radius);
        this.clockSVG.setAttribute("cy", radius);
        this.konteiner.append(this.clockSVG);

        let arrClockNumber = [];

        for (let i = 1; i <= CLOCK_NUMBER; i++) {
            arrClockNumber[i] = document.createElementNS(urlNS, 'circle'); //кружок, в котором будут цифры
            arrClockNumber[i].setAttribute("r", clockNumberRadius / 2);
            arrClockNumber[i].setAttribute("fill", "green");
           
            ANGLE_VALUE += DISTANCE_OF_DIGITS; // по кругу в цикле продвигаемся на шаг через 30 градусов
            const angle = ANGLE_VALUE / 180 * Math.PI; // градусы переводим в радианы
            let greenCenterX = Math.round(radius + clockNumberOkrRadius * Math.sin(angle));
            let greenCenterY = Math.round(radius - clockNumberOkrRadius * Math.cos(angle));

            arrClockNumber[i].setAttribute("cx", greenCenterX);
            arrClockNumber[i].setAttribute("cy", greenCenterY);

            const clockNumberText = document.createElementNS(urlNS, 'text');
            clockNumberText.innerHTML = i;
            clockNumberText.setAttribute('x', greenCenterX);
            clockNumberText.setAttribute("y", greenCenterY);
            clockNumberText.setAttribute("text-anchor", "middle");
            clockNumberText.setAttribute("dominant-baseline", "central");
            clockNumberText.style.fontSize = numberSize / 2;
            this.konteiner.append(arrClockNumber[i]);
            this.konteiner.append(clockNumberText);
        }

        
        this.strChas = document.createElementNS(urlNS, 'line'); //создаем часовую стрелку 
        this.strChas.setAttribute('x2', radius);
        this.strChas.setAttribute('y2', radius * SDVIG_STR);
        this.strChas.setAttribute('x1', radius);
        this.strChas.setAttribute('y1', radius - strHeithChas);
        this.strChas.setAttribute("stroke-width", strWidth);
        this.strChas.setAttribute("stroke-linecap", "round");
        this.strChas.setAttribute("stroke", "black");
        this.konteiner.appendChild(this.strChas);
        this.strChas.style.transformOrigin = 'center ' + radius + 'px';

        this.strMin = document.createElementNS(urlNS, 'line'); //создаем часовую стрелку 
        this.strMin.setAttribute('x2', radius);
        this.strMin.setAttribute('y2', radius * SDVIG_STR);
        this.strMin.setAttribute('x1', radius);
        this.strMin.setAttribute('y1', radius - clockNumberOkrRadius);
        this.strMin.setAttribute("stroke-width", strWidthMin);
        this.strMin.setAttribute("stroke-linecap", "round");
        this.strMin.setAttribute("stroke", "black");
        this.konteiner.appendChild(this.strMin);
        this.strMin.style.transformOrigin = 'center ' + radius + 'px ';


        this.strSek = document.createElementNS(urlNS, 'line'); //создаем часовую стрелку 
        this.strSek.setAttribute('x2', radius);
        this.strSek.setAttribute('y2', radius * SDVIG_STR);
        this.strSek.setAttribute('x1', radius);
        this.strSek.setAttribute('y1', radius - strHeithSek);
        this.strSek.setAttribute("stroke-width", strWidthSek);
        this.strSek.setAttribute("stroke-linecap", "round");
        this.strSek.setAttribute("stroke", "black");
        this.konteiner.appendChild(this.strSek);
        this.strSek.style.transformOrigin = 'center ' + radius + 'px'; //сдвигаем нижнюю часть стрелки

    }

    updateTime = () => {

        const ANGLE_SEK = 360 / 60; //в полном круге 360градусов, секундная стрелка делает оборот за 60 секунд, значит это 6 градусов в секунду
        const ANGLE_HOURS = 360 / 12; //часовая стрелка делает оборот за 12 часов

        const seconds = this.clockPojas.getSeconds();
        const minutes = this.clockPojas.getMinutes();
        const hours = this.clockPojas.getHours();

        this.strSek.style.transform = 'rotate(' + seconds * ANGLE_SEK + 'deg)';//задаем угол вращения
        this.strMin.style.transform = 'rotate(' + Number(minutes * ANGLE_SEK + (seconds * ANGLE_SEK / 60)) + 'deg)';
        this.strChas.style.transform = 'rotate(' + Number((hours - 12) * ANGLE_HOURS + (minutes * ANGLE_HOURS / 60)) +'deg)';

        this.timer = setTimeout(this.updateTime, 1020 - this.clockPojas.getMilliseconds());

     }

    modelClock() {
        return this.konteiner;
    }

    stop() {
        if (this.timer)
            clearTimeout(this.timer);
    }

}
