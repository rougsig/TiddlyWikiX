import './trim-margin'
import {TiddlyWikiParser} from '#/tiddlywiki-parser'
import {TiddlyWiki} from 'tiddlywiki'
import {beforeAll, describe, expect, test} from 'vitest'

//
// All TiddlyWiki script syntax described here
// https://tiddlywiki.com/static/WikiText.html
//
// Checklist of things to snapshot:
// [+] Block Quotes
// [+] Code Blocks
// [ ] Inline Code Blocks
// [ ] Conditional Shortcut Syntax
// [ ] Dashes
// [ ] Definitions
// [ ] Filtered Attribute Values
// [ ] Formatting
// [ ] Hard Linebreaks
// [+] Headings
// [ ] Horizontal Rules
// [ ] HTML Entities
// [ ] HTML
// [ ] Images
// [ ] Linking
// [ ] Lists
// [ ] Literal Attribute Values
// [ ] Macro Calls
// [ ] Macro Definitions
// [ ] Macro Parameter Handling
// [ ] Paragraphs
// [ ] Procedure Calls
// [ ] Procedure Definitions
// [ ] Procedure Parameter Handling
// [ ] Styles and Classes
// [ ] Substituted Attribute Values
// [ ] Tables
// [ ] Transcluded Attribute Values
// [ ] Transclusion and Substitution
// [ ] Transclusion
// [ ] Typed Blocks
// [ ] Utility Classes
// [ ] Variable Attribute Values
// [ ] Variables
// [ ] Widget Attributes
// [ ] Widgets
// [ ] WikiText Parser Modes
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

  // https://tiddlywiki.com/static/Block%2520Quotes%2520in%2520WikiText.html
  describe('Block Quotes', () => {
    describe('multi-line', () => {
      test('simple', () => {
        const script = `
        |<<<
        |First line
        |Second line
        |<<<
        `.trimMargin()

        expect(parser.parse(script)).toMatchInlineSnapshot(`
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

        expect(parser.parse(script)).toMatchInlineSnapshot(`
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

        expect(parser.parse(script)).toMatchInlineSnapshot(`
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

        expect(parser.parse(script)).toMatchInlineSnapshot(`
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
        expect(parser.parse('> Quoted text')).toMatchInlineSnapshot(`
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

        expect(parser.parse(script)).toMatchInlineSnapshot(`
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

  describe('Code Blocks', () => {
    test('simple', () => {
      const script = `
      |\`\`\`
      |My perfect code
      |\`\`\`
      `.trimMargin()

      expect(parser.parse(script)).toMatchInlineSnapshot(`
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

      expect(parser.parse(script)).toMatchInlineSnapshot(`
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

      expect(parser.parse(script)).toMatchInlineSnapshot(`
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

      expect(parser.parse(script)).toMatchInlineSnapshot(`
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

  // https://tiddlywiki.com/static/Headings%2520in%2520WikiText.html
  describe('Headings', () => {
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

    test('h2', () => {
      expect(parser.parse('!! H2 Header Test')).toMatchInlineSnapshot(`
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
      expect(parser.parse('!!! H3 Header Test')).toMatchInlineSnapshot(`
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
      expect(parser.parse('!!!! H4 Header Test')).toMatchInlineSnapshot(`
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
      expect(parser.parse('!!!!! H5 Header Test')).toMatchInlineSnapshot(`
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
      expect(parser.parse('!!!!!! H6 Header Test')).toMatchInlineSnapshot(`
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
      expect(parser.parse('!!!!!!! H6+ Header Test')).toMatchInlineSnapshot(`
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
      expect(parser.parse('!!!.css-class H3 Header Test')).toMatchInlineSnapshot(`
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
})
