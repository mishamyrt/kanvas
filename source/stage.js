export default class Stage {
    constructor(parameters) {
        this.container = parameters.node;
        const width = parameters.width ? parameters.width : 'auto'
        const height = parameters.height ? parameters.height : 'auto'
        this.layers = {}
        this.type = 0
        this.pixelRatio = window.devicePixelRatio;
        Kanvas.Service.register(this)
        if (width === 'auto' || height === 'auto') {
            Kanvas.Service.registerResize(this, width, height)
        } else {
            this.size = {
                width: width,
                height: height
            }
        }   
    }
    set size (size) {
        console.log('set')
        this._size = size
        for (const uuid in this.layers) {
            this.layers[uuid].controller.size = size
            this.layers[uuid].canvas.width = size.width;
            this.layers[uuid].canvas.height = size.height;
            this.drawLayer(uuid)
        }
    }
    get size () {
        return this._size
    }
    updateChild(child) {
        this.drawLayer(child.uuid)
    }
    add() {
        for (const layer of arguments) {
            const size = this.size
            layer.size = size
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = size.width
            canvas.height = size.height
            this.container.appendChild(canvas)
            this.layers[layer.uuid] = {
                canvas: canvas,
                context: context,
                controller: layer
            }
            Kanvas.Service.appendChild(this, layer)
            this.drawLayer(layer.uuid)
        }
    }
    drawLayer(uuid) {
        const layer = this.layers[uuid];
        layer.context.clearRect(0, 0, this.size.width, this.size.height)
        layer.context.drawImage(layer.controller.canvas, 0, 0);
    }
}