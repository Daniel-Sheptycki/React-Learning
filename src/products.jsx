import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './apps/ProductsApp.jsx'
import './css/index.css'
import './css/products.css'
import { GetAllProducts, GetUser } from './js/firebase.js'

//If they are signed in
if (localStorage.getItem("signedIn") === 'true') {
  //Get the user 
  GetUser(localStorage.getItem("username"))
    .then((returnedUser) => {
      //Get all products
      GetAllProducts()
        .then((allProducts) => {
          //Create the DOM passing the user and the products to the app
          ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
              <App user={returnedUser} products={allProducts}/>
            </React.StrictMode>,
          )
        })
      })
//If they arent signed in
} else {
  //boot them off the page
  window.location.assign("http://localhost:5173/");
}

