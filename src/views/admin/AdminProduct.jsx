import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import useMessage from '../../hooks/useMessage';
import '../../assets/all.css';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

const Initial_Template_Data = {
  id: '',
  title: '',
  category: '',
  origin_price: '',
  price: '',
  unit: '',
  description: '',
  content: '',
  is_enabled: false,
  imageUrl: '',
  imagesUrl: [],
  stars: 5,
  tags: '',
};

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [templateData, setTemplateData] = useState(Initial_Template_Data);
  const [modalType, setModalType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const dispatch = useDispatch();
  const { showError, showSuccess } = useMessage();

  const handleOpenModal = (type, product) => {
    setModalType(type);
    setTemplateData((pre) => ({
      ...pre,
      ...product,
    }));
    setIsModalOpen(true);
  };

  const getProducts = useCallback(
    async (page = 1) => {
      try {
        const res = await axios.get(
          `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/products?page=${page}`,
        );
        setProducts(Object.values(res.data.products));
        setPageInfo(res.data.pagination);
        showSuccess('產品列表載入成功');
      } catch (error) {
        console.error(error.response);
        // dispatch(createAsyncMessage(error.response.data));
        showError(error.response.data.message);
      }
    },
    [showSuccess, showError],
  );

  useEffect(() => {
    const getProductsOnInit = async () => {
      try {
        const res = await axios.get(
          `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/products?page=1`,
        );
        setProducts(Object.values(res.data.products));
        setPageInfo(res.data.pagination);
        showSuccess('產品列表載入成功');
      } catch (error) {
        console.error(error);
        showError('產品列表載入失敗');
      }
    };
    getProductsOnInit();
  }, []);

  const handlePageChange = (page) => {
    getProducts(page);
  };

  return (
    <>
      <div className="container">
        <div className="col-md-12 my-3">
          <div className="adminProduct-title">產品管理</div>
          <div className="d-flex flex-row-reverse me-5">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => handleOpenModal('create', Initial_Template_Data)}
            >
              新增產品
            </button>
          </div>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>分類</th>
                <th>產品名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th>標籤</th>
                <th>評分</th>
                <th>是否啟用</th>
                <th>產品異動</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.category}</td>
                  <td>{item.title}</td>
                  <td>{item.origin_price}</td>
                  <td>{item.price}</td>
                  <td>{item.tags || <span className="text-muted">無</span>}</td>
                  <td>
                    {item.stars || '---'}
                    <span className="text-warning">★</span>
                  </td>
                  <td>
                    <span
                      className={
                        item.is_enabled ? 'text-success' : 'text-secondary'
                      }
                    >
                      {item.is_enabled ? '啟用' : '未啟用'}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary me-3 btn-sm"
                      onClick={() => handleOpenModal('edit', item)}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleOpenModal('del', item)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
        </div>
      </div>
      <Modal
        modalType={modalType}
        templateData={templateData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        getProducts={getProducts}
        currentPage={pageInfo.current_page || 1}
      />
    </>
  );
}
export default AdminProduct;
