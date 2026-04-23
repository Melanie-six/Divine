import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import AOS from 'aos';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import '../../assets/home.css';
import useMessage from '../../hooks/useMessage';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

function Home() {
  const [products, setProducts] = useState([]);
  const { showError } = useMessage();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, 
      offset: 100,
    });
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${VITE_API_BASE}/api/${VITE_API_PATH}/products/all`,
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        showError('獲取產品資訊失敗');
      }
    };
    AOS.refresh();
    getProducts();
  }, [showError]);

  const chouxProducts = products.filter((item) => item.category === '泡芙');

  return (
    <div className="container-fluid p-0 overflow-hidden">
      <div className="banner mb-5">
        <div data-aos="fade-up">
          <div className="main-title">Divine</div>
          <div className="banner-sub-title">Handcrafted French Pâtisserie</div>
          <div className="banner-content">
            在精準與感性之間， 誕生每一顆值得被細細品味的甜點。
          </div>
          <NavLink to="/products" type="button" className="home-btn mt-4">
            Explore the Collection
          </NavLink>
        </div>
      </div>
      <div className="philosophy-section py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 mb-4 mb-md-0" data-aos="fade-right">
              <div className="philosophy-title">
                A Modern Interpretation <br/> of French Pâtisserie
              </div>
              <div className="philosophy-content">
                Divine 專注於法式泡芙甜點的創作，以精準工藝與細膩風味，呈現經典法式甜點的現代詮釋。
                每一道細節都經過耐心調整與反覆測試。
              </div>
            </div>
            <div className="col-md-5 text-center" data-aos="fade-left">
              <div className="philosophy-quote">
                <span className="mark">“</span>
                <p className="quote-text">真正的美味，來自於對細節的尊重。</p>
                <span className="mark">“</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="signature py-5 mb-5" data-aos="fade-up">
        <div className="container">
          <div className="signature-title mb-4">Signature Choux Creations</div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
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
                <div className="product-card-home">
                  <NavLink to={`/product/${product.id}`} className="card-img-wrapper">
                    <img className="card-img" src={product.imageUrl} alt={product.title} />
                  </NavLink>
                  <div className="card-overlay">
                    <div className="card-title">{product.title}</div>
                    <NavLink to={`/product/${product.id}`} className="card-btn">View Details</NavLink>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="artisan py-5 mb-5" data-aos="fade-up">
        <div className="artisan-container">
          <img
            className="img-large" data-aos="fade-up-right"
            src="https://plus.unsplash.com/premium_photo-1764355177633-7a0755aab91c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFraW5nJTIwZWNsYWlyc3xlbnwwfHwwfHx8MA%3D%3D"
            alt="泡芙"
          />
          <img
            className="img-small" data-aos="fade-up-left"
            src="https://images.unsplash.com/photo-1667804957728-fefedd4de4c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM4OXx8fGVufDB8fHx8fA%3D%3D"
            alt="手拿泡芙"
          />
          <div className="content">
            <div className="artisan-title">Handcrafted with Precision</div>
            <div className="artisan-content">
              在 Divine，每一顆泡芙都由手工製作。
              從麵糊擠花到內餡填充，每一道工序都經過細心完成。 沒有大量生產，
              只有對品質的堅持。
            </div>
          </div>
        </div>
      </div>
      <div className="brandstory mb-3">
        <div className="brandstory-title">The Story Behind Divine</div>
        <div className="brandstory-content">
          Divine 的誕生，來自於兩個世界的交會：工程與甜點。
        </div>
        <div className="brandstory-content mb-5">
          一個關於精準、創造與熱情的故事。
        </div>
        <NavLink to="/about" className="brandstory-btn">
          Read Our Story
        </NavLink>
      </div>
      <div className="cta" data-aos="fade-up">
        <div className="cta-title">Experience Divine</div>
        <NavLink to="/products" className="home-btn">
          View Menu
        </NavLink>
      </div>
    </div>
  );
}
export default Home;
