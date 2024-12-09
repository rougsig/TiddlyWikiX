declare interface String {
  trimMargin(marginPrefix?: string): string
}

String.prototype.trimMargin = function (this: string, marginPrefix: string = '|'): string {
  return this
    .split('\n')
    .map((it) => {
      const line = it.trimStart()
      return line.startsWith(marginPrefix) ? line.slice(marginPrefix.length) : null
    })
    .filter((it) => it != null)
    .join('\n')
}
