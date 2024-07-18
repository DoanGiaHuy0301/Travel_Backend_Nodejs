const toursRouter = require("./toursRouter");
const userRouter = require("./usersRouter");
const siteRouter = require("./siteRouter");

function route(app) {
  app.use("/tours", toursRouter);
  app.use("/users", userRouter);

  app.use("/", siteRouter);


}

module.exports = route;
