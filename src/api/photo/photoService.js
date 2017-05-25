const Photo = require('./photo')
const errorHandler = require('../common/errorHandler')

Photo.methods(['get', 'post', 'put', 'delete'])
Photo.updateOptions({ new: true, runValidators: true })
Photo.after('post', errorHandler).after('put', errorHandler)

module.exports = Photo