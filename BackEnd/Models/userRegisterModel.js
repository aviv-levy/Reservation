const mongoose = require("mongoose");
const JOI = require("joi");

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    city: String,
    address: String,
    phone: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// JOI Validations
const baselineValidation = {
    firstName: JOI.string().required().min(2).max(20).pattern(new RegExp(/^[א-ת\s]*$/)),
    lastName: JOI.string().required().min(2).max(20).pattern(new RegExp(/^[א-ת\s]*$/)),
    city: JOI.string().required().min(3).max(40),
    address: JOI.string().required().min(3).max(40),
    phone: JOI.string().required().pattern(new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")),
    email: JOI.string().required().email(),
    password: JOI.string().required().min(8).max(40),
};

// Post Validation
UserSchema.statics.validatePost = (obj) => {
    return JOI.object({
        ...baselineValidation,
        id: JOI.string().forbidden()
    }).validate(obj, { abortEarly: false });
}

// // Put Validation
// UserSchema.statics.validatePut = (obj) => {
//     return JOI.object({
//         ...baselineValidation
//     }).validate(obj, { abortEarly: false });
// }

// // Delete Validation
// UserSchema.statics.validateDelete = (obj) => {
//     return JOI.object({
//         id: JOI.string().forbidden(), 
//         isbn: JOI.number().required()
//     }).validate(obj, { abortEarly: false });
// }

const UserRegisterModel = mongoose.model("UserRegisterModel", UserSchema, "users");

module.exports = UserRegisterModel;
