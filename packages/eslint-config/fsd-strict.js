import base from './index.js'
import { createConfig } from '@feature-sliced/eslint-config'

export default [
  ...base,
  ...createConfig({
    layers: ['app', 'pages', 'widgets', 'features', 'entities', 'shared'],
  }),
]