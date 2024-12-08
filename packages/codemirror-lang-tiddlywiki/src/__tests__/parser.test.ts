import {tiddlywiki} from '#/parser'
import {indentUnit} from '@codemirror/language'
import {EditorSelection, EditorState, Extension, StateCommand} from '@codemirror/state'
import dedent from 'ts-dedent'
import {describe, expect, test} from 'vitest'

const createState = (doc: string, extension?: Extension) => {
  return EditorState.create({
    doc,
    extensions: [
      tiddlywiki().language,
      EditorState.allowMultipleSelections.of(true),
      extension || [],
    ],
  })
}

function stateStr(state: EditorState) {
  let doc = state.doc.toString()
  for (let i = state.selection.ranges.length - 1; i >= 0; i--) {
    let range = state.selection.ranges[i]
    doc = doc.slice(0, range.from) + "|" + doc.slice(range.to)
  }
  return doc
}

const tabs: Extension = [EditorState.tabSize.of(4), indentUnit.of("\t")]

function cmd(state: EditorState, command: StateCommand) {
  command({state, dispatch(tr) { state = tr.state }})
  return state
}

describe('example', () => {
  test('2 + 2 = 4', () => {
    const state = createState(dedent`
      ! H1 | Hello World
      !! H2 | Hello World
      !!! H3 | Hello World
      !!!! H4 | Hello World
      !!!!! H5 | Hello World
      !!!!!! H6 | Hello World
    `)

    expect(2 + 4)
      .toBe(4)
  })
})
