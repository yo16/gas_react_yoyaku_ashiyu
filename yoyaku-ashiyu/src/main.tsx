import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CookiesProvider } from 'react-cookie'

import "./main.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
)
