
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { AuthProvider } from "./context/AuthContext";
import "./styles/global.css"; 
import { ToastContainer } from 'react-toastify';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <AuthProvider>  
      <App />



  <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"

    />
    
    </AuthProvider>  
  </Provider>

);
