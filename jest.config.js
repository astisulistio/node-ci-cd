module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],  // Make sure Jest looks in the 'tests' folder
    testMatch: [
      '**/*.test.js',  // Look for files ending in .test.js
    ],
    transform: {
      '^.+\\.js$': 'babel-jest',  // Ensure Babel is used to transform JS files
    },
    verbose: true,
  };
  