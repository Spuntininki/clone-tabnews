const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: ".",
});

const customJestConfig = {
    setupFiles: ["<rootDir>/tests/env-setup.js"],
    moduleNameMapper: {
        "^infra/(.*)$": "<rootDir>/infra/$1",
    },
    moduleDirectories: ["node_modules", "<rootDir>"],
    testEnvironment: "node",
};

// Get the Next.js config first, then override with our custom config
const nextConfig = createJestConfig(customJestConfig);

module.exports = async () => {
    const config = await nextConfig();

    // Ensure our moduleNameMapper takes precedence
    config.moduleNameMapper = {
        ...config.moduleNameMapper,
        "^infra/(.*)$": "<rootDir>/infra/$1",
    };

    return config;
};