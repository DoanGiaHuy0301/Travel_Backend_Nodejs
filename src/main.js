const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

// Connect to the database
db.connect();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

// Additional middleware
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "..", "public")));

// Set up Handlebars
app.engine(
  ".hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Initialize routes
route(app);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
