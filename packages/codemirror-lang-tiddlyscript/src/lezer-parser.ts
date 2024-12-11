import {nodeSet, NodeType} from '#/node-type'
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

    return new MyPartialParse(input.length)
  }
}

class MyPartialParse implements PartialParse {
  parsedPos: number = 0
  stoppedAt: number | null = null

  constructor(readonly length: number) {
  }

  /**
   The buffer or buffer cursor to read the node data from.

   When this is an array, it should contain four values for every
   node in the tree.

   - The first holds the node's type, as a node ID pointing into
   the given `NodeSet`.
   - The second holds the node's start offset.
   - The third the end offset.
   - The fourth the amount of space taken up in the array by this
   node and its children. Since there's four values per node,
   this is the total number of nodes inside this node (children
   and transitive children) plus one for the node itself, times
   four.

   Parent nodes should appear _after_ child nodes in the array. As
   an example, a node of type 10 spanning positions 0 to 4, with
   two children, of type 11 and 12, might look like this:

   [
   11, 0, 1, 4,
   12, 2, 4, 4,
   10, 0, 4, 12,
   ]
   */

  advance(): Tree | null {
    console.log('length', this.length)
    if (this.length <= 30) return Tree.empty

    this.parsedPos = this.length
    const builded = Tree.build({
      nodeSet: nodeSet,
      topID: NodeType.Document,
      buffer: [
        2, 0, 10, 4,
        2, 11, 20, 4,
        2, 21, 30, 4,
        1, 0, 30, 12,
      ],
    })
    console.log(nodeSet, builded)
    return builded
  }

  stopAt(pos: number): void {
  }
}

export const tiddlyscript = () => {
  return new LanguageSupport(
    new Language(
      defineLanguageFacet(),
      new MyParser(),
      [],
      'tiddlyscript',
    ),
    [],
  )
}
