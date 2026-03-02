import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../utils/axios";
import { useRouter } from "next/router";
import { csrf, getCookieValue } from "../../utils";
import LoadingBackdrop from "./LoadingBackdrop";

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        login_field: "",
        password: "",
        // Add more fields as needed
    });
    const [errors, setErrors] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const [loadingAdminLogin, setLoadingAdminLogin] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        setLoadingAdminLogin(true);
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
                setLoadingAdminLogin(false);
                router.push("/admin");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.errors);
                setErrorMessage(err?.response?.data);
                setLoadingAdminLogin(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <LoadingBackdrop show={loadingAdminLogin} text="Working..." />
            <Form className="mt-5">
                <Form.Group className="form-group mb-3">
                    <Form.Control
                        name="login_field"
                        type="text"
                        placeholder="Korisnicko ime ili email"
                        value={formData.login_field}
                        onChange={handleChange}
                        required={true}
                    ></Form.Control>
                    {errors?.login_field && (
                        <span className="text-danger">
                            {errors.login_field}
                        </span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required={true}
                    ></Form.Control>
                    {errors?.password && (
                        <span className="text-danger">{errors.password}</span>
                    )}
                </Form.Group>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                    Uloguj se admine
                </Button>
            </Form>
        </>
    );
};

export default AdminLogin;
