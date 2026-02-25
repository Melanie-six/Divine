import { Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../assets/all.css"


function Header () {
    return (
        <nav className="navbar navbar-expand-lg theme-dark ">
            <div className="container theme-dark ">
                <div className="m-2">
                    <Link className="navbar-brand theme-dark " to="/">Divine</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse d-lg-flex justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link theme-dark " aria-current="page" to="/">Home</Link>
                        <Link className="nav-link theme-dark " to="about">About</Link>
                        <Link className="nav-link theme-dark " to="products">Products</Link>
                    </div>
                    <div className="navbar-nav">
                        <Link className="nav-link mx-2 theme-dark" to="cart"><i className="bi bi-cart3"></i></Link>
                        <Link className="nav-link mx-3 theme-dark" to="login"><i className="bi bi-person-circle"></i></Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;