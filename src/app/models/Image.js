const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Image = new Schema(
  {
    destination_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
    tour_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tour" },
    image_url: { type: String, required: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);
Image.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Image", Image, "image");
