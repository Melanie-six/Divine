import { useEffect, useState, useCallback } from 'react';
import { NavLink } from 'react-router';
import { Circles } from 'react-loader-spinner';
import useMessage from '../../hooks/useMessage';
import axios from 'axios';
import '../../assets/payment.css';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function Payment() {
  const [orderlist, setOrderlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [payingId, setPayingId] = useState(null);
  const { showError, showSuccess } = useMessage();

  const getOrderList = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/orders`);
      const sorted = [...res.data.orders].sort((a, b) => {
        if (a.is_paid !== b.is_paid) return a.is_paid ? 1 : -1;
        return b.create_at - a.create_at;
      });
      setOrderlist(sorted);
    } catch (error) {
      console.error(error.response);
      showError('獲取訂單資訊失敗');
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    getOrderList();
  }, [getOrderList]);

  const payOrder = async (orderId) => {
    setPayingId(orderId);
    try {
      await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/pay/${orderId}`, {
        is_paid: true,
      });
      showSuccess('付款成功！感謝您的訂購');
      getOrderList();
    } catch (error) {
      console.error(error.response);
      showError('付款失敗');
    } finally {
      setPayingId(null);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const formatOrderId = (id) => `#${id.slice(-8).toUpperCase()}`;

  const formatDate = (timestamp) =>
    new Date(timestamp * 1000).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

  const countItems = (products) =>
    Object.values(products || {}).reduce((acc, item) => acc + item.qty, 0);

  if (isLoading) {
    return (
      <div className="container order-loading">
        <Circles height="60" width="60" color="#d4af37" ariaLabel="loading" />
      </div>
    );
  }

  if (orderlist.length === 0) {
    return (
      <div className="container">
        <div className="payment-title">我的訂單</div>
        <div className="order-empty-box">
          <i className="bi bi-bag-x order-empty-icon"></i>
          <p className="order-empty-text">目前還沒有任何訂單</p>
          <NavLink to="/products" className="btn-add-to-cart order-empty-btn">
            去逛逛
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="payment-title">我的訂單</div>
      <div className="order-list">
        {orderlist.map((order) => {
          const isExpanded = expandedId === order.id;
          const itemCount = countItems(order.products);
          return (
            <div
              key={order.id}
              className={`order-card ${order.is_paid ? 'order-card--paid' : 'order-card--unpaid'}`}
            >
              <div
                className="order-card-header"
                onClick={() => toggleExpand(order.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleExpand(order.id)}
              >
                <div className="order-header-left">
                  <span className={`order-status-badge ${order.is_paid ? 'badge--paid' : 'badge--unpaid'}`}>
                    {order.is_paid ? '已付款' : '待付款'}
                  </span>
                  <span className="order-id">{formatOrderId(order.id)}</span>
                  <span className="order-date text-color-white">{formatDate(order.create_at)}</span>
                </div>
                <div className="order-header-right">
                  <span className="order-summary">
                    {order.user.name}・共 {itemCount} 件・
                    <span className="order-total-amount">NT$ {order.total}</span>
                  </span>
                  <i className={`bi ${isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'} order-chevron`} />
                </div>
              </div>

              {isExpanded && (
                <div className="order-card-body">
                  <div className="order-items">
                    {Object.values(order.products || {}).map((item) => (
                      <div key={item.id} className="order-item">
                        <img
                          className="order-item-img"
                          src={item.product?.imageUrl}
                          alt={item.product?.title}
                        />
                        <div className="order-item-info">
                          <div className="order-item-name">{item.product?.title}</div>
                          <div className="order-item-category text-color-white">{item.product?.category}</div>
                        </div>
                        <div className="order-item-qty">x {item.qty}</div>
                        <div className="order-item-price">NT$ {item.final_total}</div>
                      </div>
                    ))}
                  </div>
                  <div className="order-card-footer">
                    <div className="order-footer-total text-color-white">
                      訂單總計：<span className="order-total-amount">NT$ {order.total}</span>
                    </div>
                    {!order.is_paid && (
                      <button
                        className="btn-pay-order"
                        disabled={payingId === order.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          payOrder(order.id);
                        }}
                      >
                        {payingId === order.id ? (
                          <Circles height="20" width="20" color="#1b263b" ariaLabel="paying" wrapperClass="loading-wrapper" />
                        ) : '立即付款'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Payment;
