import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist', 'node_modules', 'data']
  },
  {
    files: ['src/**/*.{ts,js,tsx,jsx}', 'test/**/*.{ts,js,tsx,jsx}'],
    rules: {
      'unicorn/filename-case': 'off',
      'import/prefer-default-export': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'no-console': 'error',
      'no-restricted-syntax': 'off',
      'no-duplicate-imports': 'error',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'no-underscore-dangle': 'off',
      'spaced-comment': 'off',
      'import/extensions': 'off',
      'comma-dangle': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'unicorn/prefer-string-replace-all': 'off'
    }
  },
  {
    languageOptions: {
      globals: globals.node
    }
  }
];
