import { newLogger } from 'dbux-common/src/log/logger';
import { registerCommand } from './commands/commandUtil';
import { getOrCreateTreeViewController } from './treeView/treeViewController'

const { log, debug, warn, error: logError } = newLogger('Commands');

export function initToolBar(context){

  const treeViewController = getOrCreateTreeViewController();

  registerCommand(context,
    'dbuxView.addEntry',
    (...args) => log('Clicked on add entry, parameter', ...args)
  );

  registerCommand(context,
    'dbuxView.next',
    () => treeViewController.next()
  );

  registerCommand(context,
    'dbuxView.previous',
    () => treeViewController.previous()
  );

  registerCommand(context,
    'dbuxView.clear',
    () => {
      // treeViewController.treeDataProvider.dataProvider.clear();
      treeViewController.treeDataProvider.clear();
    }
  );

}