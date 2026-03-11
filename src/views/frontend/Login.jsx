import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useMessage from "../../hooks/useMessage";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/all.css'


const {VITE_API_BASE, VITE_API_PATH} = import.meta.env;


function Login() {

    const navigate = useNavigate();
    const { showSuccess } = useMessage();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: "onBlur",
      defaultValues: {
        username: '',
        password: '',
      }
    })

    const onSubmit = async (formData) => {
        try {
            const response = await axios.post(`${VITE_API_BASE}/admin/signin`, formData);
            const {token, expired} = response.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/;`;
            axios.defaults.headers.common['Authorization'] = token;
            navigate('/admin/products');
            showSuccess("登入成功");
        } catch(error) {
            console.log(error.response);
        }
    };

    return (
        <div className="container col-md-4 login">
        <div className="login-title">由此登入</div>
        <form className='form-floating' onSubmit={handleSubmit(onSubmit)}>
          <div className=" mb-3">
            <label htmlFor="username" className="login-form-label">Email address</label>
            <input type="email" className='form-control'
            name='username' placeholder='[ ADMIN ]' 
            {...register('username', {
              required: "請輸入 Email ",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email 格式不正確",
              }
            })}
            />
            
            {errors.username && (<p className="text-danger">{errors.username.message}</p>)}
          </div>
          <div className="">
            <label htmlFor="password" className="login-form-label">Password</label>
            <input type="password" className='form-control'
            name='password' placeholder='[ ・・・・・・ ]'
            {...register('password', {
              required: "請輸入 password ",
              minLength: {
                value: 6,
                message: "密碼長度至少 6 位數",
              }
            })}
            />
            
            {errors.password && (<p className="text-danger">{errors.password.message}</p>)}

          </div>
          <button type='submit' className='btn-add-to-cart mt-3'>登入</button>
        </form></div>
    )
};
export default Login;