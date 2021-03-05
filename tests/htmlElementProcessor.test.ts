import { InsertCommand, HTMLElementProcessor } from "../src/script/modules/commandHistory";

describe("Create HTML Elements", () => {
  it("Create single element - disable underline", () => {
    expect(HTMLElementProcessor.CreateSingleElement({
      commandFlag: 'Insert',
      args: {
        text: "Sample",
        index: 0              // This value is not used in this method.
      },
      textStyle: {
        fontFamily: 'monospace',
        fontSize: 16,
        isTextBold: true,
        isTextItalic: false,
        isTextUnderlined: false,
        textColor: {
          red: 0,
          green: 0,
          blue: 0,
        },
        backgroundColor: {
          red: 200,
          green: 200,
          blue: 200,
        },
        underlineColor: {
          red: 100,
          green: 150,
          blue: 200,
        }
      }
    }).replace(/( |\n)+/g, ' ').trimStart().trimEnd()).toBe((`
      <span style="
        font-family: 'monospace';
        font-size: 16px;
        font-weight: bold;
        font-style: normal;
        color: #000000 !important;
        background-color: #c8c8c8;
        text-decoration: none;
        text-decoration-thickness: 25%;
      ">Sample</span>`).replace(/( |\n)+/g, ' ').trimStart().trimEnd())
  })

  it("Create single element - enable underline", () => {
    expect(HTMLElementProcessor.CreateSingleElement({
      commandFlag: 'Insert',
      args: {
        text: "Sample2",
        index: 0              // This value is not used in this method.
      },
      textStyle: {
        fontFamily: 'monospace',
        fontSize: 16,
        isTextBold: true,
        isTextItalic: false,
        isTextUnderlined: true,
        textColor: {
          red: 0,
          green: 0,
          blue: 0,
        },
        backgroundColor: {
          red: 200,
          green: 200,
          blue: 200,
        },
        underlineColor: {
          red: 100,
          green: 150,
          blue: 200,
        }
      }
    }).replace(/( |\n)+/g, ' ').trimStart().trimEnd()).toBe((`
      <span style="
        font-family: 'monospace';
        font-size: 16px;
        font-weight: bold;
        font-style: normal;
        color: #000000 !important;
        background-color: #c8c8c8;
        text-decoration: underline #6496c8;
        text-decoration-thickness: 25%;
      ">Sample2</span>`).replace(/( |\n)+/g, ' ').trimStart().trimEnd())
  })
})