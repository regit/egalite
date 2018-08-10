import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './configureStore'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'c3/c3.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Provider store={store}>
	<App />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
