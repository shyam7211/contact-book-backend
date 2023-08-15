const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config()

connectDb();
const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use('/api/contacts',require('./routes/contactRoutes'));
app.use('/api/user',require('./routes/userRoutes'));
app.use(errorHandler);

connectDb().then(() => {
    app.listen(port, () => {
        console.log("Hello there i am in " + port);
    })
})
