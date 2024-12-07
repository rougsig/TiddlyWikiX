import {widget as Widget} from '$:/core/modules/widgets/widget.js'

class TWXEditor extends Widget {
  public override render(parent: Element, nextSibling: Element | null): void {
    super.render(parent, nextSibling)

    const el = this.document.createElement('p')
    el.textContent = 'Hello from twx-editor!!!'
    parent.insertBefore(el, nextSibling)
    this.domNodes.push(el)
  }
}

exports['twx-editor'] = TWXEditor
