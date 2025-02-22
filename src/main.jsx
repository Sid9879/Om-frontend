import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './store/store.jsx'
import ErrorBoundary from './ErrorBoundary';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ErrorBoundary>
    <App />

      </ErrorBoundary>
  </Provider>
)
