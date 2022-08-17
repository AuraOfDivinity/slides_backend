const { upload_image_to_bucket }  = require('../services/S3ImageUpload.js')
const { QueryTypes } = require('sequelize');
const db = require('../database/instance')

const Slides = db.Slides

/**
 * Uploads the image into the S3 bucket & stores the genrated link in the database.
 * @param {*} file 
 * @param {*} data req.body object 
 * @returns Created Slide element
 */
const create_carousel_slide = async(file, data) => {
    try{
        const blob = file.buffer
        const key = file.originalname
        const uploaded_image = await upload_image_to_bucket(blob, key)
        data.image_url = uploaded_image.Location

        const created_slide = await Slides.create(data)
        return created_slide
    }catch (e) {
        console.log(e)
        return res.status(500).json({status: "false", message: "Error creating carousel slide."})
    }
}

/**
 * Queries the database and returns a n number of required carousel slides.
 * @param {*} count Number of slides required.
 * @returns an arry of slides.
 */
const get_last_records = async(count) => {
    const QUERY = `SELECT * FROM slides ORDER BY id DESC LIMIT ${count}`;
    const [results, metadata] = await db.sequelize.query(QUERY, null, { type: QueryTypes.SELECT })
    .catch(function (err) {
        console.log(err)
        return res.status(500).json({status: "false", message: "Error querying the db for slides."})
    });

    return results
}

module.exports={
    create_carousel_slide,
    get_last_records
}