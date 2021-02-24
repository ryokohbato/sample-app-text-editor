import { TextStyle, BackgroundLayer } from "../src/script/modules/textStyle";
import { RGBColorConverter } from "../src/script/modules/textStyle";

describe("Text Style", () => {
  let TestTextStyle: TextStyle;

  beforeAll(async () => {
    TestTextStyle = {
      fontFamily: 'sans-serif',
      fontSize: 16,
      isTextBold: false,
      isTextItalic: false,
      isTextUnderlined: false,
      textColor: {
        red: 0,
        green: 0,
        blue: 0,
      },
      backgroundColor: {
        red: 255,
        green: 255,
        blue: 255,
      },
      underlineColor: {
        red: 255,
        green: 255,
        blue: 255,
      },
    };
  })

  it("Change font family", () => {
    const beforeStyle = TestTextStyle;
    let targetStyle = TestTextStyle;
    BackgroundLayer.FontFamilyChanged('serif', targetStyle)
    expect(targetStyle).toStrictEqual({
      ...beforeStyle,
      fontFamily: 'serif',
    })
  })

  it("Change font size", () => {
    const beforeStyle = TestTextStyle;
    let targetStyle = TestTextStyle;
    BackgroundLayer.FontSizeChanged(10, targetStyle)
    expect(targetStyle).toStrictEqual({
      ...beforeStyle,
      fontSize: 10,
    })
  })

  it("Change font style - bold", () => {
    const beforeStyle = TestTextStyle;
    let targetStyle = TestTextStyle;
    BackgroundLayer.IsTextBoldChanged(true, targetStyle)
    expect(targetStyle).toStrictEqual({
      ...beforeStyle,
      isTextBold: true,
    })
  })

  it("Change font style - italic", () => {
    const beforeStyle = TestTextStyle;
    let targetStyle = TestTextStyle;
    BackgroundLayer.IsTextItalicChanged(true, targetStyle)
    expect(targetStyle).toStrictEqual({
      ...beforeStyle,
      isTextItalic: true,
    })
  })

  it("Change font style - underline", () => {
    const beforeStyle = TestTextStyle;
    let targetStyle = TestTextStyle;
    BackgroundLayer.IsTextUnderlinedChanged(true, targetStyle)
    expect(targetStyle).toStrictEqual({
      ...beforeStyle,
      isTextUnderlined: true,
    })
  })

  it("Change text color", () => {
    const beforeStyle = TestTextStyle;
    let targetStyle = TestTextStyle;
    BackgroundLayer.TextColorChanged('#2e03f5', targetStyle)
    expect(targetStyle).toStrictEqual({
      ...beforeStyle,
      textColor: {
        red: 46,
        green: 3,
        blue: 245,
      }
    })
  })

  it("Change background color", () => {
    const beforeStyle = TestTextStyle;
    let targetStyle = TestTextStyle;
    BackgroundLayer.BackgroundColorChanged('#2e03f5', targetStyle)
    expect(targetStyle).toStrictEqual({
      ...beforeStyle,
      backgroundColor: {
        red: 46,
        green: 3,
        blue: 245,
      }
    })
  })

  it("Change underline color", () => {
    const beforeStyle = TestTextStyle;
    let targetStyle = TestTextStyle;
    BackgroundLayer.UnderlineColorChanged('#2e03f5', targetStyle)
    expect(targetStyle).toStrictEqual({
      ...beforeStyle,
      underlineColor: {
        red: 46,
        green: 3,
        blue: 245,
      }
    })
  })
})

describe("Converter", () => {
  it("ToString", () => {
    expect(RGBColorConverter.ToString({
      red: 255,
      green: 0,
      blue: 31,
    })).toBe('#ff001f')
  })

  it("ToRGBColor", () => {
    expect(RGBColorConverter.ToRGBColor('#ff001f')).toStrictEqual({
      red: 255,
      green: 0,
      blue: 31,
    })
  })

  it("ToRGBColor - throw", () => {
    expect(() => {
      RGBColorConverter.ToRGBColor('#ff01f');
    }).toThrow(Error);
  })
})