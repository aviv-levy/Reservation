const mongoose = require("mongoose");
const JOI = require("joi");

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
})

// JOI Validations
const baselineValidation = {
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

const UserLoginModel = mongoose.model("UserLoginModel", UserSchema, "users");

module.exports = UserLoginModel;
