  import { initializeApp } from "firebase/app";

  import { getFirestore, setDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";

  const firebaseConfig = {

    apiKey: "AIzaSyD3Hn3_xakl1wwmbVjZpv1vv78Gtr6vI5E",

    authDomain: "react-testing-2b53d.firebaseapp.com",

    projectId: "react-testing-2b53d",

    storageBucket: "react-testing-2b53d.appspot.com",

    messagingSenderId: "611510438325",

    appId: "1:611510438325:web:970ad80d5e9fd2dc0db1fc",

    measurementId: "G-YZ2W9FQBYJ"

  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  //Adds a new user to the firestore database
  export async function AddUser(userInfo) {
    if (userInfo) {
      const docRef = doc(db, "users", userInfo.username);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {...userInfo, balance: 500, productsBought: [], productsSold: []});
        return true;
      } 
      else 
      {
        console.log(docSnap);
        alert("Account already exists.")
        return false;
      }
    }
    return false;
  }
  //Handles a product being bought in the db, updates balances and adds reciepts
  export async function ProductBought(product, soldTo, soldFrom) {
    //Product contains product info; SoldTo is the user that bought the product; SoldFrom is the username of the user that sold the product

    //As soldFrom is only the username we need to get the actual user
    soldFrom = await GetUser(soldFrom);

    //Calculate new balances
    const soldToBalance = Number(soldTo.balance) - Number(product.price);
    const soldFromBalance = Number(soldFrom.balance) + Number(product.price);

    //Update DB With new balances and added product under its respective category
    UpdateUser({...soldTo, balance: soldToBalance, productsBought:[...soldTo.productsBought, product]});
    UpdateUser({...soldFrom, balance: soldFromBalance, productsSold:[...soldFrom.productsSold, product]});

    console.log("Product Purchased, Balances updated from ", soldTo.balance, "to", soldToBalance, "and from", soldFrom.balance, "to", soldFromBalance);
  }
  //Updates user info in DB
  export async function UpdateUser(userInfo) {
    if (userInfo) {
      await setDoc(doc(db, "users", userInfo.username), userInfo);
    } else {
      throw new Error("Invalid userInfo passed")
    }
  }
  //Returns the user info found under the given username if the password matches.
  export async function SignIn(username, password) {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().password == password) {
        return docSnap.data();
      }
    } 
  }
  //Returns the user info found under the given username
  export async function GetUser(username) {
    console.log("Got User")
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      alert("account doesent exist");
    }
  }
  //Adds a new product to the firestore database under the given username (userInfo.username)
  export async function UploadProduct(product, userInfo) {
    //If the product and user exist
    if (product && userInfo) {

      //Get a reference to the doc
      const docRef = doc(db, "products", userInfo.username);

      //Get a snapshot of that referance
      const docSnap = await getDoc(docRef);

      //Get all pre-existing products under that name
      const docData = docSnap.data();

      //Set it with the old product and the new one
      setDoc(docRef, {...docData, [product.title]: product});

      return true;

    } else {

      alert("Product or User was invalid. Please refresh the page and try again");

      return false;

    }
  }
  //Gets all products with their author from the firestore database
  export async function GetAllProducts() {
    //Get a ref to the collection
    const collectionRef = collection(db, "products");

    //Get all products from DB
    const collectionSnap = await getDocs(collectionRef);

    return collectionSnap.docs.map((product) => ({data: product.data(), author: product.id}));
  }