module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest',
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.tsx$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};