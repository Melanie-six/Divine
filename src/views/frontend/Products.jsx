import { useEffect, useState } from 'react';
import '../../assets/all.css';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router";
import useMessage from '../../hooks/useMessage';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function Products() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { showError, showSuccess } = useMessage();

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/products/all`);
                const result = [
                    'all',
                    ...new Set(res.data.products.map((product) => product.category))
                ];
                setCategories(result);
            } catch (error) {
                console.log(error.response);
            }
        };
        getAllProducts();
        const getProducts = async (page = 1, category) => {
            try {
                const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/products`, 
                    {
                        params: {
                            page,
                            category: category === 'all' ? undefined : category
                        }
                    }
                );
                setProducts(res.data.products);
            } catch (error) {
                console.log(error.response);
            }
        };
        getProducts(1, selectedCategory);
    },[selectedCategory])

    const addCart = async (id, qty=1) => {
        try {
            const data = {
                product_id: id,
                qty
            }
            const res = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`, {data});
            showSuccess("已加入購物車");
            window.dispatchEvent(new Event("cart-updated"));
        } catch (error) {
            console.log(error.response);
            showError("加入購物車失敗");
        }
    }

    return (<>
    <div className="container theme-dark p-1">
        <div className="row">
            <div className="sidebar col-lg-3 mb-4">
                <ul className="nav d-flex flex-row flex-lg-column justify-content-start overflow-x-auto flex-nowrap">
                    {categories.map(category => {
                        return (
                            <li className="nav-item" key={category}>
                                <a className={`text-description category-link
                                ${selectedCategory === category ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedCategory(category);
                                }} 
                                href="#">{category === 'all' ? '所有產品' : category}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="main col-lg-9">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                    {products?.map((product) => {
                        return (
                            <div className="col" key={product.id}>
                                <div className="productcard">
                                    <div className="card-body">
                                        <img src={product.imageUrl} alt={product.title} />
                                        <p className="productcard-primary h4">{product.title}</p>
                                        <p className="productcard-price">$ {product.price}</p>
                                    </div>
                                    <div className="card-footer">
                                        <Link className="btn btn-view" to={`/product/${product.id}`}>Details</Link>
                                    <button type="btn" className="btn btn-cart" onClick={() => addCart(product.id)}>
                                        <i className="bi bi-cart3"></i>
                                    </button>
                                    
                                    </div>
                                </div>
                            </div>      
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
    </>
    )
};
export default Products;