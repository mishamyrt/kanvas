export default function KanvasNode() {
    const size = {
        width: 0,
        height: 0
    },
    events = {
        resize: () => {},
        childAdded: () => {},
        parentDefined: () => {},
    },
    interfaceObject = {
        id: Symbol(),
        size: {
            get: () => size,
            set: (newSize) => {
                size.width = newSize.width
                size.height = newSize.height
                this.emit('resize', {
                    size: newSize
                })
            }
        },
        on: (event, callback) => {
            events[event] = callback
        },
        start: (callback) => {
            callback()
        },
        emit: (event, parameters) => {
            parameters.type = event
            events[event](parameters)
        },
        add: (child) => {
            this.emit('childAdded', {
                instance: child
            })
            child.emit('parentDefined', {
                instance: this
            })
        },
        inner: {
            extendInterface: (parameters) => extendInterface(this, parameters),
            children: {},
            parent: null
        }
    };
    extendInterface(this, interfaceObject)
}

const extendInterface = (node, prop) => {
    for (const key in prop) {
        const property = prop[key]
        const result = {
            configurable: false,
        }
        if (property.set || property.get) {
            if (property.set) {
                result.set = property.set
            } 
            if (property.get) {
                result.get = property.get
            }
        } else {
            writable: false
            result.value = property
        }
        Object.defineProperty(node, key, result);
    }
    return node
}