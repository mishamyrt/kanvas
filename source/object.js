import KanvasNode from './node.js'
import KanvasRenderer from './renderer.js'

export default function KanvasObject(type, properties){
    let parent = null
    const instance = new KanvasNode(),
    renderer = instance.renderer = new KanvasRenderer(),
    processor = Kanvas.Shape[type],
    emit = (event, parameters) => {
        if (parent) {
            parent.emit(event, parameters)
        }
    },
    states = {
        default: generateState(stateTemplate, properties),
    },
    render = () => {
        renderer.render((context, canvas)=>{
            const state = states.current.properties;
            renderer.size = processor.getSize(state)
            processor.draw(context, state)
            if (state.fill) {
                context.fillStyle = state.fill
                context.fill()
            }
            emit('childUpdate', {
                instance: this
            })
        })
    };
    instance.on('parentDefined', (event) => {
        parent = event.instance
    })
    instance.states = {
        get: (name) => states[name],
        remove: (name) => delete states[name],
        set: (properties, render = true) => {
            states.current.name = 'custom'
            states.current.properties = properties
            if (render) {
                render()
            }
        },
        generate: (properties) => generateState(states.current.properties, properties),
        add: (name, properties) => {
            states[name] = generateState(states.current.properties, properties)
        },  
        switch: (name) => {
            states.current.name = name
            states.current.properties = states[name]
            render()
        }
    }

    instance.start(() => {
        renderer.size = instance.size = processor.getSize(properties)
        states.current = instance.state = {
            name: 'default',
            properties: states.default
        }
        render();
    })
    return instance
}

const generateState = (basis, correction) => {
    const state = Object.assign({}, basis)
    for (let key in correction) {
        state[key] = correction[key];
    }
    return state
} 

const stateTemplate = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fill: null,
    stroke: null,
    shadowBlur: 0,
    strokeWidth: 1,
    shadowColor: '#000',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
}