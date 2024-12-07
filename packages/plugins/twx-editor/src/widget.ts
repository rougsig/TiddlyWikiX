import {widget as Widget} from '$:/core/modules/widgets/widget.js'
import * as bundle from '$:/plugins/rougsig/twx-editor/bundle'

class TWXEditor extends Widget {
  public override render(parent: Element, nextSibling: Element | null): void {
    super.render(parent, nextSibling)

    const el = this.document.createElement('p')
    el.textContent = `Hello from twx-editor!!! ${bundle.sum(3, 2)}`
    parent.insertBefore(el, nextSibling)
    this.domNodes.push(el)
  }
}

exports['twx-editor'] = TWXEditor
