import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './apps/SignInApp.jsx'
import './css/index.css'
import './css/signin.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App crAcc={localStorage.getItem("crAcc") === 'true'}/>
  </React.StrictMode>,
)
localStorage.removeItem("crAcc");