import { Route, Routes } from "react-router-dom";
import { AppProvider } from "../../context/AppContext";
import Home from "../../pages/Home/Home";
import Product from "../../pages/Product/Product";
import Cart from "../../pages/Cart/Cart";
import Checkout from "../../pages/Checkout/Checkout";
import Category from "../../pages/Category/Category";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SignIn from "../../pages/SignIn/SignIn";
import SignUp from "../../pages/SignUp/SignUp";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute";
import SearchResults from "../../pages/SearchResults/SearchResults";
import Account from "../../pages/Account/Account";
import Orders from "../../pages/Orders/Orders";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
