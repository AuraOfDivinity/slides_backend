const express = require('express');
const { upload_image } = require('../controllers/upload.js')
const upload = require('../middlewares/fileUploadMiddleware')


module.exports = (app) => {
  const router = express.Router();

  router.post('/image', upload.single('image'), async (req, res, next) => {

    try{
    if (!req.file) {
      res.status(401).json({status:false, message: 'Please Provide an image to upload.'});
    }
    const uploaded_image = await upload_image(req.file)
    return res.status(201).json({ status: true, message: "Image Uploaded to bucket Successfully", data: uploaded_image })
    }catch(e){
          console.log(e)
          return res.status(500).json({ status: false, message: "Error Uploading Image To Bucket." })
    }
  })

  app.use('/uploads', router)
} 