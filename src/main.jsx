import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './apps/HomeApp.jsx'
import { GetUser } from './js/firebase.js'
import './css/index.css'

//If they are signed in
if (localStorage.getItem("signedIn") == 'true') {
  //Get the user 
  GetUser(localStorage.getItem("username"))
      .then((returnedUser) => {
        //Create the DOM passing the user to the app
        ReactDOM.createRoot(document.getElementById('root')).render(
          <React.StrictMode>
            <App user={returnedUser}/>
          </React.StrictMode>,
        )
      })
} else {
  //Create the DOM 
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}


