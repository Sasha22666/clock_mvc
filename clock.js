"use strict";
class Clock {

    constructor (clock_sdvig) {
        this.clock_sdvig = clock_sdvig
    }

    getTimeGTM() {
        const date = new Date();
        const utc = date.getTime()+date.getTimezoneOffset()*60000;
        return new Date(utc+60000*this.clock_sdvig)
    }

    getHours() {
        return this.getTimeGTM().getHours();
    }

    getMinutes() {
        return this.getTimeGTM().getMinutes();
    }

    getSeconds() {
        return this.getTimeGTM().getSeconds();
    }

    getMilliseconds() {
        return this.getTimeGTM().getMilliseconds();
    }
}