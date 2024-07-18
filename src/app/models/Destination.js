const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Destination = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    best_time_to_visit: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);
Destination.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Destination", Destination, "destination");
