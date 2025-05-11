
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Use the publishable key from your previous message
const PUBLISHABLE_KEY = "pk_test_YWxsb3dlZC1tYWNrZXJlbC0zNy5jbGVyay5hY2NvdW50cy5kZXYk"

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key")
}

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Root element not found")

const root = createRoot(rootElement)

root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
)
