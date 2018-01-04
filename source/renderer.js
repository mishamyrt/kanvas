export default function KanvasRenderer() {
    this.canvas = document.createElement('canvas'),
    this.context = this.canvas.getContext('2d');
    Object.defineProperties(this, {
        size: {
            set: (size) => {
                this.canvas.width = size.width
                this.canvas.height = size.height
            },
            get: () => {
                return {
                    width: this.canvas.width,
                    height: this.canvas.height
                }
            }
        },
        url: {
            get: () => this.canvas.toDataURL()
        }
    })

    this.render = (callback) => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        callback(this.context, this.canvas)
    }
}