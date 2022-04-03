module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|ts|tsx)?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx', 'json'],
};
