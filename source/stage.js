import KanvasNode from './node.js'

export default function Stage(node, parameters) {
    const instance = new KanvasNode();
    const layers = []
    instance.node = node
    let lock = false
    instance.on('resize', (event) => {
        if (!lock) {
            lock = true;
            setTimeout(() => {
                layers.forEach(layer => {
                    layer.size = event.size
                })
                lock = false
            }, 100)
        }
    })
    instance.on('childAdded', (event) => {
        const child = event.instance
        layers.push(child)
        node.appendChild(child.renderer.canvas)
        child.size = instance.size
    })
    instance.start(() => {
        if (parameters.width === 'auto' || parameters.height === 'auto') {
            Kanvas.Service.registerResize(instance, parameters.width, parameters.height)
        } else {
            instance.size = {
                width: parameters.width,
                height: parameters.height
            }
        }
    })
    return instance
}
