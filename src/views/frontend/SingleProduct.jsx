import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import '../../assets/all.css';



const {VITE_API_BASE, VITE_API_PATH} = import.meta.env;

function SingleProduct() {
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/product/${id}`);
                setProduct(res.data.product);

            } catch (error) {
                console.log(error.response);
            }
        };
        fetchProduct();
    },[id]);

    const addCart = async (id, qty=1) => {
        try {
            const data = {
                product_id: id,
                qty
            }
            const res = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`, {data});
            alert("已加入購物車");
        } catch (error) {
            console.log(error.response);
        }
    };

    return (<>
    <div className="container-lg theme-dark row m-5">
        <div className="col-lg-6">
            <div className="card-body d-flex justify-content-center">
            <p>alt\</p>
            <div className="main-image-container">
                <img className="main-image" src={product.imageUrl} alt={product.title} />
            </div>
            <p>/alt</p>
            </div>
            <div className="card-footer">
                
            </div>
        </div>
        <div className="col-lg-6 content-container">
            <h2 className="heading-primary">{product.title}</h2>
            <p className="text-description">{product.description}</p>
            <div>
                <p className="text-description">{product.content}</p>
                <p className="text-description">單位：{product.unit}</p>
                <p className="text-price h3">NT ${product.price}</p>
            </div>
            <div className="num-control">
                <div className="qty-label">購買數量：</div>
                <div className="qty-control">
                    <button className="btn-qty"
                    onClick={() => setQty(prev => Math.max(1, prev - 1))}
                    disabled={qty <= 1}>-</button>
                    <span className="qty-number">{qty}</span>
                    <button className="btn-qty"
                    onClick={() => setQty(prev => Math.min(10, prev + 1))}
                    disabled={qty >= 10}>+</button>
                </div>
            </div>
            <button className="btn-add-to-cart"
            onClick={() => addCart(product.id, qty)}>Add to Cart</button>
        </div>
    </div>
    </>)
};
export default SingleProduct;