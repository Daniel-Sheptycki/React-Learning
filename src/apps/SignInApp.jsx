/* eslint-disable react/prop-types */
import { useState } from 'react'
import Header from '../components/Header'
import { AddUser, SignIn } from '../js/firebase';

function App(props) {
  const crAcc = props.crAcc;

  console.log("create account: ",crAcc)
  //If the create account menu should start flipped
  const [menuFlipped, flipMenu] = useState(crAcc);

  function signIn(form) {
    //Prevent the page from refreshing
    form.preventDefault();

    let userInfo;

    //Get the info from DB
    SignIn(form.target[0].value, form.target[1].value)
      .then((info) => {
        //If it finds the account
        if (info !== undefined) {
          //Assign the user info
          userInfo = info;

          //Set local storage
          localStorage.setItem("signedIn", true);
          localStorage.setItem("username", userInfo.username);

          form.target.reset();

          //Send them to the home page
          window.location.assign("http://localhost:5173/index.html")
        }
      })
      .catch(() => {
        alert("Error logging in")
      })
      console.log("huh")
  }
  function createAccount(form) {
    //Prevent the page from refreshing
    form.preventDefault();

    //Get the info from the form
    const userInfo = {
      email: form.target[1].value,
      username: form.target[0].value,
      password: form.target[2].value
    }

    AddUser(userInfo)
      .then((bool) => {
        //If the item was successfully added to DB
        if (bool) {
          //Set local storage
          localStorage.setItem("signedIn", true);
          localStorage.setItem("username", userInfo.username);

          //Reset the form
          form.target.reset();

          //Send them to the home page
          window.location.assign("http://localhost:5173/index.html")
        }
      })

  }
  const signInElement = (      
  <form className='sign-in' onSubmit={signIn}>
  <header>
    <h2>Sign In</h2>
  </header>
  <div className='inputs'>
    <div>
      <label htmlFor="sign-in-username-input">Username</label>
      <input type="text" id='sign-in-username-input'required/>
    </div>
    <div>
      <label htmlFor="sign-in-password-input">Password</label>
      <input type="password" id='sign-in-password-input' required/>
    </div>
  </div>
  <button type='submit'>Sign In</button>
  <div className='options'>
    <p>Dont have an account? <span className='link-text' onClick={() => flipMenu(true)}>Create One.</span></p>
    <p><span className='link-text'>Forgot Password?</span></p>
  </div>
</form>  
  )
  const createAccountElement = (
    <form className='create-account' onSubmit={createAccount}>
      <header>
        <h2>Create Account</h2>
      </header>
      <div className='inputs'>
        <div><label htmlFor="create-account-username-input">Username</label><input type="text" id="create-account-username-input" required/></div>
        <div><label htmlFor="create-account-email-input">Email</label><input type="email" id="create-account-email-input" required/></div>
        <div><label htmlFor="create-account-password-input">Password</label><input type="password" id="create-account-passwor-input" required/></div>
      </div>
      <button type="submit">Create</button>
      <div className='options'>
        <p>Already have an account? <span className='link-text' onClick={() => flipMenu(false)}>Sign In.</span></p>
      </div>
    </form>
  )
  return (
    <>
    <Header />
    <main>
      {menuFlipped? createAccountElement : signInElement}
    </main>
    </>
  )
}

export default App
