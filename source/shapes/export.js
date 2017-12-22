import Rectangle from './rectangle.js'
import Circle from './circle.js'
import Polygone from './polygone.js'
import Text from './text.js'

const renderers = [ Rectangle, Circle, Polygone, Text ]

const shapes = {}
for (const renderer of renderers) {
    shapes[renderer.name] = renderer
}
export default shapes;


