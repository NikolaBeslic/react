import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

export default function LoadingBackdrop({ show, text = "Loading..." }) {
    return (
        <Modal
            show={show}
            centered
            backdrop="static"
            keyboard={false}
            contentClassName="bg-transparent border-0"
        >
            <div className="d-flex flex-column align-items-center">
                <Spinner animation="border" variant="primary" />
                <div className="text-white mt-3">{text}</div>
            </div>
        </Modal>
    );
}
