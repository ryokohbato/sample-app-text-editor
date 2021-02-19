export const applyColorTheme = (): void => {
  // Call this MANUALLY AFTER dark mode is toggled.
  const modeChanged = () => {
    if (document.querySelector('html')?.classList.contains('dark')) {
      document.querySelectorAll('[only-color-scheme="light"]').forEach((x) => x.setAttribute('aria-disabled', 'true'));
      document.querySelectorAll('[only-color-scheme="dark"]').forEach((x) => x.setAttribute('aria-disabled', 'false'));
    } else {
      document.querySelectorAll('[only-color-scheme="light"]').forEach((x) => x.setAttribute('aria-disabled', 'false'));
      document.querySelectorAll('[only-color-scheme="dark"]').forEach((x) => x.setAttribute('aria-disabled', 'true'));
    }
  };

  // If  system's dark theme is on, enable dark mode from the begging.
  if (window.matchMedia('(prefers-color-scheme: dark').matches) {
    document.querySelector('html')?.classList.add('dark');
    modeChanged();
  }

  // Toggle dark mode when the button is pressed which has 'toggle-dark-mode' id.
  const toggleDarkMode = () => {
    const toggleButton = document.getElementById('toggle-dark-mode');

    toggleButton?.addEventListener('click', () => {
      // Add 'dark' class to html element.
      document.querySelector('html')?.classList.toggle('dark');
      modeChanged();
    });
  };

  toggleDarkMode();
};
