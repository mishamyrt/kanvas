export default class Font {
    constructor(parameters) {
        this.parameters = Object.assign({}, defaultParameters);
        this.set(parameters)
    }
    set(parameters) {
        for (const key in parameters) {
            this.parameters[key] = parameters[key]
        }
        if (!this.parameters.lineHeight) {
            this.parameters.lineHeight = this.parameters.size * 1.2
        }
        this.dirty = true;
    }
    get css() {
        if (this.dirty) {
            this.cssText = generateCSS(this.parameters)
        }
        return this.cssText
    }
    get color() {
        return this.parameters.color
    }
}

const generateCSS = (parameters) => {
    return  parameters.style + ' ' + 
            parameters.weight + ' ' +
            parameters.size + 'px/' +
            parameters.lineHeight + 'px ' +
            parameters.family
}
const defaultParameters = {
    style: 'normal',
    weight: 'normal',
    size: 20,
    family: 'sans-serif',
    color: '#000'
}