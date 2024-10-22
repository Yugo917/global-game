/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
var baseConfig = require("./jest.config.js");
var unitConfig = {
  ...baseConfig,
  testRegex: "^(.(?!(/integration/)))*.(spec|test).(ts|tsx)"
}
console.log("🧪 RUNNING UNIT TESTS");
console.log("unitConfig", unitConfig);
module.exports = unitConfig;