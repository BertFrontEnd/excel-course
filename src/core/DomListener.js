import { capitalize } from './utilities/utilities';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    /* console.log(this.listeners, this.$root); */
    this.listeners.forEach((listener) => {
      /*  console.log(listener, this.$root); */
      const method = getMethodName(listener);
      /* console.log(method); */
      /* console.log(this); */
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} Component`,
        );
      }
      // То же, что и addEventListener
      this.$root.on(listener, this[method].bind(this));
    });
  }

  removeDOMListeners() {}
}

// Example: input -> onInput
export function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
