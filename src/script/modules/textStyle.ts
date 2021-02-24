interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

export class RGBColorConverter {
  static ToString(color: RGBColor): string {
    return (
      '#' +
      color.red.toString(16).padStart(2, '0') +
      color.green.toString(16).padStart(2, '0') +
      color.blue.toString(16).padStart(2, '0')
    );
  }

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

const fontFamilyChanged = (newFontFamily: TextStyleFontFamilies, textStyle: TextStyle) => {
  UILayer.FontFamilyChanged(newFontFamily);
  BackgroundLayer.FontFamilyChanged(newFontFamily, textStyle);
};

const fontSizeChanged = (newSize: number, textStyle: TextStyle): void => {
  UILayer.FontSizeChanged(newSize);
  BackgroundLayer.FontSizeChanged(newSize, textStyle);
};

const isTextBoldChanged = (newValue: boolean, textStyle: TextStyle): void => {
  UILayer.IsTextBoldChanged(newValue);
  BackgroundLayer.IsTextBoldChanged(newValue, textStyle);
};

const isTextItalicChanged = (newValue: boolean, textStyle: TextStyle): void => {
  UILayer.IsTextItalicChanged(newValue);
  BackgroundLayer.IsTextItalicChanged(newValue, textStyle);
};

const isTextUnderlinedChanged = (newValue: boolean, textStyle: TextStyle): void => {
  UILayer.IsTextUnderlinedChanged(newValue);
  BackgroundLayer.IsTextUnderlinedChanged(newValue, textStyle);
};

const textColorChanged = (newColor: string, textStyle: TextStyle): void => {
  UILayer.TextColorChanged(newColor);
  BackgroundLayer.TextColorChanged(newColor, textStyle);
};

const backgroundColorChanged = (newColor: string, textStyle: TextStyle): void => {
  UILayer.BackgroundColorChanged(newColor);
  BackgroundLayer.BackgroundColorChanged(newColor, textStyle);
};

const underlineColorChanged = (newColor: string, textStyle: TextStyle): void => {
  UILayer.UnderlineColorChanged(newColor);
  BackgroundLayer.UnderlineColorChanged(newColor, textStyle);
};

export const editorTextStyle = () => {
  // The default text style.
  const presentTextStyle: TextStyle = {
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

  // Display default value in every input element.
  fontFamilyChanged(presentTextStyle.fontFamily, presentTextStyle);
  fontSizeChanged(presentTextStyle.fontSize, presentTextStyle);
  isTextBoldChanged(presentTextStyle.isTextBold, presentTextStyle);
  isTextItalicChanged(presentTextStyle.isTextItalic, presentTextStyle);
  isTextUnderlinedChanged(presentTextStyle.isTextUnderlined, presentTextStyle);
  textColorChanged(RGBColorConverter.ToString(presentTextStyle.textColor), presentTextStyle);
  backgroundColorChanged(RGBColorConverter.ToString(presentTextStyle.backgroundColor), presentTextStyle);
  underlineColorChanged(RGBColorConverter.ToString(presentTextStyle.underlineColor), presentTextStyle);

  document.getElementById('font-family-selection')?.addEventListener('change', () => {
    fontFamilyChanged(
      (<HTMLInputElement>document.getElementById('font-family-selection')).value as TextStyleFontFamilies,
      presentTextStyle
    );
  });

  document.getElementById('font-size-input')?.addEventListener('change', () => {
    fontSizeChanged(Number((<HTMLInputElement>document.getElementById('font-size-input')).value), presentTextStyle);
  });

  document.getElementById('font-size-larger')?.addEventListener('click', () => {
    fontSizeChanged(presentTextStyle.fontSize + 1, presentTextStyle);
  });

  document.getElementById('font-size-smaller')?.addEventListener('click', () => {
    fontSizeChanged(presentTextStyle.fontSize - 1, presentTextStyle);
  });

  document.getElementById('is-text-bold-selection')?.addEventListener('click', () => {
    isTextBoldChanged(!presentTextStyle.isTextBold, presentTextStyle);
  });

  document.getElementById('is-text-italic-selection')?.addEventListener('click', () => {
    isTextItalicChanged(!presentTextStyle.isTextItalic, presentTextStyle);
  });

  document.getElementById('is-text-underlined-selection')?.addEventListener('click', () => {
    isTextUnderlinedChanged(!presentTextStyle.isTextUnderlined, presentTextStyle);
  });

  document.getElementById('text-color__color-selection')?.addEventListener('change', () => {
    textColorChanged(
      (<HTMLInputElement>document.getElementById('text-color__color-selection')).value,
      presentTextStyle
    );
  });

  document.getElementById('background-color__color-selection')?.addEventListener('change', () => {
    backgroundColorChanged(
      (<HTMLInputElement>document.getElementById('background-color__color-selection')).value,
      presentTextStyle
    );
  });

  document.getElementById('underline-color__color-selection')?.addEventListener('change', () => {
    underlineColorChanged(
      (<HTMLInputElement>document.getElementById('underline-color__color-selection')).value,
      presentTextStyle
    );
  });
};

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

export class BackgroundLayer {
  static FontFamilyChanged(newFontFamily: TextStyleFontFamilies, textStyle: TextStyle) {
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
