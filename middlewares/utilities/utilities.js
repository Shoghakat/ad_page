const getParentAndChildCategs = (categs) => {
    return categs.reduce((acc, el) => {
        if(el.parentId === null) {
            acc.arr1.push(el)
        } else {
            acc.arr2.push(el)
        }
        return acc
    }, {
        arr1: [],
        arr2: []
    })
}

module.exports = { getParentAndChildCategs }