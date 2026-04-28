
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { AuthProvider } from "./context/AuthContext";
import "./styles/global.css"; 



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>  
      <App />
    </AuthProvider>  
  </Provider>

);
