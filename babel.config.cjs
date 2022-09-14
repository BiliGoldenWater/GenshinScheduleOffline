const { idInterpolationPattern } = require("./src/langs/extract.cjs");
module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    [
      "formatjs",
      {
        idInterpolationPattern
      }
    ]
  ]
};
