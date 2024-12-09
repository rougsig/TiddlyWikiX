import {defineLanguageFacet, Language, LanguageSupport} from '@codemirror/language'
import {Input, Parser, PartialParse, Tree, TreeFragment} from '@lezer/common'

class MyParser extends Parser {
  createParse(
    input: Input,
    fragments: readonly TreeFragment[],
    ranges: readonly {from: number, to: number}[],
  ): PartialParse {
    console.log('input=', input)
    console.log('fragments=', fragments)
    console.log('ranges=', ranges)

    return new MyPartialParse()
  }
}

class MyPartialParse implements PartialParse {
  parsedPos: number = 0
  stoppedAt: number | null = null

  advance(): Tree | null {
    console.log('advance')
    throw new Error('Method not implemented')
  }

  stopAt(pos: number): void {
    console.log('stopAt')
  }
}

export const tiddlywiki = () => {
  return new LanguageSupport(
    new Language(
      defineLanguageFacet({
        commentTokens: {block: {open: '<!--', close: '-->'}},
      }),
      new MyParser(),
      [],
      'tiddlywiki',
    ),
  )
}
