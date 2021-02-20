interface RGBColor {
  red: number;
  green: number;
  blue: number;
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
}
