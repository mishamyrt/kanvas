export default class Polygone{
    static get name() {
        return 'polygone'
    }
    static get parameters() {
        return {
            sides: true,
            radius: true
        }
    }
    static draw(context, parameters) {
        const size = parameters.radius,
              center = parameters.radius;
        context.beginPath();
        context.moveTo(center + size * Math.cos(0), center +  size *  Math.sin(0));  
        for (let i = 1; i <= parameters.sides; i++) {
            context.lineTo(center + size * Math.cos(i * 2 * Math.PI / parameters.sides), center + size * Math.sin(i * 2 * Math.PI / parameters.sides));
        }
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