console.log('[TWX] Loading twx-editor bundle...')

import {basicSetup, EditorView} from 'codemirror'
import {dedent} from 'ts-dedent'

export const createEditor = (parent: Element) => {
  return new EditorView({
    extensions: [
      basicSetup,
    ],
    parent: parent,
  })
}

const input =`
\\function name(param:defaultvalue,param2:defaultvalue)
definition text
\end
`

const tree = $tw.wiki.parseText('text/vnd.tiddlywiki', input).tree
console.log(JSON.stringify(tree))
