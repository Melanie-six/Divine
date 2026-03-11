import { useEffect, useState } from "react";
import useMessage from "../../hooks/useMessage";
import axios from "axios";
import '../../assets/all.css';


const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function Payment() {
    const [orderlist, setOrderlist] = useState([]);
    const { showError, showSuccess } = useMessage();

    const getOrderList = async () => {
        try {
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/orders`);
            setOrderlist(res.data.orders);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getOrderList();
    },[]);

    const payOrder = async (orderId) => {
        try {
            const res = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/pay/${orderId}`, {
                is_paid: true
            });
            showSuccess("付款成功");
            getOrderList();
        } catch (error) {
            showError("付款失敗");
        }
    };

    return (<>
        <div className="container">
            <div className="payment-title">訂單管理</div>
            <table className="payment-table">
                <thead >
                    <tr className="table-header">
                        <th>訂單編號</th>
                        <th>建立時間</th>
                        <th>顧客名稱</th>
                        <th>訂單金額</th>
                        <th>付款狀態</th>
                        <th>編輯</th>
                    </tr>
                </thead>
                <tbody >
                    {orderlist.map((order) => {
                        return (
                            <tr key={order.id} className="table-body">
                                <td>{order.create_at}</td>
                            <td>{new Date(order.create_at * 1000).toLocaleDateString()}</td>
                            <td>{order.user.name}</td>
                            <td>{order.total}</td>
                            <td>
                                <span className={order.is_paid ? 'text-success' : 'text-danger'}>
                                {order.is_paid ? "已付款" : "未付款"}</span></td>
                            <td>
                                <button type='button' className='btn-add-to-cart' onClick={() => payOrder(order.id)}>付款去</button>
                                {/* <button type='button' className='btn btn-danger btn-sm' onClick={() => handleOpenModal("del", order)}>刪除訂單</button> */}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot className="p-3">
                    {/* <tr className="h5 my-3">
                        <th colSpan="4" className="text-end"><strong>結帳總金額：</strong></th>
                        <th className="text-danger">{cart.final_total}</th>
                        <th><Link to="/order" className="btn btn-add-to-cart">結帳去</Link></th>
                    </tr> */}
                </tfoot>
            </table>
        </div>    
    </>)
}
export default Payment;