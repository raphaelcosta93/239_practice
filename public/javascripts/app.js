import { Model } from './model.js';
import { View } from './view.js';
import { Controller } from './controller.js';

document.addEventListener('DOMContentLoaded', (event) => {
  const view = new View();
  const model = new Model();
  const app = new Controller(model, view);
});