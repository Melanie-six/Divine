import { RotatingSquare } from "react-loader-spinner";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/all.css'



function LoadingPage() {
    return (
        <div className="fixed-top w-100 vh-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" 
             style={{ zIndex: 9999 }}>
            <div className="text-center">
                <RotatingSquare
                    visible={true}
                    height="100"
                    width="100"
                    color="#4fa94d"
                />
                <p className="mt-3 fw-bold text-secondary">驗證身分中...</p>
            </div>
        </div>
    )
}

export default LoadingPage;