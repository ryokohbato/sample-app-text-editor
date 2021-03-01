type WindowScaleCommands = 'Larger' | 'Smaller';

export class WindowScale {
  public static PresentScale = 1;

  public static Initialize() {
    document.querySelector('.r-header_item__zoom-in')?.addEventListener('click', () => {
      this.Change('Larger');
    });

    document.querySelector('.r-header_item__zoom-out')?.addEventListener('click', () => {
      if (!this.Change('Smaller')) {
        alert('これ以上小さくすることはできません。');
      }
    });
  }

  // Change the scale of the body.
  // If the return value is false, it means that the scale is the smallest (0.1).
  public static Change(command: WindowScaleCommands): boolean {
    if (command === 'Larger') {
      this.PresentScale += 0.05;
    } else {
      if (this.PresentScale <= 0.5) return false;

      this.PresentScale -= 0.05;
    }

    document.getElementById('editor__print')!.style.transform = `scale(${this.PresentScale})`;
    return true;
  }
}
