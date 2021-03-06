import React from 'react'
import ReactDOM from 'react-dom'
import './assets/scss/App.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 2, // 2 minutes
			cacheTime: 1000 * 60 * 60 * 4, // 4 hours
		},
	},
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
