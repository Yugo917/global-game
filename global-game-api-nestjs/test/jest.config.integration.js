/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
var baseConfig = require("./jest.config.js");
var integrationConfig = {
  // eslint-disable-next-line no-restricted-syntax
  ...baseConfig,
  testRegex: "(.+)/integration/(.+).(spec|test).(ts|tsx|js)"
}
console.log("🧪 RUNNING INTEGRATION TESTS");
console.log("integrationConfig", integrationConfig);
module.exports = integrationConfig;