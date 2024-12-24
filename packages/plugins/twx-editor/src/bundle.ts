console.log('[TWX] Loading twx-editor bundle...')

import {syntaxHighlighting} from '@codemirror/language'
import {Compartment} from '@codemirror/state'
import {classHighlighter} from '@lezer/highlight'
import {tiddlyscript} from '@rougsig/codemirror-lang-tiddlyscript'
import {basicSetup, EditorView} from 'codemirror'

export const createEditor = (parent: Element) => {
  const lang = tiddlyscript()

  const view = new EditorView({
    doc: '',
    extensions: [
      basicSetup,
      lang,
      syntaxHighlighting(classHighlighter),
    ],
    parent: parent,
  })

  const languageConf = new Compartment()
  view.dispatch({
    effects: languageConf.reconfigure(lang),
  })

  return view
}
