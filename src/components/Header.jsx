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
          <div className="navbar-nav w-100 d-lg-flex justify-content-between align-items-center">
            <NavLink
              className="nav-link theme-dark "
              aria-current="page"
              to="/"
            >
              Home
            </NavLink>
            <NavLink className="nav-link theme-dark " to="about">
              About
            </NavLink>
            <NavLink className="nav-link theme-dark " to="products">
              Menu
            </NavLink>
            <NavLink className="nav-link theme-dark " to="cart">
              Cart
            </NavLink>
            <NavLink className="nav-link theme-dark " to="pay">
              Payment
            </NavLink>
          </div>
          <div className="navbar-nav w-100 d-lg-flex align-items-center navbar-nav-right">
            <NavLink className="nav-link mx-2 theme-dark" to="cart">
              <i className="bi bi-cart3"></i>
              {cartList.length > 0 && <span className="cart-badge">{cartList.length}</span>}
            </NavLink>
            <NavLink className="nav-link mx-3 theme-dark" to="login">
              <i className="bi bi-person-circle"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
    // <nav className="navbar navbar-expand-lg fixed-top">
    //   <div className="container">
    //     {/* 1. 品牌名稱：直接放在 container 下 */}
    //     <NavLink className="navbar-brand fs-3 fw-bold" to="/">
    //       Divine
    //     </NavLink>

    //     {/* 2. 漢堡按鈕：直接放在 container 下 */}
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarNavAltMarkup"
    //       aria-controls="navbarNavAltMarkup"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     {/* 3. 選單內容 */}
    //     <div
    //       className="collapse navbar-collapse"
    //       id="navbarNavAltMarkup"
    //     >
    //       {/* 使用 w-100 與 d-lg-flex justify-content-between 讓電腦版左右撐開 */}
    //       <div className="navbar-nav w-100 d-lg-flex justify-content-between align-items-center">
            
    //         {/* 左側主要連結 */}
    //         <div className="d-lg-flex">
    //           <NavLink className="nav-link" to="/">Home</NavLink>
    //           <NavLink className="nav-link" to="about">About</NavLink>
    //           <NavLink className="nav-link" to="products">Menu</NavLink>
    //           <NavLink className="nav-link" to="cart">Cart</NavLink>
    //           <NavLink className="nav-link" to="pay">Payment</NavLink>
    //         </div>

    //         {/* 右側圖示連結 */}
    //         <div className="d-lg-flex align-items-center mt-2 mt-lg-0">
    //           <NavLink className="nav-link px-lg-3" to="cart">
    //             <i className="bi bi-cart3"></i>
    //             {cartList?.length > 0 && (
    //               <span className="cart-badge ms-1">{cartList.length}</span>
    //             )}
    //           </NavLink>
    //           <NavLink className="nav-link px-lg-2" to="login">
    //             <i className="bi bi-person-circle fs-5"></i>
    //           </NavLink>
    //         </div>

    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
}

export default Header;
