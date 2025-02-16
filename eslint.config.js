import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...pluginVue.configs['flat/recommended'],
  {
    plugins: {
      'typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        parser: tseslint.parser,
        project: './tsconfig.app.json',
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      'vue/eqeqeq': ['error', 'always'],
      'dot-notation': 'error',
      'vue/dot-notation': ['error'],
      'no-restricted-syntax': ['error'],
      'vue/no-restricted-syntax': ['error'],
      'vue/no-v-html': 'off', // not good practice
      'vue/no-sparse-arrays': ['error'],
      'vue/no-loss-of-precision': ['error'],
      'vue/no-constant-condition': ['warn'],
    },
  },
]
