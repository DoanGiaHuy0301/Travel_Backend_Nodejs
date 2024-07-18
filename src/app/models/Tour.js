const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Tour = new Schema(
  {
    destination_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    duration: { type: Number },
    start_date: { type: Date },
    end_date: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);
Tour.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Tour", Tour, "tour");
