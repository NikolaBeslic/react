import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import RegistrationForm from "./RegistrationForm";
import { useUser } from "../../contexts/UserContext";

const AuthModal = ({ closeModal, handleForgotPasswordClick }) => {
    const { isModalOpen } = useUser();

    const [showLogin, setShowLogin] = useState(true);
    const [formData, setFormData] = useState({
        korisnickoIme: "",
        email: "",
        paswword: "",
        // Add more fields as needed
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        Modal.closeModal();
        // to do: send it to API
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleForm = () => {
        setShowLogin((prev) => !prev);
    };

    const googleAuthUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;
    const handleGoogleLogin = (e) => {
        e.preventDefault();
        console.log("google");
        const redirectUrl = window.location.href; // Capture the current page URL;
        window.location.href =
            "http://localhost:8000/auth/google?redirect_url=" +
            encodeURIComponent(window.location.href);
        // window.location.href = `${googleAuthUrl}?redirect_url=${encodeURIComponent(
        //     redirectUrl,
        // )}`;
    };

    return (
        <>
            <Modal
                show={isModalOpen}
                onHide={closeModal}
                container={() => document.querySelector(".user-layout")}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {showLogin ? "Uloguj se" : "Registruj se"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showLogin ? (
                        <Login
                            handleGoogleLogin={handleGoogleLogin}
                            handleForgotPasswordClick={
                                handleForgotPasswordClick
                            }
                        />
                    ) : (
                        <RegistrationForm
                            handleGoogleLogin={handleGoogleLogin}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer className="authmodal-footer">
                    <p>
                        {showLogin ? (
                            <>
                                Nemaš nalog na našem sajtu?{" "}
                                <a
                                    href="#"
                                    onClick={toggleForm}
                                    className="text-primary"
                                >
                                    Registruj se
                                </a>
                            </>
                        ) : (
                            <>
                                Već imaš nalog?{" "}
                                <a
                                    href="#"
                                    onClick={toggleForm}
                                    className="text-primary"
                                >
                                    Uloguj se
                                </a>
                            </>
                        )}
                    </p>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AuthModal;
