import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useMessage from '../../hooks/useMessage';
import '../../assets/all.css';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function OrderForm() {
  const { showError, showSuccess } = useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axios.get(
          `${VITE_API_BASE}/api/${VITE_API_PATH}/cart`,
        );
        setCart(res.data.data);
      } catch (error) {
        console.error(error.response);
      }
    };
    getCart();
  }, []);

  const onSubmit = async (formData) => {
    // console.log(formData);
    try {
      const data = {
        user: formData,
        message: formData.message,
      };
      await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/order`, {
        data,
      });
      const res2 = await axios.get(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/cart`,
      );
      setCart(res2.data.data);
      showSuccess('訂單已成功提交');
    } catch (error) {
      console.error(error.response);
      showError('提交訂單失敗');
    }
  };

  return (
    <>
      <div className="container-fluid col-md-6 mx-auto">
        <div className="orderForm-title">訂單資訊(Order Info)</div>
        <table className="orderForm-table">
          <thead>
            <tr>
              <th scope="col">商品名稱</th>
              <th scope="col">單價</th>
              <th scope="col">數量</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            {cart?.carts?.map((item) => {
              return (
                <tr key={item.id} className="orderForm-table-body">
                  <th scope="row">{item.product.title}</th>
                  <td>{item.product.price}</td>
                  <td>{item.qty}</td>
                  <td>{item.product.price * item.qty}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th
                scope="row"
                colSpan="2"
                className="text-end orderForm-table-footer"
              >
                總計
              </th>
              <td></td>
              <td className="orderForm-table-footer">{cart.final_total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="container-fluid my-5">
        <form className="col-md-6 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="orderForm-title">顧客資訊(Customer Info)</div>
          <div className="mb-3">
            <label htmlFor="name" className="orderForm-form-label">
              收件者姓名(Name)
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              placeholder="請輸入收件者姓名"
              // defaultValue="姓名(Name)"
              {...register('name', {
                required: '請輸入收件者姓名',
                minLength: {
                  value: 2,
                  message: '姓名至少 2 個字',
                },
              })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="orderForm-form-label">
              聯絡信箱(Email)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="請輸入 E-mail"
              // defaultValue="聯絡信箱(Email)"
              {...register('email', {
                required: '請輸入 E-mail',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email 格式不正確',
                },
              })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="tel" className="orderForm-form-label">
              聯絡電話(Phone)
            </label>
            <input
              id="tel"
              name="tel"
              type="tel"
              className="form-control"
              placeholder="請輸入聯絡電話"
              // defaultValue="聯絡電話(Phone)"
              {...register('tel', {
                required: '請輸入聯絡電話',
                pattern: {
                  value: /^\d+$/,
                  message: '電話僅能輸入數字',
                },
                minLength: {
                  value: 8,
                  message: '電話至少 8 碼',
                },
              })}
            />
            {errors.tel && <p className="text-danger">{errors.tel.message}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="orderForm-form-label">
              收件地址(Adress)
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="form-control"
              placeholder="請輸入收件地址"
              // defaultValue="收件地址(Adress)"
              {...register('address', {
                required: '請輸入收件地址',
              })}
            />
            {errors.address && (
              <p className="text-danger">{errors.address.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="orderForm-form-label">
              留言
            </label>
            <textarea
              id="message"
              className="form-control"
              cols="10"
              rows="5"
              placeholder="若有任何額外需求，請在此輸入"
              // defaultValue="若有任何額外需求，請在此輸入"
              {...register('message')}
            />
          </div>
          <button type="submit" className="btn btn-add-to-cart">
            送出訂單
          </button>
        </form>
      </div>
    </>
  );
}
export default OrderForm;
