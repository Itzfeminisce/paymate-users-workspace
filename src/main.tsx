import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { validateEnv } from './utils/env-validation'

// Validate environment variables before app starts
validateEnv()

// Debug log
console.log('API URL:', import.meta.env.VITE_API_URL)

createRoot(document.getElementById("root")!).render(<App />);
