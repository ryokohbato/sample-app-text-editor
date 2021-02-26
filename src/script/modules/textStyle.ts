interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

export class RGBColorConverter {
  // Convert RGB style object (ex. {red: 100, green: 150, blue: 200}) into string (ex. #1177cc)
  // The length of the string will be 6. Every color part will be expressed by 2 characters even if it is smaller than 10 (ex. #000102)
  static ToString(color: RGBColor): string {
    return (
      '#' +
      color.red.toString(16).padStart(2, '0') +
      color.green.toString(16).padStart(2, '0') +
      color.blue.toString(16).padStart(2, '0')
    );
  }

  // Convert string into RGB style object.
  // The length of the string should be 7. (includes first '#')
  static ToRGBColor(color: string): RGBColor {
    if (color.length === 7)
      return {
        red: parseInt(color.substr(1, 2), 16),
        green: parseInt(color.substr(3, 2), 16),
        blue: parseInt(color.substr(5, 2), 16),
      };

    throw new Error(`The length of "${color}" should be 7.`);
  }
}

type TextStyleFontFamilies = 'serif' | 'sans-serif' | 'monospace';

export interface TextStyle {
  fontFamily: TextStyleFontFamilies;
  fontSize: number;
  isTextBold: boolean;
  isTextItalic: boolean;
  isTextUnderlined: boolean;
  textColor: RGBColor;
  backgroundColor: RGBColor;
  underlineColor: RGBColor;
}

export class TextStyleManager {
  // The default text style.
  public static PresentTextStyle: TextStyle = {
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

  public static Initialize() {
    // Display default value in every input element.
    this.fontFamilyChanged(this.PresentTextStyle.fontFamily, this.PresentTextStyle);
    this.fontSizeChanged(this.PresentTextStyle.fontSize, this.PresentTextStyle);
    this.isTextBoldChanged(this.PresentTextStyle.isTextBold, this.PresentTextStyle);
    this.isTextItalicChanged(this.PresentTextStyle.isTextItalic, this.PresentTextStyle);
    this.isTextUnderlinedChanged(this.PresentTextStyle.isTextUnderlined, this.PresentTextStyle);
    this.textColorChanged(RGBColorConverter.ToString(this.PresentTextStyle.textColor), this.PresentTextStyle);
    this.backgroundColorChanged(
      RGBColorConverter.ToString(this.PresentTextStyle.backgroundColor),
      this.PresentTextStyle
    );
    this.underlineColorChanged(RGBColorConverter.ToString(this.PresentTextStyle.underlineColor), this.PresentTextStyle);
    (<HTMLInputElement>document.getElementById('text-color__color-selection')).value = RGBColorConverter.ToString(
      this.PresentTextStyle.textColor
    );
    (<HTMLInputElement>document.getElementById('background-color__color-selection')).value = RGBColorConverter.ToString(
      this.PresentTextStyle.backgroundColor
    );
    (<HTMLInputElement>document.getElementById('underline-color__color-selection')).value = RGBColorConverter.ToString(
      this.PresentTextStyle.underlineColor
    );

    // Detect changing of each value.
    document.getElementById('font-family-selection')?.addEventListener('change', () => {
      this.fontFamilyChanged(
        (<HTMLInputElement>document.getElementById('font-family-selection')).value as TextStyleFontFamilies,
        this.PresentTextStyle
      );
    });

    document.getElementById('font-size-input')?.addEventListener('change', () => {
      this.fontSizeChanged(
        Number((<HTMLInputElement>document.getElementById('font-size-input')).value),
        this.PresentTextStyle
      );
    });

    document.getElementById('font-size-larger')?.addEventListener('click', () => {
      this.fontSizeChanged(this.PresentTextStyle.fontSize + 1, this.PresentTextStyle);
    });

    document.getElementById('font-size-smaller')?.addEventListener('click', () => {
      this.fontSizeChanged(this.PresentTextStyle.fontSize - 1, this.PresentTextStyle);
    });

    document.getElementById('is-text-bold-selection')?.addEventListener('click', () => {
      this.isTextBoldChanged(!this.PresentTextStyle.isTextBold, this.PresentTextStyle);
    });

    document.getElementById('is-text-italic-selection')?.addEventListener('click', () => {
      this.isTextItalicChanged(!this.PresentTextStyle.isTextItalic, this.PresentTextStyle);
    });

    document.getElementById('is-text-underlined-selection')?.addEventListener('click', () => {
      this.isTextUnderlinedChanged(!this.PresentTextStyle.isTextUnderlined, this.PresentTextStyle);
    });

    document.getElementById('text-color__color-selection')?.addEventListener('change', () => {
      this.textColorChanged(
        (<HTMLInputElement>document.getElementById('text-color__color-selection')).value,
        this.PresentTextStyle
      );
    });

    document.getElementById('background-color__color-selection')?.addEventListener('change', () => {
      this.backgroundColorChanged(
        (<HTMLInputElement>document.getElementById('background-color__color-selection')).value,
        this.PresentTextStyle
      );
    });

    document.getElementById('underline-color__color-selection')?.addEventListener('change', () => {
      this.underlineColorChanged(
        (<HTMLInputElement>document.getElementById('underline-color__color-selection')).value,
        this.PresentTextStyle
      );
    });
  }

  // It will be called manually when each value is changed.
  private static fontFamilyChanged = (newFontFamily: TextStyleFontFamilies, textStyle: TextStyle) => {
    UILayer.FontFamilyChanged(newFontFamily);
    BackgroundLayer.FontFamilyChanged(newFontFamily, textStyle);
  };

  private static fontSizeChanged = (newSize: number, textStyle: TextStyle): void => {
    UILayer.FontSizeChanged(newSize);
    BackgroundLayer.FontSizeChanged(newSize, textStyle);
  };

  private static isTextBoldChanged = (newValue: boolean, textStyle: TextStyle): void => {
    UILayer.IsTextBoldChanged(newValue);
    BackgroundLayer.IsTextBoldChanged(newValue, textStyle);
  };

  private static isTextItalicChanged = (newValue: boolean, textStyle: TextStyle): void => {
    UILayer.IsTextItalicChanged(newValue);
    BackgroundLayer.IsTextItalicChanged(newValue, textStyle);
  };

  private static isTextUnderlinedChanged = (newValue: boolean, textStyle: TextStyle): void => {
    UILayer.IsTextUnderlinedChanged(newValue);
    BackgroundLayer.IsTextUnderlinedChanged(newValue, textStyle);
  };

  private static textColorChanged = (newColor: string, textStyle: TextStyle): void => {
    UILayer.TextColorChanged(newColor);
    BackgroundLayer.TextColorChanged(newColor, textStyle);
  };

  private static backgroundColorChanged = (newColor: string, textStyle: TextStyle): void => {
    UILayer.BackgroundColorChanged(newColor);
    BackgroundLayer.BackgroundColorChanged(newColor, textStyle);
  };

  private static underlineColorChanged = (newColor: string, textStyle: TextStyle): void => {
    UILayer.UnderlineColorChanged(newColor);
    BackgroundLayer.UnderlineColorChanged(newColor, textStyle);
  };
}

// Every method in this class should be related to DOM operation.
class UILayer {
  static FontFamilyChanged(newFontFamily: TextStyleFontFamilies) {
    (<HTMLInputElement>document.getElementById('font-family-selection')).value = newFontFamily;
  }

  static FontSizeChanged(newSize: number): void {
    (<HTMLInputElement>document.getElementById('font-size-input')).value = newSize.toString();
  }

  static IsTextBoldChanged(newValue: boolean): void {
    document.getElementById('is-text-bold-selection')?.setAttribute('aria-selected', String(newValue));
  }

  static IsTextItalicChanged(newValue: boolean): void {
    document.getElementById('is-text-italic-selection')?.setAttribute('aria-selected', String(newValue));
  }

  static IsTextUnderlinedChanged(newValue: boolean): void {
    document.getElementById('is-text-underlined-selection')?.setAttribute('aria-selected', String(newValue));
  }

  static TextColorChanged(newColor: string): void {
    document.getElementById('text-color')!.style.color = newColor;
  }

  static BackgroundColorChanged(newColor: string): void {
    document.getElementById('background-color')!.style.backgroundColor = newColor;
  }

  static UnderlineColorChanged(newColor: string): void {
    document.getElementById('underline-color')!.style.backgroundColor = newColor;
  }
}

// Every method in this class should NOT be related to DOM operation.
export class BackgroundLayer {
  static FontFamilyChanged(newFontFamily: TextStyleFontFamilies, textStyle: TextStyle): void {
    textStyle.fontFamily = newFontFamily;
  }

  static FontSizeChanged(newSize: number, textStyle: TextStyle): void {
    textStyle.fontSize = newSize;
  }

  static IsTextBoldChanged(newValue: boolean, textStyle: TextStyle): void {
    textStyle.isTextBold = newValue;
  }

  static IsTextItalicChanged(newValue: boolean, textStyle: TextStyle): void {
    textStyle.isTextItalic = newValue;
  }

  static IsTextUnderlinedChanged(newValue: boolean, textStyle: TextStyle): void {
    textStyle.isTextUnderlined = newValue;
  }

  static TextColorChanged(newColor: string, textStyle: TextStyle): void {
    textStyle.textColor = RGBColorConverter.ToRGBColor(newColor);
  }

  static BackgroundColorChanged(newColor: string, textStyle: TextStyle): void {
    textStyle.backgroundColor = RGBColorConverter.ToRGBColor(newColor);
  }

  static UnderlineColorChanged(newColor: string, textStyle: TextStyle): void {
    textStyle.underlineColor = RGBColorConverter.ToRGBColor(newColor);
  }
}
