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


const validationFunction = (req, res, next, error, url) => {
    if(error !== undefined) {
        req.flash('error_msg', error.message)
        return res.redirect(url)
    }
    return next()
}


module.exports = {
    getParentAndChildCategs,
    validationFunction
}