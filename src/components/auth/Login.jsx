import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../utils/axios";
import { useStateContext } from "../../contexts/StateContext";
import React from "react";
import { Spinner } from "react-bootstrap";

const Login = ({ handleGoogleLogin }) => {
    const [formData, setFormData] = useState({
        korisnickoIme: "",
        email: "",
        password: "",
        // Add more fields as needed
    });

    const {
        currentUser,
        setCurrentUser,
        isModalOpen,
        setModalOpen,
        isLoading,
        showLoading,
        hideLoading,
    } = useStateContext();

    const csrf = () => axiosClient.get("/csrf-cookie");

    const handleSubmit = async (event) => {
        showLoading();
        event.preventDefault();
        console.log(formData);
        await csrf();

        axiosClient
            .post(`/login`, formData)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                axiosClient.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${res.data.token}`;
                console.log(res.data.token);
                setCurrentUser(res.data.user);
                hideLoading();
                setModalOpen(false);
            })
            .catch((error) => console.error(error));

        // to do: send it to API
    };

    // const handleGoogleLogin = (e) => {
    //     e.preventDefault();
    //     console.log("google");
    //     const redirectUrl = window.location.href; // Capture the current page URL
    //     window.location.href = `${googleAuthUrl}?redirect_url=${encodeURIComponent(
    //         redirectUrl
    //     )}`;
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
        <>
            {isLoading && (
                <Spinner
                    animation="border"
                    role="status"
                    className="hup-spinner"
                />
            )}
            <Form>
                <Form.Group className="form-group mb-3">
                    <Form.Control
                        name="korisnickoIme"
                        type="text"
                        placeholder="Korisnicko ime"
                        value={formData.korisnickoIme}
                        onChange={handleChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="form-group mb-3">
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>

            <Button
                variant="secondary"
                type="button"
                onClick={handleGoogleLogin}
            >
                Prijavite se putem Google naloga
            </Button>
        </>
    );
};

export default Login;
