import { Block, renderDOM, registerComponent } from '../core';
import '../styles/style.css';
import MessengerPage from '../pages/messenger';

const components = require('./components/**/index.ts') as {[key: string]: { default: typeof Block }};

Object.values(components).forEach(component => {
  registerComponent(component.default);
});

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(MessengerPage);
});
