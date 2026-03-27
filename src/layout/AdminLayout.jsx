import Footer from '../components/Footer';
import { NavLink, Outlet, useNavigate } from 'react-router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import useMessage from '../hooks/useMessage';
import axios from 'axios';
import '../assets/all.css';

const { VITE_API_BASE } = import.meta.env;

function AdminLayout() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useMessage();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${VITE_API_BASE}/logout`);
    } catch (error) {
      console.error('登出失敗', error);
      showError('登出失敗');
    } finally {
      document.cookie =
        'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      axios.defaults.headers.common['Authorization'] = '';
      navigate('/login', { replace: true });
      showSuccess('登出成功');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg theme-dark ">
        <div className="container theme-dark ">
          <div className="m-2">
            <div className="navbar-brand theme-dark " to="/admin/products">
              Divine
            </div>
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
          </div>
          <div
            className="collapse navbar-collapse d-lg-flex justify-content-between"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <NavLink
                className="nav-link theme-dark "
                aria-current="page"
                to="/admin/products"
              >
                Product Management
              </NavLink>
              <NavLink className="nav-link theme-dark " to="/admin/orders">
                Orders
              </NavLink>
            </div>
            <div className="navbar-nav">
              {/* <button type="button" className="nav-link btn btn-link text-danger" 
                            onClick={handleLogout}
                            style={{ textDecoration: 'none' }} >
                            <i className="bi bi-door-open-fill"></i>logout
                            </button> */}
              <button
                className="nav-link mx-3 theme-dark btn btn-link border-0"
                type="button"
                onClick={handleLogout}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-door-open-fill"></i>logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
      <Footer />
    </>
  );
}
export default AdminLayout;
