import './trim-margin'
import {printTree} from '@lezer-unofficial/printer'
import {parser as markdownParser} from '@lezer/markdown'
import {IParseTreeNode, TiddlyWiki} from 'tiddlywiki'
import {beforeAll, describe, expect, test} from 'vitest'

//
// All TiddlyWiki script syntax described here:
// https://tiddlywiki.com/static/WikiText.html
//
// All TiddlyWiki parse sources here:
// https://github.com/TiddlyWiki/TiddlyWiki5/blob/master/core/modules/parsers/wikiparser/rules
//
describe('testing tiddlywiki parser', () => {
  let parse: (input: string) => IParseTreeNode[]

  test('lezer-markdown', () => {
    const source = `
    |# H1 Header Test
    |## H2 Header Test
    |### H3 Header Test
    |#### H4 Header Test
    |##### H5 Header Test
    |###### H6 Header Test
    |
    |**BOLD**
    |
    |> Blockquotes can also be nested...
    |>> ...by using additional greater-than signs right next to each other...
    |> > > ...or with spaces between arrows.
    |
    `.trimMargin()
    const tree = markdownParser.parse(source)
    expect(printTree(tree, source)).toMatchInlineSnapshot(`
      "Document [1:0..13:0]
      ┣━  ATXHeading1 [1:0..1:16]
      ┃   ┗━  HeaderMark [1:0..1:1]: "#"
      ┣━  ATXHeading2 [2:0..2:17]
      ┃   ┗━  HeaderMark [2:0..2:2]: "##"
      ┣━  ATXHeading3 [3:0..3:18]
      ┃   ┗━  HeaderMark [3:0..3:3]: "###"
      ┣━  ATXHeading4 [4:0..4:19]
      ┃   ┗━  HeaderMark [4:0..4:4]: "####"
      ┣━  ATXHeading5 [5:0..5:20]
      ┃   ┗━  HeaderMark [5:0..5:5]: "#####"
      ┣━  ATXHeading6 [6:0..6:21]
      ┃   ┗━  HeaderMark [6:0..6:6]: "######"
      ┣━  Paragraph [8:0..8:8]
      ┃   ┗━  StrongEmphasis [8:0..8:8]
      ┃       ┣━  EmphasisMark [8:0..8:2]: "**"
      ┃       ┗━  EmphasisMark [8:6..8:8]: "**"
      ┗━  Blockquote [10:0..12:39]
          ┣━  QuoteMark [10:0..10:1]: ">"
          ┣━  Paragraph [10:2..10:35]: "Blockquotes can also be nested..."
          ┣━  QuoteMark [11:0..11:1]: ">"
          ┗━  Blockquote [11:1..12:39]
              ┣━  QuoteMark [11:1..11:2]: ">"
              ┣━  Paragraph [11:3..11:72]: "...by using additional greater-than signs right next to each other..."
              ┣━  QuoteMark [12:0..12:1]: ">"
              ┣━  QuoteMark [12:2..12:3]: ">"
              ┗━  Blockquote [12:4..12:39]
                  ┣━  QuoteMark [12:4..12:5]: ">"
                  ┗━  Paragraph [12:6..12:39]: "...or with spaces between arrows.""
    `)
  })

  beforeAll(async () => {
    const $tw = TiddlyWiki();
    (global as any).$tw = $tw
    $tw.boot.argv = ['--version']
    await new Promise<void>((resolve: () => unknown) => {
      $tw.boot.boot(resolve)
    })

    parse = (input: string) => $tw.wiki.parseText('text/vnd.tiddlywiki', input).tree
  })

  test('$tw is defined', () => {
    expect($tw).toBeDefined()
  })

  test('same as lezer-markdown', () => {
    const source = `
    |! H1 Header Test
    |!! H2 Header Test
    |!!! H3 Header Test
    |!!!! H4 Header Test
    |!!!!! H5 Header Test
    |!!!!!! H6 Header Test
    |
    |''BOLD''
    |
    |> Blockquotes can also be nested...
    |>> ...by using additional greater-than signs right next to each other...
    |> > > ...or with spaces between arrows.
    |
    `.trimMargin()
    expect(parse(source)).toMatchInlineSnapshot(`
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
        {
          "attributes": {
            "class": {
              "end": 19,
              "start": 19,
              "type": "string",
              "value": "",
            },
          },
          "children": [
            {
              "end": 34,
              "start": 20,
              "text": "H2 Header Test",
              "type": "text",
            },
          ],
          "end": 34,
          "rule": "heading",
          "start": 17,
          "tag": "h2",
          "type": "element",
        },
        {
          "attributes": {
            "class": {
              "end": 38,
              "start": 38,
              "type": "string",
              "value": "",
            },
          },
          "children": [
            {
              "end": 53,
              "start": 39,
              "text": "H3 Header Test",
              "type": "text",
            },
          ],
          "end": 53,
          "rule": "heading",
          "start": 35,
          "tag": "h3",
          "type": "element",
        },
        {
          "attributes": {
            "class": {
              "end": 58,
              "start": 58,
              "type": "string",
              "value": "",
            },
          },
          "children": [
            {
              "end": 73,
              "start": 59,
              "text": "H4 Header Test",
              "type": "text",
            },
          ],
          "end": 73,
          "rule": "heading",
          "start": 54,
          "tag": "h4",
          "type": "element",
        },
        {
          "attributes": {
            "class": {
              "end": 79,
              "start": 79,
              "type": "string",
              "value": "",
            },
          },
          "children": [
            {
              "end": 94,
              "start": 80,
              "text": "H5 Header Test",
              "type": "text",
            },
          ],
          "end": 94,
          "rule": "heading",
          "start": 74,
          "tag": "h5",
          "type": "element",
        },
        {
          "attributes": {
            "class": {
              "end": 101,
              "start": 101,
              "type": "string",
              "value": "",
            },
          },
          "children": [
            {
              "end": 116,
              "start": 102,
              "text": "H6 Header Test",
              "type": "text",
            },
          ],
          "end": 116,
          "rule": "heading",
          "start": 95,
          "tag": "h6",
          "type": "element",
        },
        {
          "children": [
            {
              "children": [
                {
                  "end": 124,
                  "start": 120,
                  "text": "BOLD",
                  "type": "text",
                },
              ],
              "end": 126,
              "rule": "bold",
              "start": 118,
              "tag": "strong",
              "type": "element",
            },
          ],
          "end": 126,
          "start": 118,
          "tag": "p",
          "type": "element",
        },
        {
          "children": [
            {
              "children": [
                {
                  "end": 163,
                  "start": 130,
                  "text": "Blockquotes can also be nested...",
                  "type": "text",
                },
                {
                  "children": [
                    {
                      "children": [
                        {
                          "end": 236,
                          "start": 167,
                          "text": "...by using additional greater-than signs right next to each other...",
                          "type": "text",
                        },
                      ],
                      "end": 236,
                      "start": 164,
                      "tag": "div",
                      "type": "element",
                    },
                  ],
                  "end": 236,
                  "start": 164,
                  "tag": "blockquote",
                  "type": "element",
                },
              ],
              "end": 163,
              "start": 128,
              "tag": "div",
              "type": "element",
            },
            {
              "children": [
                {
                  "end": 276,
                  "start": 239,
                  "text": "> > ...or with spaces between arrows.",
                  "type": "text",
                },
              ],
              "end": 276,
              "start": 237,
              "tag": "div",
              "type": "element",
            },
          ],
          "end": 276,
          "rule": "list",
          "start": 128,
          "tag": "blockquote",
          "type": "element",
        },
      ]
    `)
  })

  describe('codeblock', () => {
    test('simple', () => {
      const script = `
      |\`\`\`
      |My perfect code
      |\`\`\`
      `.trimMargin()

      expect(parse(script)).toMatchInlineSnapshot(`
        [
          {
            "attributes": {
              "code": {
                "end": 23,
                "start": 4,
                "type": "string",
                "value": "My perfect code",
              },
              "language": {
                "end": 3,
                "start": 3,
                "type": "string",
                "value": "",
              },
            },
            "end": 23,
            "rule": "codeblock",
            "start": 0,
            "type": "codeblock",
          },
        ]
      `)
    })

    // Looks like unsupported for now
    // https://github.com/TiddlyWiki/TiddlyWiki5/issues/8811
    test('with css class', () => {
      const script = `
      |\`\`\`.css-class
      |My perfect code
      |\`\`\`
      `.trimMargin()

      expect(parse(script)).toMatchInlineSnapshot(`
        [
          {
            "children": [
              {
                "children": [
                  {
                    "end": 32,
                    "start": 2,
                    "text": "\`.css-class
        My perfect code
        ",
                    "type": "text",
                  },
                ],
                "end": 32,
                "rule": "codeinline",
                "start": 0,
                "tag": "code",
                "type": "element",
              },
              {
                "children": [
                  {
                    "end": 33,
                    "start": 33,
                    "text": "",
                    "type": "text",
                  },
                ],
                "end": 33,
                "rule": "codeinline",
                "start": 32,
                "tag": "code",
                "type": "element",
              },
            ],
            "end": 33,
            "start": 0,
            "tag": "p",
            "type": "element",
          },
        ]
      `)
    })

    test('with language', () => {
      const script = `
      |\`\`\`javascript
      |My perfect code
      |\`\`\`
      `.trimMargin()

      expect(parse(script)).toMatchInlineSnapshot(`
        [
          {
            "attributes": {
              "code": {
                "end": 33,
                "start": 14,
                "type": "string",
                "value": "My perfect code",
              },
              "language": {
                "end": 13,
                "start": 3,
                "type": "string",
                "value": "javascript",
              },
            },
            "end": 33,
            "rule": "codeblock",
            "start": 0,
            "type": "codeblock",
          },
        ]
      `)
    })

    test('unclosed', () => {
      const script = `
      |\`\`\`
      |My perfect code
      `.trimMargin()

      expect(parse(script)).toMatchInlineSnapshot(`
        [
          {
            "attributes": {
              "code": {
                "end": 19,
                "start": 4,
                "type": "string",
                "value": "My perfect code",
              },
              "language": {
                "end": 3,
                "start": 3,
                "type": "string",
                "value": "",
              },
            },
            "end": 19,
            "rule": "codeblock",
            "start": 0,
            "type": "codeblock",
          },
        ]
      `)
    })
  })

  describe('codeinline', () => {
    test('single quotes', () => {
      expect(parse('`My perfect code`')).toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [
                    {
                      "end": 17,
                      "start": 1,
                      "text": "My perfect code",
                      "type": "text",
                    },
                  ],
                  "end": 17,
                  "rule": "codeinline",
                  "start": 0,
                  "tag": "code",
                  "type": "element",
                },
              ],
              "end": 17,
              "start": 0,
              "tag": "p",
              "type": "element",
            },
          ]
        `)
    })

    test('double quotes', () => {
      expect(parse('``My perfect code``')).toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [
                    {
                      "end": 19,
                      "start": 2,
                      "text": "My perfect code",
                      "type": "text",
                    },
                  ],
                  "end": 19,
                  "rule": "codeinline",
                  "start": 0,
                  "tag": "code",
                  "type": "element",
                },
              ],
              "end": 19,
              "start": 0,
              "tag": "p",
              "type": "element",
            },
          ]
        `)
    })
  })

  describe('heading', () => {
    test('h1', () => {
      expect(parse('! H1 Header Test')).toMatchInlineSnapshot(`
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

    test('h2', () => {
      expect(parse('!! H2 Header Test')).toMatchInlineSnapshot(`
        [
          {
            "attributes": {
              "class": {
                "end": 2,
                "start": 2,
                "type": "string",
                "value": "",
              },
            },
            "children": [
              {
                "end": 17,
                "start": 3,
                "text": "H2 Header Test",
                "type": "text",
              },
            ],
            "end": 17,
            "rule": "heading",
            "start": 0,
            "tag": "h2",
            "type": "element",
          },
        ]
      `)
    })

    test('h3', () => {
      expect(parse('!!! H3 Header Test')).toMatchInlineSnapshot(`
        [
          {
            "attributes": {
              "class": {
                "end": 3,
                "start": 3,
                "type": "string",
                "value": "",
              },
            },
            "children": [
              {
                "end": 18,
                "start": 4,
                "text": "H3 Header Test",
                "type": "text",
              },
            ],
            "end": 18,
            "rule": "heading",
            "start": 0,
            "tag": "h3",
            "type": "element",
          },
        ]
      `)
    })

    test('h4', () => {
      expect(parse('!!!! H4 Header Test')).toMatchInlineSnapshot(`
        [
          {
            "attributes": {
              "class": {
                "end": 4,
                "start": 4,
                "type": "string",
                "value": "",
              },
            },
            "children": [
              {
                "end": 19,
                "start": 5,
                "text": "H4 Header Test",
                "type": "text",
              },
            ],
            "end": 19,
            "rule": "heading",
            "start": 0,
            "tag": "h4",
            "type": "element",
          },
        ]
      `)
    })

    test('h5', () => {
      expect(parse('!!!!! H5 Header Test')).toMatchInlineSnapshot(`
        [
          {
            "attributes": {
              "class": {
                "end": 5,
                "start": 5,
                "type": "string",
                "value": "",
              },
            },
            "children": [
              {
                "end": 20,
                "start": 6,
                "text": "H5 Header Test",
                "type": "text",
              },
            ],
            "end": 20,
            "rule": "heading",
            "start": 0,
            "tag": "h5",
            "type": "element",
          },
        ]
      `)
    })

    test('h6', () => {
      expect(parse('!!!!!! H6 Header Test')).toMatchInlineSnapshot(`
        [
          {
            "attributes": {
              "class": {
                "end": 6,
                "start": 6,
                "type": "string",
                "value": "",
              },
            },
            "children": [
              {
                "end": 21,
                "start": 7,
                "text": "H6 Header Test",
                "type": "text",
              },
            ],
            "end": 21,
            "rule": "heading",
            "start": 0,
            "tag": "h6",
            "type": "element",
          },
        ]
      `)
    })

    test('overflow', () => {
      expect(parse('!!!!!!! H6+ Header Test')).toMatchInlineSnapshot(`
        [
          {
            "attributes": {
              "class": {
                "end": 6,
                "start": 6,
                "type": "string",
                "value": "",
              },
            },
            "children": [
              {
                "end": 23,
                "start": 6,
                "text": "! H6+ Header Test",
                "type": "text",
              },
            ],
            "end": 23,
            "rule": "heading",
            "start": 0,
            "tag": "h6",
            "type": "element",
          },
        ]
      `)
    })

    test('with css class', () => {
      expect(parse('!!!.css-class H3 Header Test')).toMatchInlineSnapshot(`
        [
          {
            "attributes": {
              "class": {
                "end": 13,
                "start": 3,
                "type": "string",
                "value": "css-class",
              },
            },
            "children": [
              {
                "end": 28,
                "start": 14,
                "text": "H3 Header Test",
                "type": "text",
              },
            ],
            "end": 28,
            "rule": "heading",
            "start": 0,
            "tag": "h3",
            "type": "element",
          },
        ]
      `)
    })
  })

  describe('quoteblock', () => {
    describe('multi-line', () => {
      test('simple', () => {
        const script = `
        |<<<
        |First line
        |Second line
        |<<<
        `.trimMargin()

        expect(parse(script)).toMatchInlineSnapshot(`
          [
            {
              "attributes": {
                "class": {
                  "end": 3,
                  "start": 3,
                  "type": "string",
                  "value": "tc-quote",
                },
              },
              "children": [
                {
                  "children": [
                    {
                      "end": 27,
                      "start": 4,
                      "text": "First line
          Second line
          ",
                      "type": "text",
                    },
                  ],
                  "end": 27,
                  "start": 4,
                  "tag": "p",
                  "type": "element",
                },
              ],
              "end": 30,
              "rule": "quoteblock",
              "start": 0,
              "tag": "blockquote",
              "type": "element",
            },
          ]
        `)
      })

      test('with citation', () => {
        const script = `
        |<<<
        |Text
        |<<< Author
        `.trimMargin()

        expect(parse(script)).toMatchInlineSnapshot(`
          [
            {
              "attributes": {
                "class": {
                  "end": 3,
                  "start": 3,
                  "type": "string",
                  "value": "tc-quote",
                },
              },
              "children": [
                {
                  "children": [
                    {
                      "end": 9,
                      "start": 4,
                      "text": "Text
          ",
                      "type": "text",
                    },
                  ],
                  "end": 9,
                  "start": 4,
                  "tag": "p",
                  "type": "element",
                },
                {
                  "children": [
                    {
                      "end": 19,
                      "start": 13,
                      "text": "Author",
                      "type": "text",
                    },
                  ],
                  "end": 19,
                  "start": 13,
                  "tag": "cite",
                  "type": "element",
                },
              ],
              "end": 19,
              "rule": "quoteblock",
              "start": 0,
              "tag": "blockquote",
              "type": "element",
            },
          ]
        `)
      })

      test('with css class', () => {
        const script = `
        |<<<.css-class
        |Text
        |<<< Nobody
        `.trimMargin()

        expect(parse(script)).toMatchInlineSnapshot(`
          [
            {
              "attributes": {
                "class": {
                  "end": 13,
                  "start": 3,
                  "type": "string",
                  "value": "tc-quote css-class",
                },
              },
              "children": [
                {
                  "children": [
                    {
                      "end": 19,
                      "start": 14,
                      "text": "Text
          ",
                      "type": "text",
                    },
                  ],
                  "end": 19,
                  "start": 14,
                  "tag": "p",
                  "type": "element",
                },
                {
                  "children": [
                    {
                      "end": 29,
                      "start": 23,
                      "text": "Nobody",
                      "type": "text",
                    },
                  ],
                  "end": 29,
                  "start": 23,
                  "tag": "cite",
                  "type": "element",
                },
              ],
              "end": 29,
              "rule": "quoteblock",
              "start": 0,
              "tag": "blockquote",
              "type": "element",
            },
          ]
        `)
      })

      test('unclosed', () => {
        const script = `
        |<<<
        |Text
        `.trimMargin()

        expect(parse(script)).toMatchInlineSnapshot(`
          [
            {
              "attributes": {
                "class": {
                  "end": 3,
                  "start": 3,
                  "type": "string",
                  "value": "tc-quote",
                },
              },
              "children": [
                {
                  "children": [
                    {
                      "end": 8,
                      "start": 4,
                      "text": "Text",
                      "type": "text",
                    },
                  ],
                  "end": 8,
                  "start": 4,
                  "tag": "p",
                  "type": "element",
                },
              ],
              "end": 8,
              "rule": "quoteblock",
              "start": 0,
              "tag": "blockquote",
              "type": "element",
            },
          ]
        `)
      })
    })

    describe('single-line', () => {
      test('simple', () => {
        expect(parse('> Quoted text')).toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [
                    {
                      "end": 13,
                      "start": 2,
                      "text": "Quoted text",
                      "type": "text",
                    },
                  ],
                  "end": 13,
                  "start": 0,
                  "tag": "div",
                  "type": "element",
                },
              ],
              "end": 13,
              "rule": "list",
              "start": 0,
              "tag": "blockquote",
              "type": "element",
            },
          ]
        `)
      })

      test('nested', () => {
        const script = `
        |> A top quote
        |>> A subquote
        |> Another top quote
        `.trimMargin()

        expect(parse(script)).toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [
                    {
                      "end": 13,
                      "start": 2,
                      "text": "A top quote",
                      "type": "text",
                    },
                    {
                      "children": [
                        {
                          "children": [
                            {
                              "end": 27,
                              "start": 17,
                              "text": "A subquote",
                              "type": "text",
                            },
                          ],
                          "end": 27,
                          "start": 14,
                          "tag": "div",
                          "type": "element",
                        },
                      ],
                      "end": 27,
                      "start": 14,
                      "tag": "blockquote",
                      "type": "element",
                    },
                  ],
                  "end": 13,
                  "start": 0,
                  "tag": "div",
                  "type": "element",
                },
                {
                  "children": [
                    {
                      "end": 47,
                      "start": 30,
                      "text": "Another top quote",
                      "type": "text",
                    },
                  ],
                  "end": 47,
                  "start": 28,
                  "tag": "div",
                  "type": "element",
                },
              ],
              "end": 47,
              "rule": "list",
              "start": 0,
              "tag": "blockquote",
              "type": "element",
            },
          ]
        `)
      })
    })
  })
})
