const mongoose = require('mongoose')
const {Schema} = mongoose

const EmployeeSchema = new Schema({
    name:{
        type:String,
        reuired:true
    },
    age:{
        type:Number,
        reuired:true
    },
    designation:{
        type:String,
        reuired:true
    },
    experience:{
        type:String,
        reuired:true
    }
})

module.exports = mongoose.model('employee', EmployeeSchema);