import ResizeHelper from './resize.js'

export default class Service {
    static registerResize(object, width, height) {
        ResizeHelper.register(object, width, height)
    }
}