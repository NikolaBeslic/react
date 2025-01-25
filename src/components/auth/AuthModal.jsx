import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import RegistrationForm from "./RegistrationForm";
import { useStateContext } from "../../contexts/StateContext";

const AuthModal = ({ closeModal }) => {
    const { isModalOpen } = useStateContext();

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

    return (
        <>
            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrujte se</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showLogin ? <Login /> : <RegistrationForm />}
                    <p onClick={toggleForm}>
                        {showLogin
                            ? "Don't have an account? Register here."
                            : "Already have an account? Login here."}
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AuthModal;
