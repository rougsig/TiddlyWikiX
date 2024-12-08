import {defineConfig} from 'vite'
import {createConfig} from './src'

export default defineConfig(createConfig({
  build: {
    minify: false,
    entry: {
      index: 'src/index.ts',
    },
    formats: ['es'],
  },
}))
