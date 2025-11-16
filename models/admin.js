const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({}, { strict: false })

module.exports = mongoose.model("admins", adminSchema)