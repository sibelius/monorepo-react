module.exports = {
  projects: [
    '<rootDir>/packages/hooks/jest.config.js',
    '<rootDir>/packages/theme/jest.config.js',
    '<rootDir>/packages/ui/jest.config.js',
  ],
  transform: {
    '^.+\\.(js|ts|tsx)?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx', 'json'],
}