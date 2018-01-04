import KanvasNode from './node.js'
import KanvasRenderer from './renderer.js'

export default function KanvasLayer(type, properties){
    const instance = new KanvasNode(),
    renderer = instance.renderer = new KanvasRenderer(),
    children = []

    instance.on('resize', (event) => {
        renderer.size = event.size
        render()
    })
    const render = () => {
        requestAnimationFrame(() => {
            renderer.render((context => {
                children.forEach(child => {
                    const state = child.state.properties
                    const x = getCoords('x', child, instance.size)
                    const y = getCoords('y', child, instance.size)
                    context.drawImage(child.renderer.canvas, x, y)
                })
            }))
        })
    }
    instance.on('childAdded', (event) => {
        children.push(event.instance)
        render()
    })
    instance.on('childAdded', (event) => {
        children.push(event.instance)
        render()
    })
    instance.on('childUpdate', (event) => {
        render();
    })
    instance.start(() => {
        render()
    })
    return instance
}

const getCoords = (prop, object, size) => {
    if (typeof(object.state.properties[prop]) === 'object') {
        return object.state.properties[prop].calculate (
            object.size,
            size,
            prop,
            object.state.properties[prop].offset 
        )
    }
    return object.state.properties[prop]
}