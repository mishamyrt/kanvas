// // const eventProcessor = (stageId, event) => {
// //     const activeId = objectUnderCursor(stageId, event)
// //     if (activeId){
// //         const kanvasEvent = generateKanvasEvent(event, stageId, activeId.object, activeId.layer)
// //         if (event.type == 'click' && objects[activeId.object].self.parameters.click) {
// //             objects[activeId.object].self.parameters.click(kanvasEvent)
// //         }
// //         else if (event.type == 'mousemove'  && objects[activeId.object].self.parameters.hover) {
// //             if (lastHovered.object !== activeId.object){
// //                 lastHovered = activeId
// //                 objects[activeId.object].self.parameters.hover(kanvasEvent)
// //                 console.log('hover')
// //             }
// //         }
// //     }
// //     else {
// //         objectLeaved(stageId)
// //     }
// // }
// stage.stage.onmousemove = (event) => eventProcessor(id, event)
// stage.stage.onclick = (event) => eventProcessor(id, event)
// // const objectLeaved = (stageId) => {
// //     console.log('leave')
// //     if (lastHovered.object !== '' && objects[lastHovered.object].self.parameters.leave){
// //         objects[lastHovered.object].self.parameters.leave({
// //             object: objects[lastHovered.object].self,
// //             layer: layers[lastHovered.layer].self,
// //             stage: stages[stageId].self,
// //         })
// //     }
// //     lastHovered = {   
// //         object: '',
// //         layer: '',
// //     }
// // }
// const generateKanvasEvent = (event, stageId, objectId, layerId) => {
//     return {
//         x: event.clientX,
//         y: event.clientY,
//         stage: stages[stageId].self,
//         object: objects[objectId].self,
//         layer: layers[layerId].self
//     }
// }
// const objectUnderCursor = (stageId, event) => {
//     if (stages[stageId].interactiveObjects.length > 0) {
//         const y = event.clientY - stages[stageId].stage.offsetTop
//         const x = event.clientX - stages[stageId].stage.offsetLeft
//         for (const objectId of stages[stageId].interactiveObjects) {
//             if ((x < objects[objectId.object].x + objects[objectId.object].width) &&
//                 (x > objects[objectId.object].x) &&
//                 (y < objects[objectId.object].y + objects[objectId.object].height) &&
//                 (y > objects[objectId.object].y)) {
//                 return objectId;
//             }
//         }
//         return false;
//     }
// }
// const getStageInteractiveObjects = (stageId) => {
//     const ids = []
//     for (const i in stages[stageId].children) {
//         for (const j in layers[stages[stageId].children[i]].children) {
//             const id = layers[stages[stageId].children[i]].children[j];
//             if (objects[id].interactive) {
//                 ids.push({
//                     object: id,
//                     layer: stages[stageId].children[i]
//                 })
//             }
//         }
//     }
//     return ids
// }
// const generateId = (length, storage) => {
//     let id = '';
//     const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
//     for (let i = 0; i < length; i++)
//         id += possible.charAt(Math.floor(Math.random() * possible.length));
//     if (storage[id])
//         return generateId()
//     return id;
// }