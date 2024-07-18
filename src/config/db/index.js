const mongoose = require("mongoose");
// const User = require("../../app/models/User");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/travel_dev");
    console.log("Connect successfully!!!");

    // await User.init();

  } catch (error) {
    console.log("Connect failure!!!");
  }
}

module.exports = { connect };
