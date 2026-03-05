import axios from "axios";
import { useEffect, useState } from "react";
import useMessage from "../../hooks/useMessage";
import Pagination from "../../components/Pagination";
import OrderModal from "../../components/OrderModal";

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

const Initial_Template_Data = {
  id: "",
  create_at: "",
  is_paid: false,
  message: "",
  products: [],
  user: {
    address: "",
    email: "",
    name: "",
    tel: ""
  },
}


function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [templateData, setTemplateData] = useState(Initial_Template_Data);
    const [modalType, setModalType] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { showError, showSuccess } = useMessage();

    const handlePageChange = (page) => {
        getOrders(page);
    };

    const handleOpenModal = (type, product) => {
        setModalType(type);
        setTemplateData((pre) => ({
        ...pre,
        ...product,
        }));
        setIsModalOpen(true);
    };

    useEffect(() => {
        getOrders();
    },[]);

    const getOrders = async (page = 1) => {
        try {
        const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/admin/orders?page=${page}`);
        setOrders(res.data.orders);
        console.log(res.data.orders);
        showSuccess("訂單列表載入成功");
        setPageInfo(res.data.pagination);
        } catch (error) {
            console.log(error.response);
            showError(error.response.data.message)
        }
    };
    return (
        <>
        <div className="container">
            <div className="col-md-12 my-3">
            <h2>訂單管理</h2>
            <div className='d-flex flex-row-reverse me-5 my-3'>
                <button type='button' className='btn btn-danger'
                >刪除所有訂單</button>
            </div>
            <table className='table table-hover table-striped'>
                <thead>
                <tr>
                    <th>訂單編號</th>
                    <th>建立時間</th>
                    <th>顧客名稱</th>
                    <th>訂單金額</th>
                    <th>付款狀態</th>
                    <th>編輯</th>
                </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        return (
                            <tr key={order.id}>
                                <td>{order.create_at}</td>
                            <td>{new Date(order.create_at * 1000).toLocaleDateString()}</td>
                            <td>{order.user.name}</td>
                            <td>{order.total}</td>
                            <td>
                                <span className={order.is_paid ? 'text-success' : 'text-danger'}>
                                {order.is_paid ? "已付款" : "未付款"}</span></td>
                            <td>
                                <button type='button' className='btn btn-primary me-3 btn-sm' onClick={() => handleOpenModal("edit", order)}>查看編輯訂單</button>
                                <button type='button' className='btn btn-danger btn-sm' onClick={() => handleOpenModal("del", order)}>刪除訂單</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />

            </div>
        </div>
        <OrderModal modalType={modalType} templateData={templateData} 
        isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} 
        getOrders={getOrders} currentPage={pageInfo.current_page || 1} />
        </>
    )
};
export default AdminOrder;