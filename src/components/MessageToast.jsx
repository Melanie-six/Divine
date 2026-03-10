import { useSelector } from "react-redux";
import '../assets/toast.css'

function MessageToast() {
    const messages = useSelector((state) => state.message);
    return (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
            {messages.map(message => (
                
                <div
                    key={message.id}
                    className={`custom-toast mb-3 d-flex align-items-center border-${message.type}`}
                    role="alert"
                    >
                <span className={`toast-tag tag-${message.type}`}>&lt;Toast&gt;</span>
                <div className={`toast-icon-circle bg-${message.type}`}>
                    {message.type === 'success' ? '✓' : '!'}
                </div>
                <div className="toast-content ms-2">
                    {message.text}
                </div>
                <span className={`toast-tag-bottom tag-${message.type}`}>&lt;/Toast&gt;</span>
                {/* <div className={`toast-header text-white bg-${message.type}`}>
                    <strong className="me-auto">{message.title}</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    {message.text}
                </div> */}
                </div>
            ))}
        </div>
    )
};
export default MessageToast;