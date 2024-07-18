const { mutipleMongooseToObject } = require("../../util/mongoose");
const Tour = require("../models/Tour");

class SiteController {
  index(req, res, next) {
    Tour.find({})
      .then((tours) =>
        res.render("home", {
          tours: mutipleMongooseToObject(tours),
        })
      )
      .catch(next);
  }
}

module.exports = new SiteController();
