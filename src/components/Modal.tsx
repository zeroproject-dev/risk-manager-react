import './Modal.modules.css';

interface ModalProps {
	isOpen: boolean;
	children: React.ReactNode;
	onClose: () => void;
}

export function Modal({ isOpen, children, onClose }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className="modal">
			<button className="modal__close" onClick={onClose}>
				✖️
			</button>
			{children}
		</div>
	);
}
