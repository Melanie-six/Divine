import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as bootstrap from "bootstrap";
import { current } from "@reduxjs/toolkit";
import useMessage from "../hooks/useMessage";
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;




function OrderModal ({modalType, templateData, isModalOpen, setIsModalOpen, getOrders, currentPage}) {
    const [modalData, setModalData] = useState(templateData);
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    const { showError, showSuccess } = useMessage();


    useEffect(() => {
        setModalData({
            ...templateData,
        })
    }, [templateData]);

    useEffect(() => {
        modalInstance.current = new bootstrap.Modal(modalRef.current, {
            keyboard: false,
            backdrop: 'static'
        });
        const handleHidden = () => {
            setIsModalOpen(false);
        }
        const currentRef = modalRef.current;
        currentRef.addEventListener('hidden.bs.modal', handleHidden);

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('hidden.bs.modal', handleHidden);
            }
            if (modalInstance.current) {
                modalInstance.current.dispose();
            }
        };
    }, [setIsModalOpen]);

    const handleModalChange = (e) => {
        const {name, value, checked, type} = e.target;
        const userFields = ['name', 'email', 'tel', 'address'];
        if (userFields.includes(name)) {
            setModalData((prevData) => ({
                ...prevData,
                user: {
                    ...prevData.user,
                    [name]: type === 'checkbox' ? checked : value,
                }
            }))
        } else {
            setModalData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }))
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            modalInstance.current.show();
        } else {
            modalInstance.current.hide();
        }
    }, [isModalOpen]);

    const handleCloseModal = () => {
        modalInstance.current.hide();
    };

    const updateOrder = async (id) => {
        let url = `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/orders`
        let method = 'get'

        if (modalType === 'edit') {
            url = `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/order/${id}`
            method = 'put'
        }
        const orderData = {
            data: {
            ...modalData,
            },
        };

        try {
            const res = await axios[method](url, orderData);
            console.log(res.data);
            modalInstance.current.hide();
            handleCloseModal();
            dispatch(createAsyncMessage(res.data))
            getOrders(currentPage);
            showSuccess('訂單更新成功');
        } catch (error) {
            console.log(error.response);
            showError('訂單更新失敗')
        }
    };
    const delOrder = async (id) => {
        try {
            const res = await axios.delete(`${VITE_API_BASE}/api/${VITE_API_PATH}/admin/order/${id}`);
            console.log(res.data);
            getOrders(currentPage);
            handleCloseModal();
            showSuccess('訂單刪除成功');
        } catch (error) {
            console.log(error.response);
            showError('訂單刪除失敗')
        }
    }; 

    return (
        <div className="modal" tabIndex="-1" ref={modalRef}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{modalType === 'del' ? '刪除訂單' : '訂單詳細資料' }</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {modalType === 'del' ? (<>
                    <p>確定要刪除<span className='text-danger'>{modalData.create_at}</span>這筆訂單嗎？</p>
                    </>) : (<>
                    <div className="mb-3">訂單編號：{modalData.create_at}</div>
                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label 
                                htmlFor="customerName" 
                                className="form-label">顧客名稱</label>
                            <input 
                                name='name'
                                type="text" 
                                id="customerName" 
                                className="form-control" 
                                value={modalData.user.name}
                                onChange={(e) => handleModalChange(e)} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label 
                                htmlFor="customerTel" 
                                className="form-label">顧客電話</label>
                            <input 
                                name='tel'
                                type="tel" 
                                id="customerTel" 
                                className="form-control" 
                                value={modalData.user.tel}
                                onChange={(e) => handleModalChange(e)} />
                        </div> 
                    </div>
                    
                    <div className="mb-3">
                        <label 
                            htmlFor="customerEmail" 
                            className="form-label">顧客信箱</label>
                        <input 
                            name='email'
                            type="text" 
                            id="customerEmail" 
                            className="form-control" 
                            value={modalData.user.email}
                            onChange={(e) => handleModalChange(e)} />
                    </div>
                    
                    <div className="mb-3">
                        <label 
                            htmlFor="customerAddress" 
                            className="form-label">顧客地址</label>
                        <input 
                            name='address'
                            type="text" 
                            id="customerAddress" 
                            className="form-control" 
                            value={modalData.user.address}
                            onChange={(e) => handleModalChange(e)} />
                    </div> 
                    <div className="mb-3">
                        <label 
                            htmlFor="customerMessage" 
                            className="form-label">顧客留言</label>
                        <input 
                            name='message'
                            type="text" 
                            id="customerMessage" 
                            className="form-control" 
                            value={modalData.message}
                            onChange={(e) => handleModalChange(e)} />
                    </div>
                    <div className="mb-3 table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>產品名稱</th>
                                    <th>產品分類</th>
                                    <th>數量</th>
                                    <th>小計</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modalData.products && Object.values(modalData.products).map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.product?.title}</td>
                                        <td>{item.product?.category}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.final_total}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="3" className="text-end">訂單總金額</th>
                                    <th>{modalData.total}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div> 
                    </>)}              
                </div>
                <div className="modal-footer">
                    {modalType === 'del' ? (<>
                    <button type="button" className="btn btn-danger" onClick={() => delOrder(modalData.id)}>確定刪除</button>
                    </>) : (<>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>取消</button>
                    <button type="button" className="btn btn-primary" onClick={() => updateOrder(modalData.id)}>儲存訂單變更</button>
                    </>) }
                    
                </div>
                </div>
            </div>
        </div>
    )
}

export default OrderModal;