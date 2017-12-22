export default class Animation {
    constructor(object, state, duration, easing) {
        const stateDelta = {}
        for (const key in state) {
            if (key === 'fill')
                stateDelta[key] = state[key]
            else
                stateDelta[key] = state[key] - object.parameters[key]
        }
        this.object = object
        this.state = {
            original: Object.assign({}, object.parameters),
            delta: stateDelta
        }
        this.easing = easing ? easing : 'linear'
        this.duration = duration ? duration : 300
        this.isAnimating = false;
        this.reversed = false;
        this.elapsedTime = 0;
    }
    play() {
        return new Promise((resolve, reject) => {
            this.timeStart = new Date().getTime() - this.elapsedTime
            this.isAnimating = true
            requestAnimationFrame(() => this.drawFrame());
            setTimeout(() => {
                this.stop();
                resolve();
            }, this.duration - this.elapsedTime);
        })
    }
    reverse(){
        this.reversed = !this.reversed
    }
    stop(){
        this.pause();
    }
    pause() {
        this.isAnimating = false;
        const elapsed = new Date().getTime() - this.timeStart;
        this.elapsedTime = elapsed < this.duration ? elapsed : 0
        // console.log(this.elapsedTime)
    }
    get progress(){
        if (this.isAnimating) {
            let step = easing[this.easing]((new Date().getTime() - this.timeStart) / this.duration)
            if (this.reversed) {
                step = 1 - step
            }
            this.lastStep = step
            return step
        }
        else {
            return this.lastStep
        }
    }
    drawFrame() {
        const progress = this.progress;
        const state = {}
        for (const key in this.state.delta) {
            if (key === 'fill') {
                state[key] = mixColors(this.state.original[key], this.state.delta[key], progress)
                // console.log(mixColors(this.state.original[key], this.state.delta[key], 0.1))
            }
            else {
                state[key] = this.state.original[key] + (this.state.delta[key] * progress)
            }
        }
        this.object.set(state)
        if (this.isAnimating){
            requestAnimationFrame(() => this.drawFrame())
        }
    }
}

const mixColors = (first, second, step) => {
    first = first.substr(1)
    second = second.substr(1)
    // console.log(step)
    const firstChunks = [],
          secondChunks = []
    for (let i = 0; i < 3; i++){
        const offset = i * 2;
        firstChunks.push(parseInt(first.substr(offset, 2), 16))
        secondChunks.push(parseInt(second.substr(offset, 2), 16))
    }
    const resultChunks = [ 
        ((1 - step) * firstChunks[0]) + (step * secondChunks[0]), 
        ((1 - step) * firstChunks[1]) + (step * secondChunks[1]), 
        ((1 - step) * firstChunks[2]) + (step * secondChunks[2])
    ];
    let result = '#';
    for (let i = 0; i < 3; i++) {
        const hex = Math.round(resultChunks[i]).toString(16);
        if (hex.length == 1) {
            result += '0';
        }
        result += hex;
    }
    return result
}

const easing = {
    linear: (t) => { return t },
    // accelerating from zero velocity
    easeInQuad: (t) => { return t*t },
    // decelerating to zero velocity
    easeOutQuad: (t) => { return t*(2-t) },
    // acceleration until halfway, then deceleration
    easeInOutQuad: (t) => { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    // accelerating from zero velocity 
    easeInCubic: (t) => { return t*t*t },
    // decelerating to zero velocity 
    easeOutCubic: (t) => { return (--t)*t*t+1 },
    // acceleration until halfway, then deceleration 
    easeInOutCubic: (t) => { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
    // accelerating from zero velocity 
    easeInQuart: function (t) { return t*t*t*t },
    // decelerating to zero velocity 
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
    // accelerating from zero velocity
    easeInQuint: function (t) { return t*t*t*t*t },
    // decelerating to zero velocity
    easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
    // acceleration until halfway, then deceleration 
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}