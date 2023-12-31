const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isPro: {type: Boolean, required: true},
    isAdmin: {type: Boolean},
});

module.exports = mongoose.model("User", userSchema);