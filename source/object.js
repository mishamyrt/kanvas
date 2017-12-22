export default class KanvasObject {
    constructor(type, properties) {
        this.canvas_ = document.createElement('canvas');
        this.context_ = this.canvas_.getContext('2d');
        this.states_ = {
            default: generateState(stateTemplate, properties)
        }
        this.states_.current = {
            name: 'default',
            properties: this.states_.default
        }
        this.shape = type;
        this.type = 2
        Kanvas.Service.register(this)
        this.render()
    }
    get state() {
        return this.states_.current
    }
    get canvas() {
        return this.canvas_
    }
    get size() {
        return {
            width: this.state.width,
            height: this.state.height
        }
    }
    get states() {
        return {
            current: this.state,
            get: (name) => this.state_[name],
            remove: (name) => delete this.state_,
            set: (properties, render = true) => {
                this.states_.current = {
                    name: reservedStateNames[1],
                    properties: this.states_[properties]
                }
                if (render) {
                    this.render()
                }
                Kanvas.Service.updateParents(this)
            },
            generate: (properties) => generateState(this.state.properties, properties),
            add: (name, properties) => {
                this.states_[name] = generateState(
                    this.states_.current.properties,
                    properties
                )
            },  
            switch: (name) => {
                this.states_.current = {
                    name: name,
                    properties: this.states_[name]
                }
                this.render()
                Kanvas.Service.updateParents(this)
            }
        }
    }
    render() {
        const canvas = this.canvas_,
              context = this.context_,
              state = this.state.properties
        canvas.width = state.width
        canvas.height = state.height
        context.clearRect(0, 0, state.width, state.height)
        Kanvas.Shape[this.shape].draw(context, state)
        if (state.stroke) {
            context.lineWidth = state.strokeWidth
            context.strokeStyle = state.stroke;
            context.stroke()
        }
        if (state.fill) {
            context.fillStyle = state.fill
            context.fill()
        }
        // window.open('asd');
    }
}

const reservedStateNames = ['current', 'temporary', 'default']

const generateState = (basis, correction) => {
    const state = Object.assign({}, basis)
    for (let key in correction) {
        state[key] = correction[key];
    }
    return state
} 

const stateTemplate = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fill: null,
    stroke: null,
    shadowBlur: 0,
    strokeWidth: 1,
    shadowColor: '#000',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
}