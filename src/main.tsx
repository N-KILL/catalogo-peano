import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// App
import App from './App.js'

// Css
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
