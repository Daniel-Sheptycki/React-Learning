/* eslint-disable react/prop-types */
import "../css/header.css"
export default function Header(props) {
    //Will be true if the user is signed in
    const isSignedIn = localStorage.getItem("signedIn") == 'true';

    //Will be true if the user is on the home page
    const isHome = props.home;

    //If they are on the home page set the prefix to access other pages to its directory, otherwise search within the same file
    const pagePrefix = isHome? "./src/pages/" : "./";

    //If they are on the home page direct them to the same page, otherwise back to the root file.
    const homePrefix = isHome? "#" : "../../index.html";
    return (
    <header className="main-header">
        <div className="header-container">
            <a className="header-text" href={homePrefix}><h1>Amazingon</h1></a>
            <nav>
                <ul>
                    <li><a href={isSignedIn? pagePrefix + "products.html" : pagePrefix + "sign-in.html"}>Products</a></li>
                    {/* If the user is signed in this will appear and function as a "your account" button */}
                    <li><a href={isSignedIn? pagePrefix + "your-account.html" : pagePrefix + "sign-in.html"}>{isSignedIn? 'Your Account': 'Sign In'}</a></li>
                </ul>
            </nav>
        </div>
    </header>)
}
