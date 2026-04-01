import { RotatingSquare } from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/all.css';

function LoadingPage() {
  return (
    <div
      className="fixed-top w-100 vh-100 d-flex justify-content-center align-items-center"
      style={{ 
        zIndex: 9999, 
        backgroundColor: 'rgba(27, 38, 59, 0.7)', // 深藍色背景 + 透明度
        backdropFilter: 'blur(8px)', // 關鍵：背景模糊效果
      }}
    >
      <div className="text-center">
        <RotatingSquare
          visible={true}
          height="100"
          width="100"
          color="#d4af37" // 金色配色
          ariaLabel="rotating-square-loading"
        />
        {/* 使用米白色文字 */}
        <p className="mt-3 fw-bold" style={{ color: '#f5f5f0', letterSpacing: '2px' }}>
          LOADING...
        </p>
      </div>
    </div>
  );
}

export default LoadingPage;
