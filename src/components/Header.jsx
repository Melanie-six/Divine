import { NavLink } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/all.css"

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function Header () {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const getCart = async () => {
            try {
                const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
                setCartCount(res.data.data.carts.length);
            } catch (error) {
                console.error(error.response);
                alert("取得購物車資料失敗，請稍後再試。");
            }
        };
        getCart();
        window.addEventListener("cart-updated", getCart);
        return () => {
            window.removeEventListener("cart-updated", getCart);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg theme-dark fixed-top navbar-dark">
            <div className="container theme-dark ">
                <div className="m-2">
                    <NavLink className="navbar-brand theme-dark " to="/">Divine</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse d-lg-flex justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link theme-dark " aria-current="page" to="/">Home</NavLink>
                        <NavLink className="nav-link theme-dark " to="about">About</NavLink>
                        <NavLink className="nav-link theme-dark " to="products">Menu</NavLink>
                        <NavLink className="nav-link theme-dark " to="cart">Cart</NavLink>
                        <NavLink className="nav-link theme-dark " to="pay">Payment</NavLink>

                    </div>
                    <div className="navbar-nav">
                        <NavLink className="nav-link mx-2 theme-dark" to="cart">
                            <i className="bi bi-cart3"></i>
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </NavLink>
                        <NavLink className="nav-link mx-3 theme-dark" to="login"><i className="bi bi-person-circle"></i></NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;