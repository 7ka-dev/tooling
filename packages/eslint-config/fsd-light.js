import base from './index.js'
import { createConfig } from '@feature-sliced/eslint-config'

export default [
  ...base,
  ...createConfig({
    // widgets and entities are optional in light mode
    layers: ['app', 'pages', 'features', 'shared'],
  }),
]