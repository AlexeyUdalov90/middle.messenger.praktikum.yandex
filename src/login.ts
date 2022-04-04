import { Block, renderDOM, registerComponent } from './core';
import './styles/style.css';

// import OnboardingPage from './pages/onboarding';
import LoginPage from './pages/login';

const components = require('./components/**/index.ts') as {[key: string]: { default: typeof Block }};

Object.values(components).forEach(component => {
  registerComponent(component.default);
});

// class MyComponent extends Block {
//   render() {
//     return `<h1>First component</h1>`
//   }
// }

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(LoginPage);
});
