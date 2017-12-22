document.addEventListener('DOMContentLoaded', () => {
    const stages = Array.from(document.querySelectorAll('.stage'));
    drawRectangles(new Kanvas.Stage(stages[0], 1000, 200));
    drawCircles(new Kanvas.Stage(stages[1], 1000, 200));
    drawPolygones(new Kanvas.Stage(stages[2], 1000, 200));
    drawText(new Kanvas.Stage(stages[3], 1000, 200));
})

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const pallete = {
    yellow: '#dea723',
    green: '#377146',
    red: '#c53227',
    blue: '#27b4c5'
}
const drawRectangles = (stage) => {
    const rectangles = new Kanvas.Layer();
    const rectangle = new Kanvas.Object('rectangle', {
        x: 0,
        y: 0,
        height: 200,
        width: getRandomInt(100, 200),
        fill: pallete.red
    });
    const roundedRectangle = new Kanvas.Object('rectangle', {
        x: rectangle.parameters.width + 20,
        y: 0,
        cornerRadius: 30,
        height: 200,
        width: getRandomInt(100, 200),
        fill: pallete.green
    });
    const randomRoundedSquare = new Kanvas.Object('rectangle', {
        x: roundedRectangle.parameters.x + roundedRectangle.parameters.width + 20,
        y: 0,
        cornerRadius: getRandomInt(10, 100),
        height: 200,
        width: 200,
        fill: pallete.blue
    });
    rectangles.add(rectangle, roundedRectangle, randomRoundedSquare)
    stage.add(rectangles);
}
const drawCircles = (stage) => {
    const circles = new Kanvas.Layer();
    const circle = new Kanvas.Object('circle', {
        x: 0,
        y: 0,
        radius: 100,
        fill: pallete.green
    });
    circles.add(circle)
    for (let i = 0; i < 50; i++) {
        const smallCircle = new Kanvas.Object('circle', {
            x: getRandomInt(200, 997),
            y: getRandomInt(0, 197),
            radius: 3,
            fill: '#fff'
        });
        circles.add(smallCircle)
    }
    stage.add(circles);
}
const drawPolygones = (stage) => {
    const polygones = new Kanvas.Layer();
    const poly = new Kanvas.Object('polygone', {
        x: 0,
        y: 0,
        sides: 8,
        radius: 100,
        fill: pallete.blue
    });
    const random = new Kanvas.Object('polygone', {
        x: 220,
        y: 0,
        sides: getRandomInt(3, 15),
        radius: 100,
        fill: pallete.green
    });
    polygones.add(poly, random)
    stage.add(polygones);
}
const sans = new Kanvas.Font({
    size: 30,
    color: '#fff',
    lineHeight: 30
})
const serif = new Kanvas.Font({
    size: 50,
    color: pallete.yellow,
    weight: 200,
    family: 'Ubuntu',
    lineHeight: 50
})
const drawText = (stage) => {
    const texts = new Kanvas.Layer();
    const firstLine = new Kanvas.Object('text', {
        x: 0,
        y: 0,
        text: 'kanvas test',
        font: sans
    });
    const secondLine = new Kanvas.Object('text', {
        x: 0,
        y: 30,
        text: 'second test',
        font: sans
    });
    const thirdLine = new Kanvas.Object('text', {
        x: 0,
        y: 55,
        text: 'Kanvas',
        font: serif
    });
    texts.add(firstLine, secondLine, thirdLine)
    stage.add(texts);
}