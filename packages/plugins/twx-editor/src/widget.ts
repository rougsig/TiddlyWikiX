import {widget as Widget} from '$:/core/modules/widgets/widget.js'
import {createEditor} from '$:/plugins/rougsig/twx-editor/bundle'

class TWXEditor extends Widget {
  public override render(parent: Element, nextSibling: Element | null): void {
    super.render(parent, nextSibling)

    const wrapper = this.document.createElement('div')
    createEditor(wrapper)
    parent.insertBefore(wrapper, nextSibling)
    this.domNodes.push(wrapper)
  }
}

exports['twx-editor'] = TWXEditor
