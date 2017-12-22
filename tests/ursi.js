ursi({
    name: 'Kanvas animations',
    height: 200,
    theme: 'dark',
    html: '<div class="stage"></div>',
    scripts: ['../build/kanvas.js'],
    tests: [
        {
            name: 'States',
            run: (test) => {
                const stage = new Kanvas.Stage({
                    node: test.get('.stage'),
                    width: 'auto',
                    height: 200
                }),
                layer = new Kanvas.Layer(),
                shape = new Kanvas.Object('rectangle', {
                    x: 50,
                    y: 0,
                    cornerRadius: 30,
                    height: 200,
                    width: 200,
                    fill: '#f34054',
                });
                shape.states.add('right', {
                    x: Kanvas.Align.right(50)
                })
                layer.add(shape),
                stage.add(layer);
                let flag = false
                setInterval(() => {
                    shape.states.switch(flag ? 'right' : 'default')
                    flag = !flag
                    // console.log(shape)
                }, 1500)
            }
        },
        {
            name: 'Transitions',
            run: (test) => {
                const stage = new Kanvas.Stage(test.get('.stage'), 'auto', 200),
                rectangles = new Kanvas.Layer(),
                roundedRectangle = new Kanvas.Object('rectangle', {
                    x: 0,
                    y: 0,
                    cornerRadius: 30,
                    height: 200,
                    width: 200,
                    fill: '#f34054',
                });
                rectangles.add(roundedRectangle),
                stage.add(rectangles);
            }
        }
    ]
})

        // resize = new Kanvas.Animation(roundedRectangle, {
                //     width: 100,
                //     height: 100,
                //     y: 50,
                //     fill: '#0679fe',
                //     x: 50,
                //     cornerRadius: 50
                // }, 800, 'easeInOutQuart'),
                // move = new Kanvas.Animation(glidingRectangle, {
                //     x: Kanvas.Align.right(50),
                //     cornerRadius: 50,
                //     fill: '#f34053',
                // }, 800, 'easeInOutQuart');
                // rectangles.add(roundedRectangle),
                // stage.add(rectangles);
                // setInterval(() => {
                //     move.play().then(() => {
                //         move.reverse()
                //         move.play().then(() => {
                //             move.reverse();
                //         })
                //     })
                //     resize.play().then(() => {
                //         resize.reverse()
                //         resize.play().then(() => {
                //             resize.reverse();
                //         })
                //     })
                // }, 2000)
                // glidingRectangle = new Kanvas.Object('rectangle', {
                //     x: 250,
                //     y: 50,
                //     cornerRadius: 30,
                //     height: 100,
                //     width: 100,
                //     fill: '#ffcc20',
                // });