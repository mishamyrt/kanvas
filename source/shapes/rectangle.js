export default class Rectangle {
    static get name() {
        return 'rectangle'
    }
    static get parameters() {
        return {
            cornerRadius: true
        }
    }
    static getSize(state){
        return {
            width: state.width,
            height: state.height,
        }
    }
    static draw(context, parameters) {
        context.beginPath();
        if (parameters.cornerRadius) {
            const dots = {
                x: [
                    0,
                    parameters.cornerRadius,
                    parameters.width - parameters.cornerRadius,
                    parameters.width
                ],
                y: [
                    0,
                    parameters.cornerRadius,
                    parameters.height - parameters.cornerRadius,
                    parameters.height
                ]
            }
            context.moveTo(dots.x[2], dots.y[0]);
            context.lineTo(dots.x[1], dots.x[0])
            context.quadraticCurveTo(
                dots.x[0], dots.y[0],
                dots.x[0], dots.y[1],
            );
            context.lineTo(dots.x[0], dots.y[2])
            context.quadraticCurveTo(
                dots.x[0], dots.y[3],
                dots.x[1], dots.y[3],
            );
            context.lineTo(dots.x[2], dots.y[3])
            context.quadraticCurveTo(
                dots.x[3], dots.y[3],
                dots.x[3], dots.y[2],
            );
            context.lineTo(dots.x[3], dots.y[1])
            context.quadraticCurveTo(
                dots.x[3], dots.y[0],
                dots.x[2], dots.y[0],
            );
        }
        else {
            context.rect(0, 0, parameters.width, parameters.height);
        }
        context.closePath();
    }
    static stroke(context, parameters) {

    }
}