declare module 'tiddlywiki' {
  export interface ITiddlyWiki {
    twx: Record<string, any> | undefined
  }
}

export const load = <T>(id: string): T => {
  const cache = $tw.twx || {}
  if (cache !== $tw.twx) $tw.twx = cache

  const cacheKey = `twx-editor/${id}`

  const fromCache = cache[cacheKey]
  if (fromCache) return fromCache

  const loaded = require(id)
  cache[cacheKey] = loaded

  return loaded
}
