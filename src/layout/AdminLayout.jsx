import Footer from "../components/Footer";
import { Link, Outlet } from "react-router";
import "../assets/all.css";
import 'bootstrap-icons/font/bootstrap-icons.css';



function AdminLayout() {
    return (<>
        <nav className="navbar navbar-expand-lg theme-dark ">
            <div className="container theme-dark ">
                <div className="m-2">
                    <Link className="navbar-brand theme-dark " to="/admin/products">Divine</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse d-lg-flex justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link theme-dark " aria-current="page" to="/admin/products">Product Management</Link>
                        <Link className="nav-link theme-dark " to="/admin/orders">Orders</Link>
                    </div>
                    <div className="navbar-nav">
                        <Link className="nav-link mx-3 theme-dark" to="login"><i className="bi bi-door-open-fill"></i>logout</Link>
                    </div>
                </div>
            </div>
        </nav>
        
        <Outlet />
        <Footer/>

    </>)
};
export default AdminLayout;