import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import Login from './Login';
import RegistrationForm from './RegistrationForm';

const AuthModal = ({ isOpen, closeModal }) => {
    const [showLogin, setShowLogin] = useState(true);

    const [formData, setFormData] = useState({
        korisnickoIme: '',
        email: '',
        paswword: '',
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
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrujte se</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showLogin ? <Login /> : <RegistrationForm />}
                    <p onClick={toggleForm}>{showLogin ? 'Don\'t have an account? Register here.' : 'Already have an account? Login here.'}</p>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default AuthModal;