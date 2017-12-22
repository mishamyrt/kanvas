export default class Text{
    static get name() {
        return 'text'
    }
    static get parameters() {
        return {
            font: true,
            text: true
        }
    }
    static draw(context, parameters) {
        const font = parameters.font;
        // context.textBaseline = "middle";
        context.fillStyle = font.color;
        context.font = font.css;
        console.log(font);
        context.fillText(parameters.text, 0, parameters.font.parameters.lineHeight);
    }
    static getSize(parameters){
        const context = document.createElement('canvas').getContext('2d')
        context.font = parameters.font.css;
        return {
            width: context.measureText(parameters.text).width,
            height: parameters.font.parameters.lineHeight,
        }
    }
}

