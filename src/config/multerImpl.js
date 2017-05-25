const _ = require('lodash')
const Photo = require('../api/photo/photo')

module.exports = (app) => {
    const multer = require('multer');
    const storage = multer.diskStorage({
        destination: '../react-redux-example-front-end/public/images',
        filename: function (req, file, cb) {
            // Mimetype stores the file type, set extensions according to filetype
            switch (file.mimetype) {
                case 'image/jpeg':
                    ext = '.jpeg';
                    break;
                case 'image/png':
                    ext = '.png';
                    break;
                case 'image/gif':
                    ext = '.gif';
                    break;
            }

            cb(null, file.originalname.slice(0, 4) + Date.now() + ext);
        }
    });
    const upload = multer({ storage: storage });

    const sendErrorsFromDB = (res, dbErrors) => {
        const errors = []
        _.forIn(dbErrors.errors, error => errors.push(error.message))
        return res.status(400).json({ errors })
    }

    app.post('/uploadHandler', upload.single('file'), function (req, res, next) {

        const name = req.file.originalname
        const url  = 'http://localhost:8080/images/' + req.file.filename
        const newPhoto = new Photo({ name, url })
        console.log(newPhoto)

        newPhoto.save(err => {
            if (err) {
                console.log(err)
                return sendErrorsFromDB(res, err)
            } else {
                if (req.file && req.file.originalname) {
                    console.log(`Received file ${req.file.originalname}`);
                }

                res.send({ responseText: req.file.path }); // You can send any response to the user here
            }
        })




    });
}
