import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/app/App';
import * as serviceWorker from './serviceWorker';
// 导入 antd.css 全局 css
import 'antd/dist/antd.css';
// 使 antd 支持 IE11
import 'babel-polyfill';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
