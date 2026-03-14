import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useUser } from "../../contexts/UserContext";
import { InputGroup, Spinner } from "react-bootstrap";
import Link from "next/link";
import { csrf, getCookieValue } from "../../utils";
import axiosClient from "../../utils/axios";
import toast from "react-hot-toast";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";

const Login = ({ handleGoogleLogin, handleForgotPasswordClick }) => {
    const [formData, setFormData] = useState({
        login_field: "",
        password: "",
        // Add more fields as needed
    });

    const { user, refreshUser, isModalOpen, setModalOpen } = useUser();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const { router } = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        console.log(formData);
        await csrf();
        axiosClient
            .post("/login", formData, {
                headers: {
                    "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                },
            })
            .then((res) => {
                refreshUser();
                setModalOpen(false); // Close the modal
                toast.success("Uspešno ste se ulogovali");
            })
            .catch((err) => {
                console.error(err);
                setErrors({ server_error: err?.response?.data });
            })
            .finally(() => setLoading(false));
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

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.login_field.trim()) {
            newErrors.login_field = "Unesite korisničko ime ili email.";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Lozinka je obavezna.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            {loading && (
                <Spinner
                    animation="border"
                    role="status"
                    className="hup-spinner"
                />
            )}
            <Form className="m-t-xs-10 authmodal-login-form">
                <Form.Group className="form-group m-b-xs-15">
                    <Form.Control
                        name="login_field"
                        type="email"
                        placeholder="Korisničko ime ili email"
                        value={formData.login_field}
                        onChange={handleChange}
                        className={
                            errors.login_field ? "border-danger" : "input"
                        }
                    />
                    {errors?.login_field && (
                        <span className="text-danger">
                            {errors.login_field}
                        </span>
                    )}
                </Form.Group>

                <Form.Group className="m-b-xs-15 login-password-wrapper">
                    <InputGroup className="flex-nowrap m-b-xs-10">
                        <Form.Control
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Lozinka"
                            value={formData.password}
                            onChange={handleChange}
                            aria-describedby="basic-addon2"
                            className={
                                errors.password ? "border-danger" : "input"
                            }
                        />

                        <InputGroup.Text
                            role="button"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword((s) => !s)}
                            aria-label={
                                showPassword
                                    ? "Sakrij lozinku"
                                    : "Prikaži lozinku"
                            }
                            aria-pressed={showPassword}
                            id="basic-addon2"
                        >
                            {showPassword ? (
                                <FontAwesomeIcon icon={faEyeSlash} />
                            ) : (
                                <FontAwesomeIcon icon={faEye} />
                            )}
                        </InputGroup.Text>
                    </InputGroup>
                    {errors?.password && (
                        <span className="text-danger">{errors.password}</span>
                    )}
                    <p className="forgot-password-link">
                        <a
                            className="text-primary"
                            onClick={handleForgotPasswordClick}
                        >
                            Zaboravili ste lozinku?
                        </a>
                    </p>
                </Form.Group>
                <div className="authmodal-action-buttons-wrapper m-b-xs-10">
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={handleSubmit}
                    >
                        LOGIN
                    </Button>
                    <Button
                        className="btn btn-nofill"
                        type="button"
                        onClick={handleGoogleLogin}
                    >
                        <FontAwesomeIcon icon={faGoogle} /> Google prijava
                    </Button>
                </div>
                {errors.server_error && (
                    <span className="text-danger">{errors.server_error}</span>
                )}
            </Form>
        </>
    );
};

export default Login;
