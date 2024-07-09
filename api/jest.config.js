// jest.config.js
export default {
  transform: {},
  testEnvironment: "node",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "babel-jest",
  },
};
