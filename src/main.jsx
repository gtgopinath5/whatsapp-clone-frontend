import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import reducer,{initialState} from './components/ContextApi/reducer.jsx'
import {StateProvider} from './components/ContextApi/StateProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
  </StrictMode>,
)
