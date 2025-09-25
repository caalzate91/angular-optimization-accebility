const path = require("path");
const rootDir = path.join(__dirname);

module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'ts-jest',
    '^.+\\.css$': 'jest-transform-stub',
    '^.+\\.html$': 'jest-transform-stub'
  },
  moduleNameMapper: {
    '\\.(html|css)$': 'jest-transform-stub'
  },
  transformIgnorePatterns: [
    "node_modules/(?!@ngx-translate|@angular|@ngrx|ngx-socket-io|@ng-bootstrap)",
  ],
  collectCoverage: true,
  coverageDirectory: path.join(`${rootDir}`, '/coverage/'),
  coverageReporters: ["html", "json", "lcov", "text", "clover", "cobertura"], // Tipos de reportes que se generan
  reporters: [
    "default",
    ["jest-html-reporters", { publicPath: "./coverage/", filename: "report-jest.html" }],
    ["jest-junit", { outputDirectory: "./coverage", outputName: "junit.xml" }]
  ]
};