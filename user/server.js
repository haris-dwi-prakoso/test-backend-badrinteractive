const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync();

const userRoute = require('./routes/user');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/user', userRoute);
app.listen(port, () => console.log(`App listening on port: ${port}`));