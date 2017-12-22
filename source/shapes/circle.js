export default class Circle{
    static get name() {
        return 'circle'
    }
    static get parameters() {
        return {
            radius: true
        }
    }
    static draw(context, parameters) {
        context.beginPath();
        context.arc(parameters.width / 2, parameters.height / 2, parameters.radius, 0, 2 * Math.PI, false);
        context.closePath();
    }
    static getSize(parameters){
        const diameter = parameters.radius * 2;
        return {
            width: diameter,
            height: diameter,
        }
    }
}