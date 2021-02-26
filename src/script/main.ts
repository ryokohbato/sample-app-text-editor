import '../style/style.css';
import { applyColorTheme } from './modules/applyColorTheme';
import { Editor } from './modules/editor';

applyColorTheme();
const editor = new Editor();
editor.Watch();
