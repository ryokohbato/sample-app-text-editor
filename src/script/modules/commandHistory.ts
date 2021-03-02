import { TextStyle } from './textStyle';

type InsertCommand = {
  commandFlag: 'Insert';
  args: {
    text: string;
    index: number;
  };
  textStyle: TextStyle;
};

type DeleteCommand = {
  commandFlag: 'Delete';
  args: {
    index: number;
    count: number;
  };
  textStyle: TextStyle;
};

export type Command = InsertCommand | DeleteCommand;

export class CommandHistory {
  protected static _history: Array<Command> = []; // Used for Undo
  protected static _history__removed: Array<Command> = []; // Used for Redo

  public static Initialize() {
    document.querySelector('.r-header_item__undo')?.addEventListener('click', (event) => {
      if ((<HTMLElement>document.querySelector('.r-header_item__undo')).getAttribute('is-enabled') === 'false') return;

      if (!this.Pop()) {
        (<HTMLElement>document.querySelector('.r-header_item__undo')).setAttribute('is-enabled', 'false');
      }
    });
  }

  // Add command history
  public static Push(command: Command): void {
    this._history.push(command);

    this._history__removed = [];
  }

  // Delete command history
  // If failed, it throws a new error, and the return value means whether you can delete command history again.
  // If the return value is false, you have to add command history at least once.
  public static Pop(): boolean {
    if (this._history.length === 0) throw new Error('Cannot pop');

    this._history__removed.push(this._history.pop()!);

    if (this._history.length === 0) return false;

    return true;
  }

  public static GetCommandHistoryLength(): number {
    return this._history.length;
  }

  public static GetRemovedCommandHistoryLength(): number {
    return this._history__removed.length;
  }
}
