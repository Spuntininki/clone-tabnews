const nextJest = require("next/jest");
require("dotenv").config({ path: ".env.development" });

const createJestConfig = nextJest({
	moduleDirectories: ["node_modules", "<rootDir>"],
});
const jestConfig = createJestConfig();

module.exports = jestConfig;
