export const editor = (): void => {
  // Inject canvas element: The size will be the same as the main element.
  const editorWrapper = document.getElementById('editor__wrapper');
  editorWrapper?.insertAdjacentHTML(
    'afterbegin',
    `<canvas id="editor"
      height=${(<number>editorWrapper?.clientHeight).toString()}
      width=${(<number>editorWrapper?.clientWidth).toString()}></canvas>`
  );

  const editor = document.getElementById('editor') as HTMLCanvasElement;
  const editor_ctx = editor.getContext('2d');

  if (editor_ctx === null) return;
};
