const express = require('express');
const cors = require('cors');
const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync();

const transactionRoute = require('./routes/transaction');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/transaction', transactionRoute);
app.listen(port, () => console.log(`App listening on port: ${port}`));