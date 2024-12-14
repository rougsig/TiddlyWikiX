console.log('[TWX] Loading twx-editor bundle...')

import {javascript} from '@codemirror/lang-javascript'
import {syntaxHighlighting} from '@codemirror/language'
import {classHighlighter} from '@lezer/highlight'
import {tiddlyscript} from '@rougsig/codemirror-lang-tiddlyscript'
import {basicSetup, EditorView} from 'codemirror'

export const createEditor = (parent: Element) => {
  const lang = tiddlyscript()

  const view = new EditorView({
    // extensions: [
    //   basicSetup,
    //   lang,
    //   syntaxHighlighting(HighlightStyle.define([
    //     {tag: tags.comment, class: 'comment'},
    //     {tag: tags.invalid, class: 'invalid'},
    //   ])),
    //   syntaxHighlighting(classHighlighter),
    // ],
    doc: '',
    extensions: [
      basicSetup,
      lang,
      syntaxHighlighting(classHighlighter),
      // syntaxHighlighting(HighlightStyle.define([
      //   {tag: tags.variableName, class: 'my-variable-ame'},
      //   {tag: tags.operator, class: 'my-operator'},
      // ])),
    ],
    parent: parent,
  })

  // const languageConf = new Compartment()
  // // view.dispatch({
  // //   effects: languageConf.reconfigure(lang),
  // // })
  // //
  // // setInterval(() => {
  // //   console.log('syntaxTree', printTree(syntaxTree(view.state), view.state.doc.toString()))
  // // }, 1000)

  return view
}
