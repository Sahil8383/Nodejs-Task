const mongoose = require('mongoose');
const Joi = require('joi');

const employeeSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    dateOfBirth:{
        type: Date,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    position:{
        type: String,
        required: true,
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

function employeeSchemaValidation(employee){
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
        dateOfBirth: Joi.date().required(),
        department: Joi.string().required(),
        position: Joi.string().min(3).max(30).required(),
    });

    return schema.validate(employee);
}

module.exports = {
    Employee,
    employeeSchemaValidation,
}