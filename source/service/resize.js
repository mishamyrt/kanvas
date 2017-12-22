export default class ResizeHelper {
    static register(object, width, height) {
        stages[object.uuid] = {
            object: object,
            width: width === 'auto' ? true : width,
            height: height === 'auto' ? true : height
        }
        updateStageSize(object.uuid)
        if (!listener.active) {
            listener.start()
        }
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
        window.addEventListener('resize', updateStages, false);
    },
    stop: () => {
        listener.active = false
        window.removeEventListener('resize', updateStages, false);
    }
}

const stages = {}

const updateStages = () => {
    for (const uuid in stages) {
        updateStageSize(uuid);
    }
}

const updateStageSize = (uuid) => {
    const stage = stages[uuid];
    const width = stage.width === true ? stage.object.container.offsetWidth : stage.width;
    const height = stage.height === true ? stage.object.container.offsetHeight : stage.height;
    stage.object.size = {
        width: width,
        height: height
    }
}

