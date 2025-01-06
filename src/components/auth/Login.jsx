import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import axiosClient from "../../utils/axios";
import { signIn } from "next-auth/react";
import { serialize, setCookie } from "cookie";
import { useStateContext } from "../../contexts/StateContext";
import { redirect } from "next/navigation";

const Login = () => {
    const [formData, setFormData] = useState({
        korisnickoIme: "",
        email: "",
        password: "",
        // Add more fields as needed
    });

    const { currentUser, setCurrentUser } = useStateContext();

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(formData);
    //     try {
    //         await signIn('credentials', formData); // Use the appropriate provider
    //     } catch (error) {
    //         console.error('Login error:', error);
    //         // Handle login error
    //     }
    // };

    const csrf = () => axiosClient.get("/csrf-cookie");

    const handleSubmit = async (event) => {
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
                redirect("/admin/tekstovi");
            })
            .catch((error) => console.error(error));

        // to do: send it to API
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
        <>
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
        </>
    );
};

export default Login;
