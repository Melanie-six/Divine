import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { getCart } from '../../slice/cartSlice';
import useMessage from '../../hooks/useMessage';
import '../../assets/all.css';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function SingleProduct() {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const { showError, showSuccess } = useMessage();
  const dispatch = useDispatch();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${VITE_API_BASE}/api/${VITE_API_PATH}/product/${id}`,
        );
        setProduct(res.data.product);
      } catch (error) {
        console.error(error.response);
        showError('獲取產品資訊失敗');
      }
    };
    fetchProduct();
  }, [id]);

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

  return (
    <>
      <div className="container theme-dark py-3">
        <div className="product-layout">
          {/* 左側圖片區 */}
          <div className="product-image-col">
            <div className="image-box">
              <img
                className="main-image-display"
                src={product.imageUrl}
                alt={product.title}
              />
            </div>
          </div>

          {/* 右側資訊區 */}
          <div className="product-info-col">
            <div className="info-box">
              <h2 className="heading-primary">{product.title}</h2>
              <p className="text-description mb-4">{product.description}</p>
              
              <div className="product-details-text">
                <p className="text-description">{product.content}</p>
                <p className="text-description">單位：{product.unit}</p>
                <p className="text-price h3 mt-auto">NT ${product.price}</p>
              </div>

              <div className="num-control mt-4">
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
                onClick={() => addCart(product.id, qty)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SingleProduct;
