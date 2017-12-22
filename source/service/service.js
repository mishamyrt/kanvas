import Type from '../types.js'
import ResizeHelper from './resize.js'

export default class Service {
    static register(self) {
        Storage.add(self);
    }
    static getChildren(parent) {
        const children = [];
        const childrenId = Storage.getById(parent.uuid).children;
        for (const i in childrenId) {
            children.push(Storage.getById(childrenId[i]).object)
        }
        return children;
    }
    static appendChild(parent, child) {
        const parentStorage = Storage.getById(parent.uuid);
        const childStorage = Storage.getById(child.uuid);
        parentStorage.children.push(child.uuid);
        childStorage.parents.push(parent.uuid);
    }
    static registerResize(object, width, height) {
        ResizeHelper.register(object, width, height)
    }
    // static registerAlign(object, width, height) {
    //     autoSized.push({
    //         uuid: object.uuid,
    //         width: width === 'auto' ? true : width,
    //         height: height === 'auto' ? true : height
    //     })
    // }
    static updateParents(object) {
        if (object.uuid) {
            const parentsIds = Storage.getById(object.uuid).parents;
            if (parentsIds.length > 0) {
                for (const i in parentsIds) {
                    const parent = Storage.getById(parentsIds[i]).object;
                    parent.updateChild(object)
                }
            }
        }
    }
}


const Storage = {
    add: (object) => {
        const id = Storage.generateUUID(object.type);
        object.uuid = id;
        Storage.deposit[object.type][id] = {
            uuid: id,
            object: object,
            parents: [],
            children: []
        }
        return id;
    },
    getById: (id) => {
        return Storage.deposit[Type.getById(id)][id]
    },
    generateUUID: (type) => {
        const dictionary = "abcdefghijklmnopqrstuvwxyz0123456789";
        let uuid = type.toString();
        for (let i = 0; i < 6; i++) {
            uuid += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
        }
        if (Storage.deposit[type][uuid]) {
            return Storage.generateUUID(type)
        }
        return uuid;
    },
    deposit: [{}, {}, {}]
}
