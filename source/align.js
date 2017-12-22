const center = (objectSize, layerSize, property, offset = 0) => {
    switch (property) {
        case 'x':
            return Math.round((layerSize.width / 2) - (objectSize.width / 2) + offset)
            break;
        case 'y':
            return Math.round((layerSize.height / 2) - (objectSize.height / 2) + offset)
            break;
        default: 
            return 0;
    }    
}

const top = (objectSize, layerSize, property, offset = 0) => {
    if (property !== 'y') {
        throw new Error('Align.top only works for y')
    }
    return offset
}
const bottom = (objectSize, layerSize, property, offset = 0) => {
    if (property !== 'y') {
        throw new Error('Align.bottom only works for y')
    }
    return layerSize.height - objectSize.height - offset
}
const left = (objectSize, layerSize, property, offset = 0) => {
    if (property !== 'x') {
        throw new Error('Align.left only works for x')
    }
    return offset
}
const right = (objectSize, layerSize, property, offset = 0) => {
    if (property !== 'x') {
        throw new Error('Align.right only works for x')
    }
    console.log(objectSize, layerSize, property, offset)
    return layerSize.width - objectSize.width - offset
}

const wrapper = (align, offset = 0) => {
    return {
        calculate: align,
        offset: offset
    }
}

const Align = {
    center: (o) => wrapper(center, o),
    top: (o) => wrapper(top, o),
    bottom: (o) => wrapper(bottom, o),
    left: (o) => wrapper(left, o),
    right: (o) => wrapper(right, o),
}

export default Align