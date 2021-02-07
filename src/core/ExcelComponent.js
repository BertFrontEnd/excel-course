import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || 'no name';
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }
}
