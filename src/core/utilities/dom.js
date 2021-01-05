class Dom {}

export const $ = () => {
  return new Dom();
};

$.create = (tagName, className = '') => {
  const el = document.createElement(tagName);
  if (className) {
    el.classList.add(className);
  }
  return el;
};
