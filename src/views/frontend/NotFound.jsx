import { useNavigate } from 'react-router';
import '../../assets/all.css'
import { useEffect } from 'react';

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 2000)
    }, [navigate]);

    return (
        <>
        <div className="notfound-container">
            <img className="notfound-image" src="https://plus.unsplash.com/premium_photo-1770663836450-30a6cf62c7f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8" alt="Not Found" />
            <div className="notfound-text">This page has been eatern.</div>
        </div>
        </>
    )
};
export default NotFound;