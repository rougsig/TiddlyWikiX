import {load} from '#/loader'
import {widget as Widget} from '$:/core/modules/widgets/widget.js'

const bundle = load<typeof import('#/bundle')>('$:/plugins/rougsig/twx-editor/bundle')

class TWXEditor extends Widget {
  public override render(parent: Element, nextSibling: Element | null): void {
    super.render(parent, nextSibling)

    const el = this.document.createElement('p')
    el.textContent = `Hello from twx-editor!!! ${bundle.sum(1, 2)}`
    parent.insertBefore(el, nextSibling)
    this.domNodes.push(el)
  }
}

exports['twx-editor'] = TWXEditor
