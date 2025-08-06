import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useStateContext } from "../../contexts/StateContext";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

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

    const [errors, setErrors] = useState([]);
    const router = useRouter();

    const handleSubmit = async (event) => {
        debugger;
        showLoading();
        event.preventDefault();
        console.log(formData);

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        });

        if (res.ok) {
            const data = await res.json();
            setCurrentUser(data); // Update the current user context
            setModalOpen(false); // Close the modal
            hideLoading();
            // router.reload(); // Or redirect to a protected page
        } else {
            hideLoading();
            const data = await res.json();
            setErrors(data.message || "Login failed");
        }

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
                    {errors?.korisnickoIme && (
                        <span className="text-danger">
                            {errors.korisnickoIme}
                        </span>
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
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    ></Form.Control>
                    {errors?.password && (
                        <span className="text-danger">{errors.password}</span>
                    )}
                </Form.Group>
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                    LOGIN
                </Button>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={handleGoogleLogin}
                >
                    <i className="fa-brands fa-google"></i> Prijavite se putem
                    Google naloga
                </Button>
            </Form>
        </>
    );
};

export default Login;
