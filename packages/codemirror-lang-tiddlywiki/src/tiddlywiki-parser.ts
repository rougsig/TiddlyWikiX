import {IParseTreeNode, ITiddlyWiki} from 'tiddlywiki'

export class TiddlyWikiParser {
  private readonly _tw: ITiddlyWiki

  constructor(tw?: ITiddlyWiki) {
    this._tw = tw ?? $tw
  }

  public parse(input: string): IParseTreeNode[] {
    return this._tw.wiki.parseText('text/vnd.tiddlywiki', input).tree
  }
}
