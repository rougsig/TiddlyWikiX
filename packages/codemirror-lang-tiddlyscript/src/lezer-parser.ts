import {defineLanguageFacet, Language, LanguageSupport} from '@codemirror/language'
import {Input, NodeSet, NodeType, Parser, PartialParse, Tree, TreeFragment} from '@lezer/common'
import {styleTags, tags} from '@lezer/highlight'

// Define node types
const nodeTypes = {
  Document: 0,
  Text: 1,
}

const nodeSet = new NodeSet([
  NodeType.define({id: nodeTypes.Document, name: 'Document'}),
  NodeType.define({id: nodeTypes.Text, name: 'Text'}),
])
  .extend(styleTags({
    'Text': tags.comment,
  }))

class TiddlyScriptParser extends Parser {
  createParse(
    input: Input,
    fragments: readonly TreeFragment[],
    ranges: readonly {from: number, to: number}[],
  ): PartialParse {
    return new TiddlyScriptPartialParse(input.length)
  }
}

class TiddlyScriptPartialParse implements PartialParse {
  parsedPos: number = 0
  stoppedAt: number | null = null

  constructor(readonly length: number) {
  }

  advance(): Tree | null {
    // Return empty tree for very short content
    if (this.length <= 30) return Tree.empty

    // Mark entire content as parsed
    this.parsedPos = this.length

    // Build and return tree
    return Tree.build({
      nodeSet,
      topID: nodeTypes.Document,
      buffer: [
        // Text nodes
        nodeTypes.Text, 0, 10, 4,
        nodeTypes.Text, 11, 20, 4,
        nodeTypes.Text, 21, 30, 4,
        // Document node containing the text nodes
        nodeTypes.Document, 0, 30, 16,
      ],
    })
  }

  stopAt(pos: number): void {
    if (pos > 0 && pos <= this.length) {
      this.stoppedAt = pos
    }
  }
}

export const tiddlyscript = () => {
  return new LanguageSupport(
    new Language(
      defineLanguageFacet(),
      new TiddlyScriptParser(),
      [],
      'tiddlyscript',
    ),
    [],
  )
}
