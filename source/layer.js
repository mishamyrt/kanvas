import Type from './types.js'

export default class Layer {
    constructor(parameters) {
        this.canvas_ = document.createElement('canvas');
        this.context_ = this.canvas_.getContext('2d');
        this.type = Type.layer
        Kanvas.Service.register(this)
        this.outdated = true;
        this.size_ = {
            width: 0,
            height: 0
        }
    }
    get size() {
        return this.size_
    }
    set size(size) {
        if (size.width !== this.size_.width || size.height !== this.size_.height) {
            this.size_ = size
            this.canvas_.width = size.width;
            this.canvas_.height = size.height;
            this.outdated = true;   
        }
    }
    add(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        for(const i in arguments){
            Kanvas.Service.appendChild(this, arguments[i])
        }
        this.outdated = true;
    }
    get canvas() {
        if (this.outdated) {
            this.render()
        }
        return this.canvas_
    }
    updateChild() {
        this.render()
    }
    render(){
        const size = this.size
        const context = this.context_;
        const objects = Kanvas.Service.getChildren(this);
        context.clearRect(0, 0, size.width, size.height)
        for (let object of objects) {
            const x = getCoords('x', object, size)
            const y = getCoords('y', object, size)
            console.log(x, y)
            context.drawImage(object.canvas, x, y);
        }
        // console.log(this.canvas_.toDataURL())
        this.outdated = false;
    }
}

const getCoords = (prop, object, size) => {
    if (typeof(object.state.properties[prop]) === 'object') {
        // console.log(prop, object, size)
        return object.state.properties[prop].calculate (
            object.size,
            size,
            prop,
            object.state.properties[prop].offset 
        )
    }
    return object.state.properties[prop]
}