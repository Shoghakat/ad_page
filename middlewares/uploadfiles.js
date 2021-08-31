const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd() + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


const upload = multer({
    storage: fileStorageEngine,
    limits: { fileSize: 5 * 1024 * 1024 }
}).single('image')

const uploadFile = (req, res, next) => {
    upload(req, res, err => {
        if (err instanceof multer.MulterError) {
            res.render('error', { user: req.user, err: err })
        } else if (err) {
            res.render('error', { user: req.user, err: err })
        } else {
            next()
        }
    })
}


const uploads = multer({
    storage: fileStorageEngine,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5
    }
}).array('image')

const uploadFiles = (req, res, next) => {
    uploads(req, res, err => {
        if (err instanceof multer.MulterError) {
            res.render('error', { user: req.user, err: err })
        } else if (err) {
            res.render('error', { user: req.user, err: err })
        } else {
            next()
        }
    })
}

module.exports = { uploadFile, uploadFiles }