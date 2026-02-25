import { useEffect, useState } from 'react';
import '../../assets/all.css';
import axios from 'axios';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/products/all`);
            setProducts(res.data.products);
        })();
    },[])

    return (<>
    <div className="container theme-dark p-1">
        <div className="row">
            <div className="sidebar col-lg-3">
                <ul>
                    <li className="heading-primary">全部產品</li>
                    <li className="text-description">冷藏蛋糕</li>
                    <li className="text-description">常溫蛋糕</li>
                    <li className="text-description">泡芙</li>
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