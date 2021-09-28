const checkValidError = (error, req, res, next) => {
    if(error !== undefined) {
        error.details[0].status = 400
        req.flash('error_msg', error.message)
        return next(error.details[0])
    }
    return next()
}


const checkItem = (req, next, status, message) => {
    const err = {
        status: status,
        message: message
    }
    req.flash('error_msg', err.message)
    return next(err)
}


module.exports = { checkValidError, checkItem }