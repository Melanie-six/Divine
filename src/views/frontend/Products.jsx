import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { getCart } from '../../slice/cartSlice';
import useMessage from '../../hooks/useMessage';
import '../../assets/all.css';
import Pagination from '../../components/Pagination';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function Products() {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { showError, showSuccess } = useMessage();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${VITE_API_BASE}/api/${VITE_API_PATH}/products`,
          {
            params: {
              page: currentPage,
              category: selectedCategory === 'all' ? undefined : selectedCategory,
            },
          },
        );
        setProducts(res.data.products);
        setPageInfo(res.data.pagination);
      } catch (error) {
        console.error(error.response);
        showError('獲取產品資訊失敗');
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(
          `${VITE_API_BASE}/api/${VITE_API_PATH}/products/all`,
        );
        const result = [
          'all',
          ...new Set(res.data.products.map((product) => product.category)),
        ];
        setCategories(result);
      } catch (error) {
        console.error(error.response);
        showError('獲取產品類別失敗');
      }
    };
    getAllProducts();
  }, []);

  const addCart = async (id, qty = 1) => {
    try {
      const data = {
        product_id: id,
        qty,
      };
      await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`, { data });
      showSuccess('已加入購物車');
      dispatch(getCart());
    } catch (error) {
      console.error(error.response);
      showError('加入購物車失敗');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // 觸發第一個 useEffect 抓取資料
    window.scrollTo(0, 0);
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 切換分類時，務必重設為第一頁
  };

  return (
    <>
      <div className="container theme-dark">
        <div className="row">
          <div className="sidebar col-lg-3 mb-4">
            <ul className="nav d-flex flex-row flex-lg-column justify-content-start overflow-x-auto flex-nowrap">
              {categories.map((category) => {
                return (
                  <li className="nav-item" key={category}>
                    <a
                      className={`text-description category-link
                                ${selectedCategory === category ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryChange(category);
                      }}
                      href="#"
                    >
                      {category === 'all' ? '所有產品' : category}
                    </a>
                  </li>
                );
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
                        <p className="productcard-primary h4">
                          {product.title}
                        </p>
                        <p className="productcard-price">$ {product.price}</p>
                      </div>
                      <div className="card-footer">
                        <Link
                          className="btn-view"
                          to={`/product/${product.id}`}
                        >
                          Details
                        </Link>
                        <button
                          type="button"
                          className="btn-cart"
                          onClick={() => addCart(product.id)}
                        >
                          <i className="bi bi-cart3"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Pagination
                pageInfo={pageInfo}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Products;
