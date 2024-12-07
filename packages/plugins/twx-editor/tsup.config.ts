import fs from 'node:fs'
import path from 'node:path'
import {dedent} from 'ts-dedent'
import {defineConfig} from 'tsup'

export default defineConfig(() => ({
  entry: {
    lib: 'src/lib.ts',
    widget: 'src/widget.ts',
  },
  clean: true,
  minify: false,
  format: 'iife',
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
}))
