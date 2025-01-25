import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../utils/axios";
import { useStateContext } from "../../contexts/StateContext";
import { Spinner } from "react-bootstrap";

const RegistrationForm = ({ handleGoogleLogin }) => {
    const [formData, setFormData] = useState({
        korisnickoIme: "",
        email: "",
        password: "",
        password_confirmation: "",
        // Add more fields as needed
    });

    const [errors, setErrors] = useState([]);
    const { isModalOpen, setModalOpen, isLoading, showLoading, hideLoading } =
        useStateContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        showLoading();
        console.log(formData);
        axiosClient.get("/csrf-cookie").then((response) => {
            axiosClient
                .post(`/register`, formData)
                .then((res) => {
                    console.log("Registrovali ste se");
                    hideLoading();
                })
                .catch((error) => {
                    console.error(error);
                    hideLoading();
                    setErrors(error.response.data.errors);
                });
        });
    };

    // to do: send it to API

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Form onSubmit={handleSubmit}>
            {isLoading && (
                <Spinner
                    animation="border"
                    role="status"
                    className="hup-spinner"
                />
            )}
            <Form.Group className="form-group mb-3">
                <Form.Control
                    name="korisnickoIme"
                    type="text"
                    placeholder="Korisnicko ime"
                    value={formData.korisnickoIme}
                    onChange={handleChange}
                ></Form.Control>
                {errors?.korisnickoIme && (
                    <span className="text-danger">{errors.korisnickoIme}</span>
                )}
            </Form.Group>
            <Form.Group className="form-group mb-3">
                <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                ></Form.Control>
                {errors?.email && (
                    <span className="text-danger">{errors.email}</span>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    name="password"
                    type="password"
                    placeholder="Lozinka"
                    value={formData.password}
                    onChange={handleChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    name="password_confirmation"
                    type="password"
                    placeholder="Potvrdite lozinku"
                    onChange={handleChange}
                ></Form.Control>
                {errors?.password && (
                    <span className="text-danger">{errors.password}</span>
                )}
            </Form.Group>
            <Button variant="secondary">Close</Button>
            <Button type="submit" variant="primary">
                Save Changes
            </Button>
            <br /> ili
            <Button
                variant="secondary"
                type="button"
                onClick={handleGoogleLogin}
            >
                Prijavite se putem Google naloga
            </Button>
        </Form>
    );
};

export default RegistrationForm;
