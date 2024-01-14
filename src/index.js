import './index.css';

import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from './store/index';
import App from './App';
import { NavigationProvider } from './context/navigation';

const el = document.getElementById('root');
const root = createRoot(el);

root.render(
 <Provider store={store}>
  <NavigationProvider>
    <App></App>
  </NavigationProvider>
 </Provider>
);