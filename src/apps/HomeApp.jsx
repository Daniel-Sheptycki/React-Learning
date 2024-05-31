/* eslint-disable react/prop-types */
import Header from "../components/Header"
export default function App(props) {
    //Find if the user is signed in
    const isSignedIn = localStorage.getItem("signedIn") == "true";

    const user = props.user;

    function redirectToSignIn(crAcc = false) {
        if (crAcc) {
            localStorage.setItem("crAcc", 'true');
        }
        window.location.assign("http://localhost:5173/src/pages/sign-in.html");
    }
    //HTML for un-signed-in users
    const newUserHome = (
        <main>
            <header><h2>Welcome to my app new user!</h2></header>
            <p>
                Please 
                <span className="link-text" onClick={() => redirectToSignIn(false)}> Sign in </span> 
                or 
                <span className="link-text" onClick={() => redirectToSignIn(true)}> Create an Account</span>.
            </p>
        </main>
    )
    //HTML for signed in users
    const existingUserHome = isSignedIn? (
        <main>
            <header><h2>Welcome Back {user.username}!</h2></header>
            <p>
                Would you like to
                <span className="link-text" onClick={() => {window.location.assign("http://localhost:5173/src/pages/your-account.html")}}> Review Your Account Information </span>
                or
                <span className="link-text" onClick={() => {}}> More!</span>
            </p>
        </main>
    ) : undefined;
    return (
        <>
            <Header home />
            {isSignedIn? existingUserHome : newUserHome}
        </>
    )
}