import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { getCart } from '../../slice/cartSlice';
import { Circles } from 'react-loader-spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import useMessage from '../../hooks/useMessage';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/all.css';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function SingleProduct() {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(null);
  const { showError, showSuccess } = useMessage();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/product/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error(error.response);
        showError('獲取產品資訊失敗');
      }
    };
    fetchProduct();
    setQty(1);
    window.scrollTo(0, 0);
  }, [id, showError]);

  useEffect(() => {
    if (!product.category) return;
    const fetchRelated = async () => {
      try {
        const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/products/all`);
        const related = res.data.products.filter(
          (p) => p.category === product.category && p.id !== product.id
        );
        setRelatedProducts(related);
      } catch (error) {
        console.error(error.response);
      }
    };
    fetchRelated();
  }, [product.category, product.id]);

  const addCart = async (productId, quantity = 1) => {
    if (isAddingToCart) return;
    setIsAddingToCart(productId);
    try {
      const data = { product_id: productId, qty: quantity };
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

  const renderStars = (stars) => (
    Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`bi ${i < stars ? 'bi-star-fill' : 'bi-star'} star-icon`} />
    ))
  );

  return (
    <>
      <div className="container theme-dark pt-3">
        <nav className="single-breadcrumb" aria-label="breadcrumb">
          <NavLink to="/products">Menu</NavLink>
          <span className="breadcrumb-sep">/</span>
          <span>{product.title}</span>
        </nav>
      </div>

      <div className="container theme-dark py-3">
        <div className="product-layout">
          <div className="product-image-col">
            <div className="image-box">
              <img className="main-image-display" src={product.imageUrl} alt={product.title} />
            </div>
          </div>

          <div className="product-info-col">
            <div className="info-box">
              {product.tags && (
                <div className="product-tags mb-2">
                  <span className="product-tag">{product.tags}</span>
                </div>
              )}

              <h2 className="heading-primary mb-2">{product.title}</h2>

              {product.stars > 0 && (
                <div className="product-stars mb-3">
                  {renderStars(product.stars)}
                  <span className="stars-label">（{product.stars} / 5）</span>
                </div>
              )}

              <p className="text-description mb-4">{product.description}</p>

              {product.content && (
                <div className="storage-info mb-4">
                  <div className="storage-info-title">
                    <i className="bi bi-info-circle me-2"></i>保存與食用說明
                  </div>
                  <p className="storage-info-text">{product.content}</p>
                </div>
              )}

              <div className="product-meta mb-3">
                <p className="text-description mb-1">單位：{product.unit}</p>
                <p className="text-price mt-2">NT ${product.price}</p>
              </div>

              <div className="num-control mt-2">
                <div className="qty-label">購買數量：</div>
                <div className="qty-control">
                  <button
                    className="btn-qty"
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    disabled={qty <= 1}
                  > - </button>
                  <span className="qty-number">{qty}</span>
                  <button
                    className="btn-qty"
                    onClick={() => setQty((prev) => Math.min(10, prev + 1))}
                    disabled={qty >= 10}
                  > + </button>
                </div>
              </div>

              <button
                className="btn-add-to-cart mt-4"
                disabled={isAddingToCart === product.id}
                onClick={() => addCart(product.id, qty)}
              >
                {isAddingToCart === product.id ? (
                  <Circles height="20" width="20" color="#1b263b" ariaLabel="circles-loading" wrapperClass="loading-wrapper" />
                ) : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="recommend-section py-4 mt-4">
          <div className="container">
            <h3 className="recommend-title mb-4">
              同系列商品
              <small className="recommend-subtitle">探索更多 {product.category} 系列</small>
            </h3>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="recommend-swiper"
            >
              {relatedProducts.map((related) => (
                <SwiperSlide key={related.id}>
                  <div className="related-card">
                    <NavLink to={`/product/${related.id}`} className="related-img-link">
                      <img src={related.imageUrl} alt={related.title} />
                    </NavLink>
                    <div className="related-card-body">
                      <div className="recommend-item-title">{related.title}</div>
                      <div className="recommend-item-content text-accent fw-bold mb-3">NT$ {related.price}</div>
                      <div className="related-card-actions">
                        <NavLink to={`/product/${related.id}`} className="related-btn-view">
                          查看詳情
                        </NavLink>
                        <button
                          className="related-btn-cart"
                          disabled={isAddingToCart === related.id}
                          onClick={() => addCart(related.id)}
                        >
                          {isAddingToCart === related.id ? (
                            <Circles height="16" width="16" color="#1b263b" ariaLabel="circles-loading" wrapperClass="loader-wrapper" />
                          ) : (
                            <i className="bi bi-cart3"></i>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProduct;
