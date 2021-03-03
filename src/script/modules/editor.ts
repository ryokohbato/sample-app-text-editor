import { RGBColorConverter, TextStyleManager } from './textStyle';
import { CommandHistory } from './commandHistory';
import { WindowScale } from './windowScale';

export class Editor {
  protected editorWrapper: HTMLElement;
  protected editorPrint: HTMLElement;
  private IGNORE_FOCUS_MOVE: boolean;

  public constructor() {
    this.editorWrapper = document.getElementById('editor__wrapper')!;
    this.editorPrint = document.getElementById('editor__print')!;
    this.IGNORE_FOCUS_MOVE = false;
  }

  // Start using editor
  public Watch(): void {
    TextStyleManager.Initialize();
    WindowScale.Initialize();

    this.editorWrapper.addEventListener('focusout', () => {
      if (!this.IGNORE_FOCUS_MOVE) this.FocusLost();
    });

    this.editorWrapper.addEventListener('focusin', (event: FocusEvent) => {
      if (!this.IGNORE_FOCUS_MOVE) this.Focused(event);
    });
  }

  public FocusLost() {
    const textBox = this.editorWrapper.querySelector('[role="textbox"][aria-disabled="false"]');
    if (textBox == null) return;
    if ((<HTMLInputElement>textBox).value === '') {
      textBox.remove();
    } else {
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
      text-decoration-thickness: 25%;
      ">${(<HTMLInputElement>textBox).value}</span>
      `
    );

    for (let i = 0; i < (<HTMLInputElement>textBox).value.length; i++) {
      CommandHistory.Push({
        // Insert to the end.
        commandFlag: 'Insert',
        args: {
          text: (<HTMLInputElement>textBox).value[i],
          index: CommandHistory.GetCommandHistoryLength(),
        },
        textStyle: TextStyleManager.PresentTextStyle,
      });
    }
  }

  public Focused(event: FocusEvent) {
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
      text-decoration-thickness: 25%;
      height: ${TextStyleManager.PresentTextStyle.fontSize}px;
      padding: 0;
      outline: none;
      ">
      `
    );

    this.editorWrapper
      .querySelector('[role="textbox"][aria-disabled="false"]')
      ?.addEventListener('keydown', (event) => {
        if ((event as KeyboardEvent).key === 'Enter') {
          // 'Enter' means the end of input.
          (<HTMLElement>this.editorWrapper.querySelector('[role="textbox"][aria-disabled="false"]')).blur();
        } else {
          // Adjust the width of the input element.
          document.getElementById('_dummy__editor_print')!.innerHTML = `<span id="_dummy__measure" style="
                font-family: '${TextStyleManager.PresentTextStyle.fontFamily}';
                font-size: ${TextStyleManager.PresentTextStyle.fontSize}px;
                font-weight: ${TextStyleManager.PresentTextStyle.isTextBold ? 'bold' : 'normal'};
                font-style: ${TextStyleManager.PresentTextStyle.isTextItalic ? 'italic' : 'normal'};
            ">${
              (<HTMLInputElement>this.editorWrapper.querySelector('[role="textbox"][aria-disabled="false"]')).value
            }</span>`;

          // The width of the input element should be a little larger than the width of the dummy text.
          (<HTMLElement>this.editorWrapper.querySelector('[role="textbox"][aria-disabled="false"]')).style.width = `${
            document.getElementById('_dummy__measure')!.getBoundingClientRect().width +
            TextStyleManager.PresentTextStyle.fontSize
          }px`;
        }
      });
  }
}
