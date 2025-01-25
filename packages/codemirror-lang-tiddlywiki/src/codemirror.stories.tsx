import CodeMirror from '@uiw/react-codemirror'
import './__tests__/trim-margin'

const text = `
|! H1
|!! H2
|!!! H3
|!!!! H4
|!!!!! H5
|!!!!!! H6
|
|Regular paragraph
|
`.trimMargin()

export const Development = () => (
  <CodeMirror
    value={text}
    height="calc(100vh - 9em)"
    extensions={[]}
  />
)
