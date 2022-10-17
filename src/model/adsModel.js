const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const adsSchema = new mongoose.Schema({
    companyId: { type: ObjectId, ref: "company" },
    primaryText: { type: String, required: [true, "Primary text is mandatory"] },
    headline: { type: String },
    description: { type: String },
    CTA: { type: String, uppercase: true, required: [true, "CTA is mandatory"] },
    imageUrl: { type: String },
}, { timestamps: true });

adsSchema.index({ "$**": "text" })

module.exports = mongoose.model('ads', adsSchema);