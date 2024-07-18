const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
const Tour = require("../models/Tour");

class ToursController {
  // [Get] /tours/show
  show(req, res, next) {
    Tour.find({})
      .then((tours) =>
        res.render("tours/show", {
          tours: mutipleMongooseToObject(tours),
        })
      )
      .catch(next);
  }

  // [Get] /tours/trash
  showTourDeleted(req, res, next) {
    Tour.findWithDeleted({ deleted: true }).then((tours) =>
      res.render("tours/trash", {
        tours: mutipleMongooseToObject(tours),
      })
    );
  }

  // [Post] /tours/craete
  create(req, res, next) {
    res.render("tours/create");
  }

  // [Post] /tours/store
  store(req, res, next) {
    // res.json(req.body);
    const tour = new Tour(req.body);
    tour.save();
    res.send("Save Success");
  }

  edit(req, res, next) {
    Tour.findById(req.params.id)
      .then((tour) =>
        res.render("tours/edit", {
          tour: mongooseToObject(tour),
        })
      )
      .catch(next);
  }
  // [Put] /tours/:id
  update(req, res, next) {
    Tour.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/tours/show"))
      .catch(next);
  }

  // [DELETE] /tours/:id
  delete(req, res, next) {
    Tour.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [DELETE] /tours/:id/force
  forceDestroy(req, res, next) {
    Tour.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  restore(req, res, next) {
    Tour.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new ToursController();
