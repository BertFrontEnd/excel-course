import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    return `
      <div class="info">⨍x</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(e) {
    console.log(this.$root);
    console.log('Formula: onInput', e.target.textContent.trim());
  }

  onClick() {
    console.log(this.$root);
  }
}
