const multer = require('multer')
const path = require('path')

const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
}


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        if(req.baseUrl === '/ad' || req.baseUrl === '/item') {
            cb(null, path.join(__dirname, '../uploads/ads/'))
        }
        if(req.baseUrl === '/profile/picture') {
            cb(null, path.join(__dirname, '../uploads/profile/'))
        }
    },
    filename: (req, file, cb) => {
        cb(null, Math.random().toString(10) + '_' +file.originalname)
    }
})


const uploadFile = (req, res, next) => {
    const upload = multer({
        storage: fileStorageEngine,
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => checkFileType(file, cb)
    }).single('image')

    upload(req, res, err => {
        // if (err instanceof multer.MulterError) {
        //     // A multer error occurred when uploading.
        // } else if (err) {
        //     // An unknown error occurred when uploading.
        // }
        if(err) {
            return next(err)
        }        
        return next()
    })
}


const uploadFiles = (req, res, next) => {
    const uploads = multer({
        storage: fileStorageEngine,
        limits: {
            fileSize: 5 * 1024 * 1024,
            files: 5
        },
        fileFilter: (_req, file, cb) => checkFileType(file, cb)
    }).array('image')

    uploads(req, res, err => {
        if (err) {
            return next(err)
            // return res.render('error', { err: err })
        }
        return next()
    })
}

module.exports = { uploadFile, uploadFiles }