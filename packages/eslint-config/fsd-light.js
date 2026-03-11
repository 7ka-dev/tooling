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
            { from: 'app',      allow: ['app', 'pages', 'features', 'shared'] },
            { from: 'pages',    allow: ['pages', 'features', 'shared'] },
            { from: 'features', allow: ['features', 'shared'] },
            { from: 'shared',   allow: ['shared'] },
          ],
        },
      ],
      'boundaries/no-unknown': 'error',
    },
  },
]