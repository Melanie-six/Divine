import { NavLink } from 'react-router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../assets/all.css';

function Footer() {
  return (
    <footer className="py-5 theme-dark border-top-accent">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-title mb-3">Divine Pâtisserie</div>
            <p className="footer-text opacity-75">
              在精準與感性之間，誕生每一顆值得被細細品味的甜點。<br/>
              每一份 Divine，都是獨一無二的手作藝術。
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="https://instagram.com" className="footer-social-link"><i className="bi bi-instagram"></i></a>
              <a href="https://facebook.com" className="footer-social-link"><i className="bi bi-facebook"></i></a>
              <a href="https://threads.net" className="footer-social-link"><i className="bi bi-threads"></i></a>
              <a href="mailto:info@divine.com" className="footer-social-link"><i className="bi bi-envelope"></i></a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-subtitle text-accent mb-4">Explore</h5>
            <ul className="list-unstyled footer-nav">
              <li><NavLink to="/products">Menu</NavLink></li>
              <li><NavLink to="/about">Our Story</NavLink></li>
              <li><NavLink to="/cart">Cart</NavLink></li>
              <li><NavLink to="/pay">Payment</NavLink></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-subtitle text-accent mb-4">Hours & Contact</h5>
            <ul className="list-unstyled footer-text opacity-75">
              <li className="mb-2">Tue - Sun : 10:00 - 16:00</li>
              <li className="mb-2">Mon : Closed</li>
              <li className="mb-2">Da’an District, Taipei</li>
              <li><a href="tel:+886212345678" className="footer-tel-link">+886 2 1234 5678</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-subtitle text-accent mb-4">Newsletter</h5>
            <p className="small opacity-75">訂閱我們，獲取最新季節限定甜點消息。</p>
            <div className="input-group mb-3 footer-subscribe">
              <input type="email" className="form-control bg-transparent text-white" placeholder="Email Address" />
              <button className="btn btn-outline-accent" type="button">Join</button>
            </div>
          </div>
        </div>
        <hr className="my-4 border-accent opacity-25" />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start small opacity-50">
            © 2026 Divine Pâtisserie. All rights reserved.
          </div>
          <div className="col-md-6 text-center text-md-end small opacity-50 italic">
            Built with butter, cream, and a little bit of code.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
