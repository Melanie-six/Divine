import { useEffect, useState, useRef } from 'react';
import * as bootstrap from "bootstrap";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../slice/messageSlice';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;


function Modal ({modalType, templateData, isModalOpen, setIsModalOpen, getProducts, currentPage}) {
    const [modalData, setModalData] = useState(templateData);

    const dispatch = useDispatch();

    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    useEffect(() => {
        const modalElement = modalRef.current;
        modalInstance.current = new bootstrap.Modal(modalElement, {
            keyboard: false,
            backdrop: 'static'
        });
        modalElement.addEventListener('hidden.bs.modal', () => {
            setIsModalOpen(false);
        });
        return () => {
            if (modalElement) {
                modalElement.removeEventListener('hidden.bs.modal', () => {
            setIsModalOpen(false);
        });
            }
        }
    }, [setIsModalOpen]);

    const handleModalChange = (e) => {
        const {name, value, checked, type} = e.target;
        setModalData((preData) => ({
        ...preData,
        [name]: type === 'checkbox' ? checked : value,
        }));
    };

        useEffect(() => {
        if (isModalOpen) {
            modalInstance.current.show();
        }
    }, [isModalOpen])

    const handleCloseModal = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        modalInstance.current.hide();
        setIsModalOpen(false);
    };

    const handleImageChange = (index, value) => {
        setModalData((pre) => {
        const newImage = [...pre.imagesUrl];
        newImage[index] = value;

        if (value !== "" && index === newImage.length - 1 && newImage.length < 5) {
            newImage.push("");
        }
        if (value === "" && newImage.length > 1 && newImage[newImage.length - 1] === "") {
            newImage.pop();
        }
        return {
            ...pre,
            imagesUrl: newImage
        };
        });
    };

    const handleAddImage = () => {
        setModalData((pre) => {
        const newImage = [...pre.imagesUrl];
        newImage.push("");
        return {
            ...pre,
            imagesUrl: newImage
        };
        });
    };

    const handleDelImage = () => {
        setModalData((pre) => {
        const newImage = [...pre.imagesUrl];
        newImage.pop();
        return {
            ...pre,
            imagesUrl: newImage
        };
        });
    }; 

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file-to-upload', file);
        try {
            const res = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/admin/upload`, formData);
            const uploadedImageUrl = res.data.imageUrl;
            setModalData({
            ...modalData,
            imageUrl: uploadedImageUrl
            })
        } catch (error) {
            console.error(error.response);
        }
    };

    const updateProduct = async (id) => {
        let url = `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/product`
        let method = 'post'

        if (modalType === 'edit') {
            url = `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/product/${id}`
            method = 'put'
        }
        const productData = {
            data: {
            ...modalData,
            origin_price: Number(modalData.origin_price),
            price: Number(modalData.price),
            is_enabled: modalData.is_enabled ? 1 : 0,
            imagesUrl: [...modalData.imagesUrl.filter((url) => url !== "")],
            },
        };

        try {
            const res = await axios[method](url, productData);
            // console.log(res.data);
            handleCloseModal();
            dispatch(createAsyncMessage(res.data))
            getProducts(currentPage);
        } catch (error) {
            console.error(error.response);
        }
    };

    const delProduct = async (id) => {
        try {
            await axios.delete(`${VITE_API_BASE}/api/${VITE_API_PATH}/admin/product/${id}`);
            getProducts();
            handleCloseModal();
        } catch (error) {
            console.error(error.response);
        }
    }; 

    return (
        <div id='productModal' className="modal" tabIndex="-1" ref={modalRef}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                <div className={`modal-header bg-${modalType === 'del' ? 'danger' : 
                    modalType === 'edit' ? 'primary' : 'success'} text-white`}>
                    <h3 className="modal-title">{modalType === 'del' ? '刪除' :
                    modalType === 'edit' ? '編輯' : '新增' }產品</h3>
                    <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {modalType === 'del' ? (<>
                    <p>確定要刪除<span className='text-danger'>{modalData.title}</span>嗎？</p>
                    </>) : (<>
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                        <div className="mb-5">
                            <label htmlFor="fileInput" className="form-label"> 圖片上傳 </label>
                            <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="form-control"
                            id="fileInput"
                            onChange={(e) => handleFileChange(e)}
                            />
                        </div>

                        <div className="mb-4">
                            <h4>上傳圖片</h4>
                            <label 
                            htmlFor="imageUrl" 
                            className="form-label">輸入圖片網址</label>
                            <input 
                            name='imageUrl'
                            type="text" 
                            id="imageUrl" 
                            className="form-control" 
                            placeholder="請輸入圖片連結"
                            value={modalData.imageUrl}
                            onChange={(e) => handleModalChange(e)} />
                            {
                            modalData.imageUrl && (
                                <img 
                                src={modalData.imageUrl} 
                                alt="主圖" 
                                className='img-fluid' />
                            )
                            }
                        </div>
                        <div>
                            {
                            modalData.imagesUrl.map((url, index) => (
                                <div key={index}>
                                <label 
                                    htmlFor="imageUrl" 
                                    className="form-label">輸入圖片網址</label>
                                <input 
                                    name='imageUrl'
                                    type="text" 
                                    id="imageUrl" 
                                    className="form-control" 
                                    placeholder={`圖片連結${index + 1}`}
                                    value={url}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    />
                                {
                                    url && (
                                    <img
                                    className='img-fluid'
                                    src={url}
                                    alt={`副圖${index + 1}`} />
                                    )
                                }
                                </div>
                            ))
                            }
                        </div>
                        <div>
                            <button className='btn btn-outline-primary btn-sm d-block w-100 my-2'
                            onClick={handleAddImage}>新增圖片</button>
                        </div>
                        <div>
                            <button className='btn btn-outline-danger btn-sm d-block w-100'
                            onClick={handleDelImage}>刪除圖片</button>
                        </div>
                        </div>

                        <div className="col-8">
                        <h4>產品資訊</h4>
                        <div className="mb-3">
                            <label 
                            htmlFor="title" 
                            className="form-label">產品名稱</label>
                            <input 
                            name='title'
                            type="text" 
                            id="titlle" 
                            className="form-control" 
                            placeholder="請輸入產品名稱"
                            value={modalData.title}
                            onChange={(e) => handleModalChange(e)} />
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                            <label 
                                htmlFor="category" 
                                className="form-label">分類</label>
                            <input 
                                name='category'
                                type="text" 
                                id="category" 
                                className="form-control" 
                                placeholder="請輸入分類"
                                value={modalData.category}
                                onChange={(e) => handleModalChange(e)} />
                            </div>
                            <div className="mb-3 col-md-6">
                            <label 
                                htmlFor="unit" 
                                className="form-label">單位</label>
                            <input 
                                name='unit'
                                type="text" 
                                id="unit" 
                                className="form-control" 
                                placeholder="請輸入單位"
                                value={modalData.unit}
                                onChange={(e) => handleModalChange(e)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                            <label 
                                htmlFor="origin_price" 
                                className="form-label">原價</label>
                            <input 
                                name='origin_price'
                                type="number"
                                min="0"
                                id="origin_price" 
                                className="form-control" 
                                placeholder="請輸入原始價格"
                                value={modalData.origin_price}
                                onChange={(e) => handleModalChange(e)} />
                            </div>
                            <div className="mb-3 col-md-6">
                            <label 
                                htmlFor="price" 
                                className="form-label">售價</label>
                            <input 
                                name='price'
                                type="number"
                                min="0"
                                id="price" 
                                className="form-control" 
                                placeholder="請輸入售價"
                                value={modalData.price}
                                onChange={(e) => handleModalChange(e)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label htmlFor="stars" className='form-label'>評分(Stars)</label>
                                <input type="number"
                                className='form-control'
                                id='stars'
                                name='stars'
                                value={modalData.stars || 0}
                                onChange={(e) => handleModalChange(e)} />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="tags" className='form-label'>標籤</label>
                                <input type="text"
                                className='form-control'
                                id='tags'
                                name='tags'
                                placeholder="例如：熱銷, 草莓季"
                                value={modalData.tags || ""}
                                onChange={(e) => handleModalChange(e)}  />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label 
                            htmlFor="description" 
                            className="form-label">商品描述</label>
                            <textarea 
                            name='description'
                            rows={3} 
                            id="description" 
                            className="form-control" 
                            placeholder="請輸入商品描述"
                            value={modalData.description}
                            onChange={(e) => handleModalChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label 
                            htmlFor="content" 
                            className="form-label">內容說明</label>
                            <textarea 
                            name='content'
                            rows={3} 
                            id="content" 
                            className="form-control" 
                            placeholder="請輸入內容說明"
                            value={modalData.content}
                            onChange={(e) => handleModalChange(e)} />
                        </div>
                        
                        <div className="mb-3 col-3">
                            <div className="form-check ms-2">
                            <input 
                                name='is_enabled'
                                type="checkbox" 
                                id="is_enabled" 
                                className="form-check-input" 
                                checked={modalData.is_enabled}
                                onChange={(e) => handleModalChange(e)} />
                            <label 
                                htmlFor="is_enabled" 
                                className="form-check-label">是否啟用</label>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    </div>
                    </>) }
                    
                </div>
                <div className="modal-footer">
                    {modalType === 'del' ? (<>
                    <button type="button" className="btn btn-danger" onClick={() => delProduct(modalData.id)}>確定刪除</button>
                    </>) : (<>
                    <button type="button" className="btn btn-primary" onClick={() => updateProduct(modalData.id)}>儲存</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>取消</button>
                    </>) }
                    
                </div>
                </div>
            </div>
        </div>
    )
}
export default Modal;