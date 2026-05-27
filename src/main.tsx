import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/heebo/hebrew-400.css'
import '@fontsource/heebo/hebrew-700.css'
import '@fontsource/heebo/hebrew-800.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
