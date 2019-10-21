import '../styles/index.scss';

import $ from 'jquery';
import demoApp from './demoApp';


$(() => {
  const app = demoApp();
  console.log('Component instances:', app.components);
});
