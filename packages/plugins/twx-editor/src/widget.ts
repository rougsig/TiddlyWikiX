import {widget as Widget} from '$:/core/modules/widgets/widget.js'
import {createEditor} from '$:/plugins/rougsig/twx-editor/bundle'
import {Text} from '@codemirror/state'
import {dedent} from 'ts-dedent'

class TWXEditor extends Widget {
  public override render(parent: Element, nextSibling: Element | null): void {
    super.render(parent, nextSibling)

    const wrapper = this.document.createElement('div')
    const editor = createEditor(wrapper)
    editor.dispatch({
      changes: {
        from: 0,
        to: editor.state.doc.length,
        insert: dedent`
          ! H1 | Hello World
          !! H2 | Hello World
          !!! H3 | Hello World
          !!!! H4 | Hello World
          !!!!! H5 | Hello World
          !!!!!! H6 | Hello World
          
          ---
          
          Test
        `,
      }
    })
    parent.insertBefore(wrapper, nextSibling)
    this.domNodes.push(wrapper)
  }
}

exports['twx-editor'] = TWXEditor
