const express = require('express');
const router = express.Router();
const uploads = require('../middleware/multer');
const {
  createThrift,
  getAllThrifts,
  getSingleThrift,
  getThriftByCity,
  getThriftByStyle,
  searchThriftStore,
} = require('../controllers/thrift');
const { validator, result, validateFile } = require('../middleware/validatorThrift');

router.post(
    '/createThrift',
    uploads.single('thumbnail'),
    validator,
    result,
    validateFile,
    createThrift
); //working

router.get('/thrift', getAllThrifts); //working : http://localhost:3000/api/thrift
router.get('/thrift/:id', getSingleThrift); //working : http://localhost:3000/api/thrift/1619607235847
router.get('/thriftCity/:city/:qty?', getThriftByCity); //working : http://localhost:3000/api/thriftCity/Marseille/5
router.get('/thriftStyle/:style/:qty?', getThriftByStyle); //working : http://localhost:3000/api/thriftStyle/vintage/5
router.post('/thrift/search/:query', searchThriftStore); //working : http://localhost:3000/api/thrift/search/lilou

module.exports = router;
