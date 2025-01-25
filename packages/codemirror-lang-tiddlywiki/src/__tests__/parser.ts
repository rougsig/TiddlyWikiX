// import {tiddlywiki} from '#/parser'
// import {indentUnit} from '@codemirror/language'
// import {EditorState, Extension, StateCommand} from '@codemirror/state'
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// import {TiddlyWiki} from 'tiddlywiki/boot/boot.js'
// import type {TiddlyWiki as ITiddlyWiki} from 'tiddlywiki'
// import {IParseTreeNode} from 'tiddlywiki'
// import dedent from 'ts-dedent'
// import {beforeEach, describe, expect, test} from 'vitest'
//
// const createState = (doc: string, extension?: Extension) => {
//   return EditorState.create({
//     doc,
//     extensions: [
//       tiddlywiki().language,
//       EditorState.allowMultipleSelections.of(true),
//       extension || [],
//     ],
//   })
// }
//
// function stateStr(state: EditorState) {
//   let doc = state.doc.toString()
//   for (let i = state.selection.ranges.length - 1; i >= 0; i--) {
//     let range = state.selection.ranges[i]
//     doc = doc.slice(0, range.from) + '|' + doc.slice(range.to)
//   }
//   return doc
// }
//
// const tabs: Extension = [EditorState.tabSize.of(4), indentUnit.of('\t')]
//
// function cmd(state: EditorState, command: StateCommand) {
//   command({
//     state, dispatch(tr) {
//       state = tr.state
//     },
//   })
//   return state
// }
//
// export function wikiAstFromWikiText(input: string): IParseTreeNode[] {
//   if (typeof $tw === 'undefined') {
//     return []
//   }
//   const rootNode = $tw.wiki.parseText('text/vnd.tiddlywiki', input).tree
//   return rootNode
// }
//
// describe('example', () => {
//   beforeEach(async () => {
//     (global as any).$tw = {
//       boot: {
//         argv: ['--version'],
//       }
//     }
//     const $tw = (TiddlyWiki as typeof ITiddlyWiki)();
//
//     $tw.boot.argv = ['--version']
//     // await new Promise<void>((resolve: () => unknown) => {
//     //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//     //   $tw.boot.boot(resolve)
//     // })
//     if ($tw.utils.serializeParseTree === undefined) {
//       throw new Error('Failed to load TiddlyWiki serializeParseTree')
//     }
//   })
//
//   test('2 + 2 = 4', async () => {
//     const doc = dedent`
//       ! H1 | Hello World
//       !! H2 | Hello World
//       !!! H3 | Hello World
//       !!!! H4 | Hello World
//       !!!!! H5 | Hello World
//       !!!!!! H6 | Hello World
//     `
//
//     const state = createState(doc)
//
//     expect(2 + 4)
//       .toBe(4)
//   })
// })
