/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";
import Header from "../components/Header"
import Recipt from "../components/Recipt";
import '../css/youraccount.css'

export default function App(props) {
    //Assign the user from props
    const user = props.user;
    
    //Map the products bought from the user into an array of recipt elements
    const productsBought = user.productsBought.map((product) => <Recipt key={nanoid()} product={product}/>)

    //Map the products sold from the user into an array of recipt elements
    const productsSold = user.productsSold.map((product) => <Recipt key={nanoid()} product={product}/>)

    function signOut() {
        //Reset local storage
        localStorage.clear();

        //Re-direct to home
        window.location.assign("http://localhost:5173/");
    }
    return (
        <>
            <Header />
            <main>
                <header>
                    <h2>Your Account</h2>
                </header>
                <div className="main-info-container">
                    <section className="info-container">
                        <header>
                            <h3>Admin</h3>
                        </header>
                        <div className="sub-info-container">
                            <div className="info-peice">
                                <h4>Username</h4>
                                <p>{user.username}</p>
                            </div>
                            <div className="info-peice">
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div className="info-peice">
                                <h4>Password</h4>
                                <p>{user.password}</p>
                            </div>
                            <div className="info-peice">
                                <h4>Balance</h4>
                                <p>{user.balance}</p>
                            </div>
                        </div>
                    </section>
                    <section className="info-container">
                        <header>
                            <h3>Products Bought</h3>
                        </header>
                        <div className="sub-info-container">
                            {productsBought.length? productsBought : "No Products Bought"}
                        </div>
                    </section>
                    <section className="info-container">
                        <header>
                            <h3>Products Sold</h3>
                        </header>
                        <div className="sub-info-container">
                            {productsSold.length? productsSold : "No Products Sold"}
                        </div>
                    </section>
                </div>
                <button type="button" onClick={signOut}>Sign Out</button>
            </main>
        </>
    )
}