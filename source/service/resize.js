export default class ResizeHelper {
    static register(object, width, height) {
        console.log('Register', object)
        stages.push({
            object: object,
            width: width === 'auto' ? true : width,
            height: height === 'auto' ? true : height
        })
        if (!listener.active) {
            listener.start()
        }
        update()
    }
    static unregister(object) {
        delete stages[object.uuid]
        if (Object.keys(stages).length === 0 && listener.active) {
            listener.stop()
        }
    }
}

const listener = {
    active: false,
    start: () => {
        listener.active = true
        window.addEventListener('resize', update, false);
    },
    stop: () => {
        listener.active = false
        window.removeEventListener('resize', update, false);
    }
}

const stages = []

const update = () => {
    // console.log(window.innerWidth)
    stages.forEach(stage => {
        stage.object.size = {
            width: stage.width === true ? stage.object.node.offsetWidth : stage.width,
            height: stage.height === true ? stage.object.node.offsetHeight : stage.height
        }
    });
}

