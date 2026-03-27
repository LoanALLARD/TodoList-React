export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
}
