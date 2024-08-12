const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        title :{
            type : String,
            required : true
        },
        description :{
            type : String,
            required : true
        },
        status :{
            type : String,
            enum : ['pending','done'],
            required : true,
            default: "pending"
        },
        userId :{
            type : String,
            required : true,
            default: "pending"
        }
    }, {timestamps : true}
);

const Task = mongoose.model('Task',taskSchema);

module.exports = Task ;