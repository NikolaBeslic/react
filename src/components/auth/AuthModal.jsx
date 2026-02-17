import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import RegistrationForm from "./RegistrationForm";
import { useUser } from "../../contexts/UserContext";

const AuthModal = ({ closeModal }) => {
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
                        {showLogin ? "Ulogujte se" : "Registrujte se"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showLogin ? (
                        <Login handleGoogleLogin={handleGoogleLogin} />
                    ) : (
                        <RegistrationForm
                            handleGoogleLogin={handleGoogleLogin}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <p>
                        {showLogin ? (
                            <>
                                Nemate nalog na našem sajtu? Kliknite{" "}
                                <a
                                    href="#"
                                    onClick={toggleForm}
                                    className="text-primary"
                                >
                                    ovde
                                </a>
                                .
                            </>
                        ) : (
                            <>
                                Već imate nalog? Ulogujte se{" "}
                                <a
                                    href="#"
                                    onClick={toggleForm}
                                    className="text-primary"
                                >
                                    ovde
                                </a>
                                .
                            </>
                        )}
                    </p>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AuthModal;
