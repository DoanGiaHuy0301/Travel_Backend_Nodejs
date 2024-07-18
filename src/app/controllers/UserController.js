const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
const User = require("../models/User");

class UserController {
  // [Get] /user/show
  show(req, res, next) {
    User.find({})
      .then((user) =>
        res.render("users/show", {
          user: mutipleMongooseToObject(user),
        })
      )
      .catch(next);
  }

  // [Get] /tours/trash
  showUserDeleted(req, res, next) {
    User.findWithDeleted({ deleted: true }).then((users) =>
      res.render("users/trash", {
        users: mutipleMongooseToObject(users),
      })
    );
  }

  // [Post] /users/create
  create(req, res, next) {
    res.render("users/create");
  }

  // [Post] /users/store
  store(req, res, next) {
    const user = new User(req.body);
    user
      .save()
      .then(() => res.redirect("/users/show"))
      .catch(next);
  }

  edit(req, res, next) {
    User.findById(req.params.id)
      .then((user) =>
        res.render("users/edit", {
          user: mongooseToObject(user),
        })
      )
      .catch(next);
  }
  // [Put] /users/:id
  update(req, res, next) {
    User.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/users/show"))
      .catch(next);
  }

  // [DELETE] /tours/:id
  delete(req, res, next) {
    User.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [DELETE] /users/:id/force
  forceDestroy(req, res, next) {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  restore(req, res, next) {
    User.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new UserController();
