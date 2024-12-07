console.log('[TWX] Loading twx-editor bundle...')

import {basicSetup, EditorView} from 'codemirror'

export const createEditor = (parent: Element) => {
  return new EditorView({
    extensions: [
      basicSetup,
    ],
    parent: parent,
  })
}
