import StaticTrace from 'dbux-common/src/core/data/StaticTrace';
import StaticContext from 'dbux-common/src/core/data/StaticContext';
import CollectionIndex from '../../indexes/CollectionIndex';
import DataProvider from '../../DataProvider';


/**
 * NOTE: this index will omit `Resume` staticContexts, since those have an unknown execution range
 */
export default class StaticContextsByFileIndex extends CollectionIndex<StaticContext> {
  constructor() {
    super('staticContexts', 'byFile');
  }

  makeKey(dp: DataProvider, staticContext: StaticTrace) {
    return staticContext.programId;
  }
}