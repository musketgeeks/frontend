// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const folders = fs
	.readdirSync('src', { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => !['styles'].includes(dirent.name) && dirent.name);

const foldersPaths = ['@components', '@pages', '@shared', '@styles'];

module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['plugin:react/recommended', 'airbnb', 'next', 'prettier'],
	plugins: ['react', 'prettier'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.ts', '.tsx']
			}
		],
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-sort-props': [
			'error',
			{
				callbacksLast: true,
				shorthandFirst: true,
				reservedFirst: ['key'],
				multiline: 'last'
			}
		],
		'react/button-has-type': 'off',
		'react/require-default-props': 'off',
		'react/function-component-definition': 'off',
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['Link'],
				specialLink: ['hrefLeft', 'hrefRight'],
				aspects: ['invalidHref', 'preferButton']
			}
		],
		'prettier/prettier': ['error', { usePrettierrc: true }]
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				moduleDirectory: ['node_modules', 'src/']
			}
		}
	},
	overrides: [
		{
			files: ['**/*.ts?(x)'],
			parser: '@typescript-eslint/parser',
			extends: ['airbnb-typescript', 'airbnb-typescript-prettier'],
			plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'unused-imports'],
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				},
				ecmaVersion: 12,
				sourceType: 'module',
				project: './tsconfig.json'
			},
			rules: {
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: 'variableLike',
						format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
						leadingUnderscore: 'allow'
					}
				],
				'import/prefer-default-export': 'off',
				'import/no-cycle': 'off',
				'simple-import-sort/exports': 'error',
				'import/first': 'error',
				'import/newline-after-import': 'error',
				'import/no-duplicates': 'error',
				'unused-imports/no-unused-imports': 'error',
				'simple-import-sort/imports': [
					'error',
					{
						groups: [
							['^react', '^next', '^recoil', '^@?\\w'],
							['^styles'],
							[
								`^(${foldersPaths.join('|')})(/.*|$)`,
								`^(${folders.join('|')})(/.*|$)`,
								'^\\.'
							],
							['^[^.]']
						]
					}
				]
			}
		}
	]
};
