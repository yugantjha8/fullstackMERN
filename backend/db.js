const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/crm'

const connectToDB = ()=>{
    mongoose.connect(mongoURI);    
}

module.exports = connectToDB;