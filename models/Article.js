const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Article", schema);