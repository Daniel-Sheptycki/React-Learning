/* eslint-disable react/prop-types */
import Header from "../components/Header";
import Product from "../components/Product";
import { useState } from "react";
import { ProductBought, UploadProduct } from "../js/firebase";
import { nanoid } from "nanoid";

function App(props) {
    //Assign the user from props
    const user = props.user;

    //Array of all products with the starting value of the products from db.
    const [allProducts, setProducts] = useState(props.products)

    console.log("All products: ", allProducts);

    //Declare an array of Products to be displayed
    const displayProducts = [];

    //Iterate through every user
    allProducts.forEach(user => {
      //Iterate through their products  
        for (const productKey in user.data) {
            const product = user.data[productKey];
            console.log("this product: ", product)
            //Push each product as a Product element to the array
            displayProducts.push(
                <Product 
                    key={nanoid()}
                    title={product.title}
                    price={product.price}
                    desc={product.desc}
                    img={product.img}
                    author={user.author}
                    onBuy={() => {handleBuy(product, user.author)}}
                    rating={product.rating}
                    ratings={product.ratings}
                    isRatable
                />
            )
        }
    });

    const [addProduct, changeMainMenu] = useState(false);

    const [productInProgess, modifyProduct] = useState({title: "Title", price: 0.00, desc: "Description of product..", img: "../assets/Placeholder Img.png"});

    function handleBuy(product, author) {
        if (user.username === author) {
            alert("You cannot buy your own item.")
            return;
        }
        //If they can afford it
        if (user.balance > product.price) {
            //Ask them if their sure
            if (confirm(`Are you sure you would like to purchase '${product.title}' for ${product.price}$?`)) {
                //Process it in DB
                ProductBought(product, user, author);

                //Alert them it was bought
                alert(`Purchased '${product.title}' for ${product.price}$!`);

                //Change user info
                user.balance -= product.price;
            }
        } else {
            alert("Insufficient Funds")
        }
    }
    function handleSubmit(form) {
        form.preventDefault();

        //Break down the form input
        const product = {
            title: form.target[0].value,
            price: form.target[1].value,
            desc: form.target[2].value,
            img: form.target[3].value,
            rating: 0,
            ratings: [],
        }

        //Upload to db
        UploadProduct(product, user);

        //Reset product in progress
        modifyProduct({title: "Title", price: 0.00, desc: "Description of product..", img: "../assets/Placeholder Img.png"});

        //Assign the current state of all products to a new array
        const newProducts = allProducts.map((product) => product)

        let userFound = false;

        //Locate the user if possible
        newProducts.forEach((userProduct) => {
            if (userProduct.author === user.username) {
                userFound = true;

                //Append this product to the end of their product list
                userProduct.data[product.title] = product
            }
        })

        //If the user wasnt located
        if (!userFound) {
            //Initialize their user into the list
            newProducts.push({data: {[product.title]: product}, author: user.username})   
        }

        //Re-assign the value of the state to the new array containing the new product
        setProducts(newProducts);
    }
    function updateProduct(key, value) {
        //To be sure they dont go over the price limit
        if (key === "price" && value.length < 6 || key !== "price") {
            const newProduct = {};
            Object.assign(newProduct, productInProgess);
            newProduct[key] = value;
            modifyProduct(newProduct)
        } 
    }
    const addProductMenu = (
        <main>
            <header><h2>Add A New Product</h2><p className="link-text" onClick={() => changeMainMenu(false)}>View All Products</p></header>
            <div className="main-content-wrapper">
                <div className="create">
                    <header>
                        <h3>Create Your Product</h3>
                    </header>
                    <form onSubmit={handleSubmit}>
                        <header>
                            <h2></h2>
                        </header>
                        <div className='inputs'>
                            <div><label htmlFor="new-product-title-input">Title</label><input type="text" id="new-product-title-input" maxLength="15" onChange={(e) => {updateProduct("title", e.target.value)}} value={productInProgess.title}/></div>
                            <div><label htmlFor="new-product-price-input">Price</label><input type="number" id="new-product-price-input" max="99999" min="1" onChange={(e) => {updateProduct("price", e.target.value)}} value={productInProgess.price}/></div>
                            <div><label htmlFor="new-product-description-input">Description</label><textarea id="new-product-description-input" rows={5} onChange={(e) => {updateProduct("desc", e.target.value)}} value={productInProgess.desc}></textarea></div>
                            <div><label htmlFor="new-product-image-input">Image (Online URL)</label><input type="text" id="new-product-image-input" onChange={(e) => {updateProduct("img", e.target.value)}} value={productInProgess.img}/></div>
                        </div>
                        <button type='submit'>Create Product</button>
                    </form>
                </div>
                <div className="preview">
                    <header>
                        <h3>Preview Your Product</h3>
                    </header>
                    <Product
                        title={productInProgess.title}
                        desc={productInProgess.desc}
                        price={productInProgess.price}
                        img={productInProgess.img}
                        author={user.username}
                        rating={0}
                        ratings={[]}
                        onBuy={() => {}}
                    />
                </div>
            </div>
        </main>
    );
    const viewProductsMenu = (
        <main>
            <header><h2>View All Products</h2><p className="link-text" onClick={() => changeMainMenu(true)}>Create A Product</p></header>
            <div className="products-container">
                {displayProducts}
            </div>
        </main>
        /* 
        View,
            designated section in center screen for all products to appear
            search filtering
            checkboxes to only view your products
            Product,
                Title, image, price, description, order button
        */
    );

    return (
        <>
            <Header />
            {addProduct? addProductMenu : viewProductsMenu}
        </>
    )
}
export default App;