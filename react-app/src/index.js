import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
// import { ContextMenuProvider } from './context/ContextMenu/ContextMenuModal/ContextMenu';

const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <ContextMenuProvider> */}
			<ModalProvider>
				<App />
			</ModalProvider>
			{/* </ContextMenuProvider> */}
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
