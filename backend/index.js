const express = require('express');
const connectToDB = require('./db');
var cors = require('cors')

connectToDB();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json()); //it is a middleware to use req.body function

app.use('/employee', require('./routes/employeeDetails'));

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})