import {TiddlyWikiParser} from '#/tiddlywiki-parser'
import {TiddlyWiki} from 'tiddlywiki'
import {beforeAll, describe, expect, test} from 'vitest'

describe('testing tiddlywiki parser', () => {
  let parser: TiddlyWikiParser

  beforeAll(async () => {
    const $tw = TiddlyWiki();
    (global as any).$tw = $tw
    $tw.boot.argv = ['--version']
    await new Promise<void>((resolve: () => unknown) => {
      $tw.boot.boot(resolve)
    })
    parser = new TiddlyWikiParser()
  })

  test('$tw is defined', () => {
    expect($tw).toBeDefined()
  })

  describe('headers', () => {
    test('h1', () => {
      expect(parser.parse('! H1 Header Test')).toMatchInlineSnapshot(`
        [
          {
            "attributes": {
              "class": {
                "end": 1,
                "start": 1,
                "type": "string",
                "value": "",
              },
            },
            "children": [
              {
                "end": 16,
                "start": 2,
                "text": "H1 Header Test",
                "type": "text",
              },
            ],
            "end": 16,
            "rule": "heading",
            "start": 0,
            "tag": "h1",
            "type": "element",
          },
        ]
      `)
    })
  })
})
