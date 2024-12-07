import fs from 'node:fs'
import path from 'node:path'
import {dedent} from 'ts-dedent'
import {defineConfig} from 'tsup'

export default defineConfig(() => ({
  entry: {
    bundle: 'src/bundle.ts',
    widget: 'src/widget.ts',
  },
  clean: true,
  minify: false,
  shims: false,
  format: 'cjs',
  platform: 'browser',
  sourcemap: 'inline',
  onSuccess: 'cp readme.tid plugin.info dist/',
  plugins: [
    {
      name: 'tiddlywiki-metadata',
      renderChunk: (code, {entryPoint}) => {
        if (entryPoint == null) return null

        const {root, dir, name} = path.parse(entryPoint)
        const metaFile = path.format({root, dir, name, ext: '.meta'})
        if (fs.existsSync(metaFile)) {
          return {
            code: dedent`
              ${fs.readFileSync(metaFile, 'utf8')}
              ${code}
            `,
          }
        }
      },
    },
  ],
  // Does not work with IIFE, so looks like we do not need IIFE, CJS works fine
  // https://github.com/egoist/tsup/blob/main/src/esbuild/index.ts#L134
  external: [
    /^\$:\/.*$/,
  ],
}))
