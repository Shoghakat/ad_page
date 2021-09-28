const paginationFunction = (items) => {
    const page = parseInt(req.query.page, 10)
    const limit = parseInt(req.query.limit, 10)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if(endIndex < items.length) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    if(startIndex > 1) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    results.paginatedResult = items.slice(startIndex, endIndex)

    return next()
}

module.exports = paginationFunction