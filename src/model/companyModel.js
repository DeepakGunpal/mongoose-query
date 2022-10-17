const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: [true, 'Company Name is required.'], capitalise: true },
    url: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('company', companySchema);