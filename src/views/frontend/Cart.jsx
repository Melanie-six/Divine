import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../slice/cartSlice';
import useMessage from '../../hooks/useMessage';
import '../../assets/all.css';
import { Circles } from "react-loader-spinner";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const { showError, showSuccess } = useMessage();
  const [isDeleting, setIsDeleting] = useState(null);
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/products/all`);
        setAllProducts(res.data.products);
      } catch (error) {
        console.error(error.response);
        showError('獲取產品資訊失敗');
      }
    };
    fetchAllProducts();
    dispatch(getCart());
  }, [dispatch, showError]);
  const recommendedProducts = allProducts.filter(
    (product) => !cart?.carts?.some((cartItem) => cartItem.product_id === product.id)
  );

  const updateQty = async (cartId, productId, qty = 1) => {
    if (qty < 1 || qty > 10) return;
    try {
      const data = {
        product_id: productId,
        qty,
      };
      await axios.put(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${cartId}`, {
        data,
      });
      dispatch(getCart());
      showSuccess('已更新商品數量');
    } catch (error) {
      console.error(error.response);
      showError('更新商品數量失敗');
    }
  };

  const deleteQty = async (cartId) => {
    if (isDeleting === cartId) return;
    setIsDeleting(cartId);
    try {
      await axios.delete(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${cartId}`,
      );
      dispatch(getCart());
      showSuccess('已刪除商品');
    } catch (error) {
      console.error(error.response);
      showError('刪除商品失敗');
    } finally {
      setIsDeleting(null);
    }
  };

  return (<>
    
      <>
      <div className="container mb-3 d-flex justify-content-between">
        <div className="cart-title">購物車</div>
      </div>
      <div className="container">
        { cart?.carts?.length > 0 ? (
        <table className="cart-table">
          <thead>
            <tr className="table-header">
              <th>產品圖示</th>
              <th>產品名稱</th>
              <th>價格</th>
              <th>數量</th>
              <th>小計</th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            {cart?.carts?.map((item) => {
              return (
                <tr key={item.id} className="table-body">
                  <td>
                    <img
                      className="cart-img"
                      src={item.product.imageUrl}
                      alt={item.product.title}
                    />
                  </td>
                  <td>{item.product.title}</td>
                  <td>NT$ {item.product.price}</td>
                  <td>
                    <div className="qty-control">
                      <button
                        className="btn-qty"
                        onClick={() =>
                          updateQty(item.id, item.product.id, item.qty - 1)
                        }
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span className="qty-number">{item.qty}</span>
                      <button
                        className="btn-qty"
                        onClick={() =>
                          updateQty(item.id, item.product.id, item.qty + 1)
                        }
                        disabled={item.qty >= 10}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>NT$ {item.final_total}</td>
                  <td>
                    <button
                      className="btn-del-qty"
                      disabled={isDeleting === item.id}
                      onClick={() => deleteQty(item.id)}
                    >
                      {isDeleting === item.id ? (
                        <Circles
                          height="20" 
                          width="20" 
                          color="#1b263b" 
                          ariaLabel="circles-loading"
                          wrapperClass="loading-wrapper" 
                        />
                        ) : (<i className="bi bi-trash3-fill"></i>)
                      }
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="p-3">
            <tr className="my-3">
              <th colSpan="4" className="final-total">
                結帳總金額：
                <span className="text-accent">${cart.final_total}</span>
              </th>
              <th colSpan="2">
                <Link to="/order" className="btn-add-to-cart mx-1">
                  結帳去
                </Link>
              </th>
            </tr>
          </tfoot>
        </table>
        ) : (
          <div className=" d-flex justify-content-center flex-column align-items-center">
            <img
              className="empty-cart"
              src="https://plus.unsplash.com/premium_photo-1681487985079-b299ac8ba1df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FydHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Empty cart"
            />
            <div>購物車空空如也，趕緊去把喜歡的甜點帶回家吧！</div>
            <div><Link className="btn-add-to-cart my-3" to="/products">去逛逛</Link></div>
          </div>
        )}
      </div>
      {recommendedProducts.length > 0 && (
        <div className="recommend-section py-4 mt-5">
          <div className="container">
            <h3 className="recommend-title mb-4" data-aos="fade-up">
              You Might Also Like
              <small className="recommend-subtitle">為您的甜點時光增添更多驚喜</small>
            </h3>
            
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
              className="recommend-swiper"
              data-aos="fade-up"
            >
              {recommendedProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <Link to={`/product/${product.id}`} className="recommend-card">
                    <div className="img-wrapper">
                      <img src={product.imageUrl} alt={product.title} />
                    </div>
                    <div className="p-3 text-center">
                      <div className="recommend-item-title">{product.title}</div>
                      <div className="text-accent fw-bold">NT$ {product.price}</div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  </>  
  );
}
export default Cart;
