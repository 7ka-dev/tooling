import base from './index.js'
import boundaries from 'eslint-plugin-boundaries'

// Light FSD: no widgets, no entities layers
// Suitable for smaller projects: app → pages → features → shared

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
        { type: 'features', pattern: 'src/features/**' },
        { type: 'shared',   pattern: 'src/shared/**' },
      ],
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*', '**/*.stories.*'],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app',      allow: ['pages', 'features', 'shared'] },
            { from: 'pages',    allow: ['features', 'shared'] },
            { from: 'features', allow: ['shared'] },
            { from: 'shared',   allow: [] },
          ],
        },
      ],
      'boundaries/no-unknown': 'error',
    },
  },
]