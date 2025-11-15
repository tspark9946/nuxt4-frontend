// @ts-check
import antfu from '@antfu/eslint-config';

import withNuxt from './.nuxt/eslint.config.mjs';

// TODO: add eslint-plugin-tailwindcss
export default withNuxt(
  antfu(
    {
      type: 'app',
      vue: true,
      typescript: true,
      formatters: true,
      stylistic: {
        indent: 2,
        semi: true,
        quotes: 'single',
      },
    },
    {
      rules: {
        'vue/no-multiple-template-root': 'off',
        'ts/no-redeclare': 'off',
        'ts/consistent-type-definitions': ['error', 'type'],
        'no-console': ['warn'],
        'antfu/no-top-level-await': ['off'],
        'node/prefer-global/process': ['off'],
        'node/no-process-env': ['error'],
        'perfectionist/sort-imports': [
          'error',
          {
            tsconfigRootDir: '.',
          },
        ],
        'unicorn/filename-case': [
          'error',
          {
            // Options: kebabCase, camelCase, PascalCase, snake_case
            case: 'kebabCase',
            ignore: ['README.md'],
          },
        ],
      },
    },
  ),
);
