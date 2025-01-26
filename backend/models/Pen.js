const { Schema, model } = require('mongoose');

const penSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    penSrc: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    html:{
        type:Schema.Types.String,
    },
    css: {
        type: Schema.Types.String,
    },
    js: {
        type: Schema.Types.String,
    },


}, { timestamps: true })

const Pen = model('Pen', penSchema)

module.exports = Pen;

