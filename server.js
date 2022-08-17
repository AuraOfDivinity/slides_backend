require('dotenv').config()
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Slides Backend running successfully!')
});

require('./routes/index.js')(app)

app.listen(process.env.PORT, ()=> {
    console.log(`Server running on port ${process.env.PORT} successfully.`)
})