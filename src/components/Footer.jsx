import 'bootstrap-icons/font/bootstrap-icons.css';
import "../assets/all.css"



function Footer() {
    return (
        <footer className="py-3 theme-dark">
            <div className="container theme-dark d-flex justify-content-between align-items-center">
                <div className="footer-title">Divine Handcrafted <br />French Pâtisserie </div>
                <div className="d-flex flex-column footer-icons align-items-end">
                    <div className="d-flex justify-content-center my-2">
                        <i className="bi bi-facebook mx-2"></i>
                        <i className="bi bi-instagram mx-2"></i>
                        <i className="bi bi-threads mx-2"></i>
                        <i className="bi bi-envelope mx-2"></i>
                    </div>
                    <div>© Divine Pâtisserie</div>
                    <div>Built with butter, cream, and a little bit of code.</div>

                </div>
                {/* <p className="text-center fs-6">© 2024 Divine. All rights reserved.</p> */}
            </div>
        </footer>
    )
}

export default Footer;