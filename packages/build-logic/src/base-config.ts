import {resolve} from 'node:path'
import rollupNodeExternalsPlugin from 'rollup-plugin-node-externals'
import {BuildOptions, defineConfig, LibraryOptions} from 'vite'
import viteDtsPlugin from 'vite-plugin-dts'

export type CreateConfigArgs = {
  build:
    & Pick<BuildOptions, 'minify'>
    & Pick<LibraryOptions, 'entry' | 'formats'>
}

export const createConfig = (args: CreateConfigArgs) => {
  const dirname = process.cwd()

  return defineConfig({
    build: {
      minify: args.build.minify,
      lib: {
        entry: args.build.entry,
        formats: args.build.formats,
      },
      rollupOptions: {
        plugins: [
          rollupNodeExternalsPlugin(),
        ],
      },
    },
    plugins: [
      viteDtsPlugin({
          exclude: [resolve(dirname, 'src', '__tests__', '**')],
          entryRoot: resolve(dirname, 'src'),
        },
      ),
    ],
  })
}
