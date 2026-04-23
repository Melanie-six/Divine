import { NavLink, useLocation } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../slice/cartSlice';
import { Collapse } from 'bootstrap';
import '../assets/all.css';

function Header() {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();
  const collapseRef = useRef(null);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    const menu = collapseRef.current;
    if (menu && menu.classList.contains('show')) {
      const bsCollapse = new Collapse(menu, { toggle: false });
      bsCollapse.hide();
    }
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg theme-dark fixed-top navbar-dark">
      <div className="container theme-dark ">
          <NavLink className="navbar-brand theme-dark " to="/">
            Divine
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        <div
          className="collapse navbar-collapse d-lg-flex"
          id="navbarNavAltMarkup"
          ref={collapseRef}
        >
          <div className="navbar-nav d-lg-flex gap-4 align-items-center me-auto">
            <NavLink
              className="nav-link theme-dark"
              aria-current="page"
              to="/"
            >
              Home
            </NavLink>
            <NavLink className="nav-link theme-dark" to="about">
              About
            </NavLink>
            <NavLink className="nav-link theme-dark" to="products">
              Menu
            </NavLink>
            <NavLink className="nav-link theme-dark" to="cart">
              Cart
            </NavLink>
            <NavLink className="nav-link theme-dark" to="pay">
              Payment
            </NavLink>
          </div>
          <div className="navbar-nav d-lg-flex align-items-center gap-1">
            <NavLink className="nav-link theme-dark" to="cart">
              <i className="bi bi-cart3"></i>
              {cartList.length > 0 && <span className="cart-badge">{cartList.length}</span>}
            </NavLink>
            <NavLink className="nav-link theme-dark" to="login">
              <i className="bi bi-person-circle"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
