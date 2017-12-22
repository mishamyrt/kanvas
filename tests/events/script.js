document.addEventListener('DOMContentLoaded', () => {
    const stages = Array.from(document.querySelectorAll('.stage'));
    drawClick(new Kanvas.Stage(stages[0], 1000, 200));
    transitionTest(new Kanvas.Stage(stages[1], 1000, 200));
})

ursi({
    title: 'Kanvas',
    theme: dark,
    width: 1000,
    height: 200,
    html: '<div class="stage"></div>',
    tests: [
        {
            run: () => {

            }
        }
    ]
})


const drawClick = (stage) => {
    const rectangles = new Kanvas.Layer();
    const roundedRectangle = new Kanvas.Object('rectangle', {
        x: 0,
        y: 0,
        cornerRadius: 30,
        height: 200,
        width: 300,
        fill: pallete.green,
    });
    rectangles.add(roundedRectangle)
    stage.add(rectangles);
    // setInterval(() => {
    //     color = pallete[Object.keys(pallete)[getRandomInt(0, 3)]]
    //     // console.log(color) 
    //     roundedRectangle.set({
    //         fill: pallete[Object.keys(pallete)[getRandomInt(0, 3)]]
    //     })
    // }, 1000)
}
const transitionTest = (stage) => {
    const rectangles = new Kanvas.Layer();
    const roundedRectangle = new Kanvas.Object('rectangle', {
        x: 0,
        y: 0,
        cornerRadius: 30,
        height: 200,
        width: 200,
        fill: pallete.green,
    });
    const glidingRectangle = new Kanvas.Object('rectangle', {
        x: 250,
        y: 50,
        cornerRadius: 30,
        height: 100,
        width: 100,
        fill: pallete.yellow,
    });
    rectangles.add(roundedRectangle, glidingRectangle)
    stage.add(rectangles);
    const resize = new Kanvas.Animation(roundedRectangle, {
        width: 100,
        height: 100,
        y: 50,
        fill: pallete.blue,
        x: 50,
        cornerRadius: 50
    }, 800, 'linear');

    const move = new Kanvas.Animation(glidingRectangle, {
        x: 850,
        cornerRadius: 50,
        fill: pallete.red,
    }, 800, 'linear');

    setInterval(() => {
        move.play().then(() => {
            move.reverse()
            move.play().then(() => {
                move.reverse();
            })
        })
        resize.play().then(() => {
            resize.reverse()
            resize.play().then(() => {
                resize.reverse();
            })
        })
    }, 2000)
}