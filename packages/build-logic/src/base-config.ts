import {resolve} from 'node:path'
import rollupNodeExternalsPlugin from 'rollup-plugin-node-externals'
import {BuildOptions, defineConfig, LibraryOptions, mergeConfig} from 'vite'
import viteDtsPlugin from 'vite-plugin-dts'
import {defineConfig as defineVitestConfig} from 'vitest/config'

export type CreateConfigArgs = {
  build:
    & Pick<BuildOptions, 'minify'>
    & Pick<LibraryOptions, 'entry' | 'formats'>
}

export const createConfig = (args: CreateConfigArgs) => {
  const dirname = process.cwd()

  return mergeConfig(
    defineConfig({
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
    }),
    defineVitestConfig({
      test: {
        watch: false,
        include: [resolve(dirname, 'src', '__tests__', '**', '*.test.ts?(x)')],
        sequence: {
          hooks: 'stack',
        },
      },
    }),
  )
}
