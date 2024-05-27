module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:security/recommended'],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	overrides: [],
	globals: {
		_events: 'readonly'
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				tabWidth: 4,
				semi: true,
				arrowParens: 'always',
				bracketSameLine: true,
				bracketSpacing: true,
				singleQuote: true,
				trailingComma: 'none'
			}
		],
		'no-dupe-keys': 'error',
		'no-unreachable': 'error',
		'func-style': ['error', 'declaration', { allowArrowFunctions: true }]
	}
};
