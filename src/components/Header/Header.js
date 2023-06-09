import React, { useEffect, useState } from "react";
import accountIcon from "../../images/account.svg";
import cartIcon from "../../images/cart.svg";
import menuIcon from "../../images/menu.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";
import Sidebar from "../Sidebar/Sidebar";
import { getDocs } from "firebase/firestore";
import { categoriesCollection } from "../../db/firebase";
import { signOutUser } from "../../utils/auth";
import Logo from "../../images/multimart.png";
import useCartStore from "../../store/cartStore";
import useUserStore from "../../store/userStore";
const Header = () => {
  const cart = useCartStore((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const querySnapshot = await getDocs(categoriesCollection);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setCategories(data);
      } catch (error) {
        console.log("Error al obtener las categorias: ", error);
      }
    };
    getCategories();
  }, []);
  const navigateAccount = () => {
    navigate("/account", {
      state: {
        open: true,
      },
    });
  };
  const selectCategory = (category) => {
    handleToggleSidebar();
    navigate(`/category/${category}`);
  };

  const handleToggleMenu = () => {
    setOpenMenu((prevState) => !prevState);
  };
  const handleToggleSidebar = () => {
    console.log("click");
    setOpenSidebar((prevState) => !prevState);
    document.body.classList.toggle("no-overflow");
  };

  return (
    <div className="header">
      <Link to="/" className="header__logo-container">
        <img src={Logo} alt="Multimart logo" className="header__logo" />
      </Link>
      <div
        className="header__menu header__button"
        onClick={handleToggleSidebar}
      >
        <img src={menuIcon} alt="menu icon" className="header__icon" />
        <p className="header__categories">Categories</p>
      </div>
      <SearchBar />
      <img
        src={accountIcon}
        alt="account icon"
        className="header__icon_responsive"
        onClick={navigateAccount}
      />
      <div
        className="header__account-section header__button"
        onClick={handleToggleMenu}
      >
        <img src={accountIcon} alt="account icon" className="header__icon" />

        <p className="header__account">{user ? user.name : "account"}</p>

        <ul
          className={` header__account-menu ${
            openMenu && "header__account-menu_opened"
          }`}
        >
          {user ? (
            <>
              <Link to="/account">
                <li>account</li>
              </Link>
              <Link to="/orders">
                <li>orders</li>
              </Link>
              <li onClick={signOutUser}>sign out</li>
            </>
          ) : (
            <>
              <Link to="/signin" state={{ from: location.pathname }}>
                <li>Login</li>
              </Link>
              <Link to="/signup">
                <li>register</li>
              </Link>
            </>
          )}
        </ul>
      </div>
      <Link className="header__cart-section header__button" to="/cart">
        <img src={cartIcon} alt="cart icon" className="header__icon" />
        {cart.items.length > 0 && (
          <span className="header__cart-number">{cart.items.length}</span>
        )}
      </Link>
      <Sidebar
        open={openSidebar}
        categories={categories}
        onSelect={selectCategory}
        onClose={handleToggleSidebar}
      />
    </div>
  );
};

export default Header;
