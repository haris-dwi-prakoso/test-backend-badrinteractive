const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync();

const materialRoute = require('./routes/material');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/material', materialRoute);
app.listen(port, () => console.log(`App listening on port: ${port}`));