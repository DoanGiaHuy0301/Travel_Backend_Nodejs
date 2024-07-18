const path = require("path");
const sass = require("sass");
const fs = require("fs");
const inputPath = path.join(__dirname, "resources", "scss", "styles.scss");
const outputPath = path.join(__dirname, "..","public", "css", "styles.css");

sass.render(
  {
    file: inputPath,
    outFile: outputPath,
    outputStyle: "compressed", 
  },
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      // Ensure the directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      // Write the CSS output
      fs.writeFileSync(outputPath, result.css);
    }
  }
);
