module.exports = {
	transform: {'^.+\\.tsx?$': 'ts-jest'},
	testEnvironment: 'jsdom',
	testRegex: '/src/.*\\.(test|spec)?\\.(ts|tsx)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	setupFiles: ['<rootDir>/src/enzyme.config.ts'],
};
