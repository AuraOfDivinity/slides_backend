require('dotenv').config()
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./database/instance.js')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Slides Backend running successfully!')
});

require('./routes/index.js')(app)

app.listen(process.env.PORT, ()=> {
    console.log(`Server running on port ${process.env.PORT} successfully.`)

    db.sequelize.authenticate().then(() => {
        console.log('DB Connection has been established successfully.');
        }).catch((error) => {
          console.error('Unable to connect to the database: ', error);
        });
    db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
    console.log('server started');
})