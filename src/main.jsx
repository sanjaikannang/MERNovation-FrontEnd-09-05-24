import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <I18nextProvider i18n={i18n}>
  <BrowserRouter>
    <App />
 </BrowserRouter>
 </I18nextProvider>
)
