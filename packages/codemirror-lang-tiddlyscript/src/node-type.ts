import {NodeSet, NodeType as LezerNodeType} from '@lezer/common'
import {styleTags, tags} from '@lezer/highlight'

export enum NodeType {
  Document,
  Highlight,
}

const nodeTypes = [
  LezerNodeType.none,
  LezerNodeType.define({
    id: 1,
    name: 'Document',
    top: true,
  }),
  LezerNodeType.define({
    id: 2,
    name: 'Highlight',
  }),
]

export const nodeSet = new NodeSet(nodeTypes)
  .extend(styleTags({
    'Document': tags.comment,
    'Highlight': tags.operator,
  }))
