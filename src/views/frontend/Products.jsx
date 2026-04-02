import { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { getCart } from '../../slice/cartSlice';
import useMessage from '../../hooks/useMessage';
import '../../assets/all.css';
import Pagination from '../../components/Pagination';
import { Circles } from "react-loader-spinner";

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function Products() {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(null);
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
    AOS.init();
  }, [currentPage, selectedCategory, showError]);

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
  }, [showError]);

  const addCart = async (id, qty = 1) => {
    if (isAddingToCart) return;
    setIsAddingToCart(id);

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
    } finally {
      setIsAddingToCart(null);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
    window.scrollTo(0, 0);
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); 
  };

  return (
    <>
      <div className="products-banner mb-5 d-flex flex-column align-items-center justify-content-center">
        <div className="banner-overlay"></div>
        <div className="banner-text-box" data-aos="fade-up">
          <div className="banner-text-box-title">
            {selectedCategory === 'all' ? 'Our Collection' : selectedCategory}
          </div>
          <div className="banner-text-box-text">探索法式甜點的精準工藝</div>
        </div>
      </div>
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
                          disabled={isAddingToCart === product.id}
                          onClick={() => addCart(product.id)}
                        >
                          {isAddingToCart === product.id ? (
                            <Circles
                              height="20" 
                              width="20"   
                              color="#1b263b" 
                              ariaLabel="circles-loading"
                              wrapperClass="loader-wrapper" 
                            />
                            ) : (
                            <i className="bi bi-cart3"></i>
                            )
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="d-flex justify-content-center my-3">
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
