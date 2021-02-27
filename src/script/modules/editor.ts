import { RGBColorConverter, TextStyleManager } from './textStyle';

export class Editor {
  protected editorWrapper: HTMLElement;
  protected editorPrint: HTMLElement;
  private IGNORE_FOCUS_MOVE: boolean;

  public constructor() {
    TextStyleManager.Initialize();
    this.editorWrapper = document.getElementById('editor__wrapper')!;
    this.editorPrint = document.getElementById('editor__print')!;
    this.IGNORE_FOCUS_MOVE = false;
  }

  // Start using editor
  public Watch(): void {
    this.editorWrapper.addEventListener('focusout', () => {
      if (!this.IGNORE_FOCUS_MOVE) this.FocusLost();
    });

    this.editorWrapper.addEventListener('focusin', (event: FocusEvent) => {
      if (!this.IGNORE_FOCUS_MOVE) this.Focused(event);
    });
  }

  public FocusLost() {
    console.log('out');
    const textBox = this.editorWrapper.querySelector('[role="textbox"][aria-disabled="false"]');
    if (textBox == null) return;

    if ((<HTMLInputElement>textBox).value === '') {
      textBox.remove();
      console.log('removed');
    } else {
      console.log((<HTMLInputElement>textBox).value);
      textBox.remove();
    }

    this.editorPrint.insertAdjacentHTML(
      'beforeend',
      `
      <span style="
      font-family: '${TextStyleManager.PresentTextStyle.fontFamily}';
      font-size: ${TextStyleManager.PresentTextStyle.fontSize}px;
      font-weight: ${TextStyleManager.PresentTextStyle.isTextBold ? 'bold' : 'normal'};
      font-style: ${TextStyleManager.PresentTextStyle.isTextItalic ? 'italic' : 'normal'};
      color: ${RGBColorConverter.ToString(TextStyleManager.PresentTextStyle.textColor)} !important;
      background-color: ${RGBColorConverter.ToString(TextStyleManager.PresentTextStyle.backgroundColor)};
      text-decoration:
        ${
          TextStyleManager.PresentTextStyle.isTextUnderlined
            ? 'underline ' + RGBColorConverter.ToString(TextStyleManager.PresentTextStyle.underlineColor)
            : 'none'
        };
      ">${(<HTMLInputElement>textBox).value}</span>
      `
    );
  }

  public Focused(event: FocusEvent) {
    console.log(`in: ${event.target}, ${(<any>event).layerX}`);
    this.InsertInput();
    this.IGNORE_FOCUS_MOVE = true;
    (<HTMLElement>this.editorWrapper.querySelector('[role="textbox"][aria-disabled="false"]'))?.focus();
    this.IGNORE_FOCUS_MOVE = false;
  }

  protected InsertInput() {
    this.editorPrint.insertAdjacentHTML(
      'beforeend',
      `
      <input type="text" role="textbox" aria-disabled="false" aria-selected="true" style="
      font-family: '${TextStyleManager.PresentTextStyle.fontFamily}';
      font-size: ${TextStyleManager.PresentTextStyle.fontSize}px;
      font-weight: ${TextStyleManager.PresentTextStyle.isTextBold ? 'bold' : 'normal'};
      font-style: ${TextStyleManager.PresentTextStyle.isTextItalic ? 'italic' : 'normal'};
      color: ${RGBColorConverter.ToString(TextStyleManager.PresentTextStyle.textColor)} !important;
      background-color: ${RGBColorConverter.ToString(TextStyleManager.PresentTextStyle.backgroundColor)};
      text-decoration:
        ${
          TextStyleManager.PresentTextStyle.isTextUnderlined
            ? 'underline ' + RGBColorConverter.ToString(TextStyleManager.PresentTextStyle.underlineColor)
            : 'none'
        };
      height: ${TextStyleManager.PresentTextStyle.fontSize}px;
      padding: 0;
      outline: none;
      ">
      `
    );
  }
}
