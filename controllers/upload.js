const { upload_image_to_bucket }  = require('../services/S3ImageUpload.js')

const upload_image = async(file)=> {
  const blob = file.buffer
  const key = file.originalname
  const uploaded_image = await upload_image_to_bucket(blob, key)
  return uploaded_image
}

module.exports = {
  upload_image
} 