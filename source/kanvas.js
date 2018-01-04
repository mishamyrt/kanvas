import Stage from './stage.js'
import Service from './service/service.js'
import KanvasObject from './object.js'
import Layer from './layer.js'
import shapes from './shapes/export.js'
import Align from './align.js'
import Font from './font.js'

window.Kanvas = {
    Stage: Stage,
    Layer: Layer,
    Object: KanvasObject,
    Shape: shapes,
    Font: Font,
    Service: Service,
    // Animation: Animation,
    // Service: Service,
    Align: Align
}