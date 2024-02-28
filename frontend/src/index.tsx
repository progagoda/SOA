import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { QueryClient, QueryClientProvider } from 'react-query'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
export const queryClient = new QueryClient({defaultOptions:{
  queries:{
    refetchOnWindowFocus: false,
    retry:0,
  }
  }})
root.render(
  <React.StrictMode>
    <QueryClientProvider client={ queryClient }>
      <App/>
    </QueryClientProvider>
  </React.StrictMode>,
)
reportWebVitals()
