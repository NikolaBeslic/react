import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axiosClient from "../../utils/axios";

import { useAdmin } from "../../contexts/AdminContext";
import { useRouter } from "next/router";
import { csrf, getCookieValue } from "../../utils";

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        login_field: "",
        password: "",
        // Add more fields as needed
    });
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        await csrf();

        axiosClient
            .post(`/adminlogin`, formData, {
                headers: {
                    "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                },
            })
            .then((res) => {
                // refreshAdmin()

                //navigate('/');
                router.push("/admin");
            })
            .catch((error) => console.error(error));
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
                        name="login_field"
                        type="text"
                        placeholder="Korisnicko ime ili email"
                        value={formData.login_field}
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
                    Uloguj se admine
                </Button>
            </Form>
        </>
    );
};

export default AdminLogin;
