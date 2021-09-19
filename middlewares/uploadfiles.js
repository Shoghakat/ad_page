const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        if(req.baseUrl === '/ad' || req.baseUrl === '/item') {
            cb(null, process.env.PWD + '/uploads/ads/')
        }
        if(req.baseUrl === '/profile/picture') {
            cb(null, process.env.PWD + '/uploads/profile')
        }
    },
    filename: (req, file, cb) => {
        cb(null, Math.random().toString(10) + '_' +file.originalname)
    }
})


const upload = multer({
    storage: fileStorageEngine,
    limits: { fileSize: 5 * 1024 * 1024 }
}).single('image')

const uploadFile = (req, res, next) => {
    upload(req, res, err => {
        if (err) {
            res.render('error', { err: err })
        }
        
        next()
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
        if (err) {
            return res.render('error', { err: err })
        }
        
        next()
    })
}

module.exports = { uploadFile, uploadFiles }