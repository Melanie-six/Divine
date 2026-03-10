import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import { use, useEffect, useState } from 'react';
import '../../assets/home.css'
import { Link } from 'react-router';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;


function Home() {
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/products/all`);
            setProducts(res.data.products);
            console.log(chouxProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getProducts();
    },[]);
    const chouxProducts = products.filter(item => item.category === '泡芙');


    return (
        <div className="container">
            <div className="banner mb-3">
                <div className="main-title">Divine</div>
                <div className="subtitle">Handcrafted French Pâtisserie</div>
                <p>在精準與感性之間，
                    誕生每一顆值得被細細品味的甜點。</p>
                <Link to="/products" type="button" className='home-btn'>Explore the Collection</Link>
            </div>
            <div className="philosophy mb-3 d-flex">
                <div className="philosophy-left">
                    <div className="philosophy-title">A Modern Interpretation of French Pâtisserie</div>
                    <div className='content'>Divine 專注於法式泡芙甜點的創作，
                        以精準工藝與細膩風味，呈現經典法式甜點的現代詮釋。
                        從麵糊比例到奶油質地，
                        每一道細節都經過耐心調整與反覆測試。</div>
                </div>
                <div className="philosophy-right">
                    <div className="content-right">因為我們相信</div>
                    <div className="philosophy-title-right">
                        <span className="mark">“</span>
                        「真正的美味，來自於對細節的尊重。」
                        <span className="mark">“</span>
                    </div>  
                </div>
            </div>
            <div className="signature mb-3">
                <div className="signature-title">Signature Choux Creations</div>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    // navigation
                    pagination={{ clickable: true }}
                    breakpoints={{ 
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    className="mySwiper"
                >
                    {chouxProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="card">
                                <img className="card-img" src={product.imageUrl} alt={product.title} />
                                <div className="card-content">
                                    <div className="card-title">{product.title}</div>
                                    <Link to={`/products/${product.id}`} className="card-btn">View Details</Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="artisan mb-3">
                <div className="artisan-container">
                <img className="img-large" src="https://plus.unsplash.com/premium_photo-1764355177633-7a0755aab91c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFraW5nJTIwZWNsYWlyc3xlbnwwfHwwfHx8MA%3D%3D" alt="泡芙" />
                <img className="img-small" src="https://images.unsplash.com/photo-1667804957728-fefedd4de4c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM4OXx8fGVufDB8fHx8fA%3D%3D" alt="手拿泡芙" />
                <div className="content">
                    <div className="artisan-title">Handcrafted with Precision</div>
                    <div className="artisan-content">在 Divine，每一顆泡芙都由手工製作。
                        從麵糊擠花到內餡填充，每一道工序都經過細心完成。
                        沒有大量生產，
                        只有對品質的堅持。</div>
                </div>
                </div>
            </div>
            <div className="brandstory mb-3">
                <div className="brandstory-title">The Story Behind Divine</div>
                <div className="brandstory-content">Divine 的誕生，來自於兩個世界的交會：工程與甜點。</div>
                <div className="brandstory-content mb-5">一個關於精準、創造與熱情的故事。</div>
                <Link to="/about" className="brandstory-btn">Read Our Story</Link>

            </div>
            <div className="cta">
                <div className="main-title">Experience Divine</div>
                <Link to="/menu" className='home-btn'>View Menu</Link>
            </div>
        </div>
    )
};
export default Home;