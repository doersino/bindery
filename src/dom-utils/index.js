import classes from './classes';
import prefixer from './prefixer';
import safeMeasure from './safeMeasure';
import createEl from './createEl';

const doc = window.document;

// Create stylesheet with id
const addStylesheet = (id) => {
  const style = doc.createElement('style');
  style.id = id;
  doc.head.appendChild(style);
  return style;
};

// Fetch or create stylesheet with id
const stylesheet = id => doc.querySelector(`#${id}`) || addStylesheet(id);

// Parse html from text
const parseHTML = (text, selector) => {
  const wrapper = doc.createElement('div');
  wrapper.innerHTML = text;
  return wrapper.querySelector(selector);
};

const c = prefixer;
export { c, classes, createEl, stylesheet, safeMeasure, parseHTML };
