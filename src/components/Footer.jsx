import 'bootstrap-icons/font/bootstrap-icons.css';


function Footer() {
    return (
        <footer className="bg-light py-2">
            <div className="container">
                <h3 className="text-center">Div.ine</h3>
                <div className="d-flex justify-content-center">
                    <i className="bi bi-facebook mx-2"></i>
                    <i className="bi bi-instagram mx-2"></i>
                    <i className="bi bi-threads mx-2"></i>
                    <i className="bi bi-envelope mx-2"></i>
                </div>
                <p className="text-center fs-6">© 2024 Divine. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;