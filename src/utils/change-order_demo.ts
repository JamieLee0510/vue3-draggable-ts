import { DraggableItem } from '../types/draggable-item.interface'

export const changeArrayOrder = (
    arr: Array<any>,
    target: any,
    newIndexOfTarget: number,
    keyName: string,
): Array<any> => {
    let newArr = arr.filter(e => e[keyName] !== target[keyName])
    //console.log('newArr before splice:', newArr)
    newArr.splice(newIndexOfTarget, 0, { ...target })
    //console.log('newArr after splice:', newArr)
    return newArr
}
