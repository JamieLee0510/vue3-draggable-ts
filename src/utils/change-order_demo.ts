export const changeArrayOrder = <T>(
    arr: Array<T>,
    target: T,
    newIndexOfTarget: number,
    keyName: string,
): Array<T> => {
    let newArr = arr.filter(e => e[keyName] !== target[keyName])
    //console.log('newArr before splice:', newArr)
    newArr.splice(newIndexOfTarget, 0, { ...target })
    //console.log('newArr after splice:', newArr)
    return newArr
}
