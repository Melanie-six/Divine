import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../assets/all.css';


const {VITE_API_BASE, VITE_API_PATH} = import.meta.env;



function Cart() {

    const [cart, setCart] = useState([]);

    const getCart = async () => {
        try {
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCart(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getCart();
    },[]);

    const updateQty = async (cartId, productId, qty=1) => {
        if (qty < 1 || qty > 10) return;
        try {
            const data ={
                product_id: productId,
                qty
            }
            const res = await axios.put(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${cartId}`, {data});
            const res2 = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCart(res2.data.data);
        } catch (error) {
            console.log(error.response)
        };
    };

    const deleteQty = async (cartId) => {
        try {
            const res = await axios.delete(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${cartId}`);
            const res2 = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCart(res2.data.data);
        } catch (error) {
            console.log(error.response)
        }
    };


    return (<>
        <div className="container mb-3 d-flex justify-content-between">
            <h2>購物車</h2>
            <div>
                {/* <button className="btn btn-outline-danger me-3">清空購物車</button> */}
            </div>
        </div>
        <div className="container">
            <table className="cart-table">
                <thead >
                    <tr className="table-header">
                        <th>產品圖示</th>
                        <th>產品名稱</th>
                        <th>價格</th>
                        <th>數量</th>
                        <th>小計</th>
                        <th>刪除</th>
                    </tr>
                </thead>
                <tbody >
                    { cart?.carts?.map(item => {
                        return (
                            <tr key={item.id} className="table-body">
                                <td ><img className="cart-img" src={item.product.imageUrl} alt={item.product.title} /></td>
                                <td>{item.product.title}</td>
                                <td>NT$ {item.product.price}</td>
                                <td>
                                    <div className="qty-control">
                                        <button className="btn-qty"
                                        onClick={() => updateQty(item.id, item.product.id, item.qty - 1)}
                                            disabled={item.qty <= 1}
                                            >-</button>
                                        <span className="qty-number">{item.qty}</span>
                                        <button className="btn-qty"
                                        onClick={() => updateQty(item.id, item.product.id, item.qty + 1)}
                                            disabled={item.qty >= 10}
                                            >+</button>
                                    </div>
                                </td>
                                <td>NT$ {item.final_total}</td>
                                <td>
                                    <button className="btn btn-del-qty" 
                                        onClick={() => deleteQty(item.id)}>
                                        <i className="bi bi-trash3-fill">
                                        </i>
                                    </button>
                                </td>
                            </tr>
                        )})}
                </tbody>
                <tfoot>
                    <tr className="h5">
                        <th colSpan="4" className="text-end"><strong>結帳總金額：</strong></th>
                        <th className="text-danger">{cart.final_total}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </>)
};
export default Cart;