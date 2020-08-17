const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: { type: String, maxlength: [30, 'Title is too long, maximum length is 30 letters'], required: [true, 'You forgot to fill the title field'] },
    lead: { type: String, maxlength: [60, 'Lead is too long, maximum length is 60 letters'], }, // tablica ustawia potenjalny error message
    content: { type: Array, required: [true, 'You forgot to fill the content'] },
    date: { type: Date, default: Date.now },
    confirmed: { type: Boolean, default: false },
    basic: { type: Boolean, default: false }
});

module.exports = mongoose.model('News', newsSchema);