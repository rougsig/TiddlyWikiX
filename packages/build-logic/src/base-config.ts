import {resolve} from 'node:path'
import rollupNodeExternalsPlugin from 'rollup-plugin-node-externals'
import {BuildOptions, ConfigEnv, defineConfig, LibraryOptions, mergeConfig} from 'vite'
import viteDtsPlugin from 'vite-plugin-dts'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'
import {defineConfig as defineVitestConfig} from 'vitest/config'

export type CreateConfigFn = (env: ConfigEnv) => ({
  build:
    & Pick<BuildOptions, 'minify'>
    & Pick<LibraryOptions, 'entry' | 'formats'>
})

export const createConfig = (create: CreateConfigFn) => {
  const dirname = process.cwd()

  return defineConfig((env) => {
    const config = create(env)

    return mergeConfig(
      defineConfig({
        build: {
          minify: config.build.minify,
          lib: {
            entry: config.build.entry,
            formats: config.build.formats,
          },
          rollupOptions: {
            plugins: [
              rollupNodeExternalsPlugin({
                include: [
                  /rollup.*/,
                  /vite.*/,
                ],
              }),
            ],
          },
        },
        plugins: [
          tsconfigPathsPlugin(),
          env.mode === 'production' && viteDtsPlugin({
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
          // environment: 'jsdom', // Temporary extract to config
          sequence: {
            hooks: 'stack',
          },
        },
      }),
    )
  })
}
