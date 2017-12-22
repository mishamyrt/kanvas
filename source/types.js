const Type = {
    stage: 0,
    layer: 1,
    object: 2,
    getById: (id) => {
        return parseInt(id.substr(0, 1))
    }
}
export default Type