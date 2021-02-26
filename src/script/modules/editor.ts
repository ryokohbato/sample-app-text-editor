import { RGBColorConverter, TextStyleManager } from './textStyle';

export class Editor {
  protected editorWrapper: HTMLElement;
  private IGNORE_FOCUS_MOVE: boolean;

  public constructor() {
    TextStyleManager.Initialize();
    this.editorWrapper = document.getElementById('editor__wrapper')!;
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

    this.editorWrapper.insertAdjacentHTML(
      'beforeend',
      `
    <p style="
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
    ">${(<HTMLInputElement>textBox).value}</p>
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
    console.log(TextStyleManager.PresentTextStyle);
    this.editorWrapper.insertAdjacentHTML(
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
      outline: none;
    ">
    `
    );
  }
}
