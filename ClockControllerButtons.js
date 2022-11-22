class ClockControllerButtons {

    constructor (kontainer, vidClock, namePojas) {

        this.kontainer = kontainer;
        this.vidClock = vidClock;

        const divButton = document.createElement('div');
        
        const stopButton = document.createElement('button');
        stopButton.textContent="СТОП";
        stopButton.style.marginRight=10+"px";
        stopButton.addEventListener('click', this.stop);
        divButton.appendChild(stopButton);

        const startButton = document.createElement('button');
        startButton.textContent="СТАРТ";
        startButton.style.marginRight=10+"px";
        startButton.addEventListener('click', this.start);
        divButton.appendChild(startButton);

        const textPojas = document.createElement('span');
        textPojas.textContent=namePojas;

        divButton.appendChild(textPojas);

        this.kontainer.appendChild(divButton); 

        this.kontainer.appendChild(this.vidClock.modelClock());

        this.vidClock.updateTime();

        this.divs=document.getElementById('clocks');
        this.divs.style.display='inline-block';
    }

    start = () => {
        this.vidClock.stop();
        this.vidClock.updateTime();
    }

    stop = () => {
        this.vidClock.stop();
    }
}