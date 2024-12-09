import {createConfig} from '@repo/build-logic'
import {defineConfig} from 'vite'

export default defineConfig(createConfig({
  build: {
    minify: false,
    entry: {
      index: 'src/index.ts',
    },
    formats: ['es'],
  },
}))
