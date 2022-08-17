const express = require('express');
const { create_carousel_slide, get_last_records } = require('../controllers/carousels')
const upload = require('../middlewares/fileUploadMiddleware')
const { body, param, query, validationResult } = require('express-validator');

module.exports = (app) => {
    const router = express.Router();
  
    router.post('/', upload.single('image'), 
        body('title', "Title Field is required.").notEmpty(),
        body('sub_title', "Sub Title Field is required.").notEmpty(),
        async (req, res, next) => {
            const validation_errors = validationResult(req);
            if (!validation_errors.isEmpty()) {
                return res.status(400).json({ status: false, message: `Validation Error`, errors: validation_errors.array() });
            }

            try{
            if (!req.file) {
                res.status(401).json({status:false, message: 'Please Provide an image to upload.'});
            }
            const uploaded_image = await create_carousel_slide(req.file, req.body)
            return res.status(201).json({ status: true, message: "Carousel Slide Created Successfully.", data: uploaded_image })
            }catch(e){
                    console.log(e)
                    return res.status(500).json({ status: false, message: "Error Creating Slide." })
            }
        }
    )

    router.get('/', 
        query('count', "Count is required.").isNumeric().notEmpty(),
        async(req, res, next)=> {
            const validation_errors = validationResult(req);
            if (!validation_errors.isEmpty()) {
                return res.status(400).json({ status: false, message: `Validation Error`, errors: validation_errors.array() });
            }

            try{
                const {count} =  req.query
                const slides = await get_last_records(count)
                return res.status(200).json({status: true, message: "Carousel slides fetched successfully.", data: slides})
            } catch(e) {
                console.log(e)
                return res.status(500).json({ status: false, message: "Error Fetching Slides." })
            }
        }
    )

  
    app.use('/carousels', router)
  } 