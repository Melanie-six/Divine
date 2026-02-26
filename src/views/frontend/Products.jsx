import { useEffect, useState } from 'react';
import '../../assets/all.css';
import axios from 'axios';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function Products() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/products/all`);
                const result = [
                    'all',
                    ...new Set(res.data.products.map((product) => product.category))
                ];
                setCategories(result);
                console.log(result);
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

    return (<>
    <div className="container theme-dark p-1">
        <div className="row">
            <div className="sidebar col-lg-3">
                <ul className="nav flex-column">
                    {categories.map(category => {
                        return (
                            <li className="nav-item" key={category}>
                                <a className={`text-description
                                ${selectedCategory === category ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedCategory(category);
                                }} 
                                href="#">{category}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="main col-lg-9">
                <div className="row row-cols-1 row-cols-md-3 g-3">
                    {products?.map((product) => {
                        return (
                            <div className="productcard col-3" key={product.id}>
                                <img src={product.imageUrl} alt={product.title} />
                                <p className="productcard-primary h4">{product.title}</p>
                                <p className="productcard-price">$ {product.price}</p>
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