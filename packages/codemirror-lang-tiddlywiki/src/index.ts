import {defineLanguageFacet, Language, LanguageSupport} from '@codemirror/language'
import {Input, Parser, PartialParse, TreeFragment} from '@lezer/common'

class MyParser extends Parser {
  createParse(
    input: Input,
    fragments: readonly TreeFragment[],
    ranges: readonly {from: number, to: number}[],
  ): PartialParse {
    // Considering to use lezer parser ...
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
