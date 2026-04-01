import { Outlet, useLocation } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setIsFullPageLoading } from '../slice/appSlice';
import LoadingPage from '../components/LoadingPage';
import '../assets/all.css';

function FrontendLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isFullPageLoading } = useSelector((state) => state.app);

  useEffect(() => {
    // 1. 每當路徑改變，開啟 Loading
    dispatch(setIsFullPageLoading(true));

    // 2. 設定一個短暫延遲（例如 600ms）讓使用者感受到轉場，然後關閉
    // 也可以根據 API 資料是否抓完來手動關閉
    const timer = setTimeout(() => {
      dispatch(setIsFullPageLoading(false));
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname, dispatch]);

  return (
    <>
    <div className="d-flex flex-column min-vh-100">
      {isFullPageLoading && <LoadingPage />}
      <ScrollToTop />
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  );
}
export default FrontendLayout;
