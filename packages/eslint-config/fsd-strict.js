import base from './index.js'
import boundaries from 'eslint-plugin-boundaries'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...base,
  {
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app',      pattern: 'src/app/**' },
        { type: 'pages',    pattern: 'src/pages/**' },
        { type: 'widgets',  pattern: 'src/widgets/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared',   pattern: 'src/shared/**' },
      ],
      'boundaries/ignore': [
        '**/*.test.*',
        '**/*.spec.*',
        '**/*.stories.*',
        '**/main.tsx',
      ],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app',      allow: ['app', 'pages', 'widgets', 'features', 'entities', 'shared'] },
            { from: 'pages',    allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
            { from: 'widgets',  allow: ['widgets', 'features', 'entities', 'shared'] },
            { from: 'features', allow: ['features', 'entities', 'shared'] },
            { from: 'entities', allow: ['entities', 'shared'] },
            { from: 'shared',   allow: ['shared'] },
          ],
        },
      ],
      'boundaries/no-unknown': 'error',
    },
  },
]