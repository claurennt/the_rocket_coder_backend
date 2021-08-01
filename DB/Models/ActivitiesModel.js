const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitiesSchema = new Schema({
  id: Number,
  quote: { type: String, required: true },
  author: { type: String, required: true },
  activity: { type: String, required: true },
});

const Activities = mongoose.model("Activities", activitiesSchema);

module.exports = Activities;
