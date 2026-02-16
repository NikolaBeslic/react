import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useStateContext } from "../../contexts/StateContext";
import { InputGroup, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { csrf, getCookieValue } from "../../utils";
import axiosClient from "../../utils/axios";
import toast from "react-hot-toast";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Login = ({ handleGoogleLogin }) => {
    const [formData, setFormData] = useState({
        login_field: "",
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
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event) => {
        showLoading();
        event.preventDefault();
        console.log(formData);
        await csrf();
        axiosClient
            .post("/login", formData, {
                headers: {
                    "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                },
            })
            .then((res) => {
                setCurrentUser(res.data);
                setModalOpen(false); // Close the modal
                hideLoading();
                toast.success("Uspešno ste se ulogovali");
            })
            .catch((err) => {
                console.error(err);

                setErrors(err?.response?.data);
                hideLoading();
            });
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
                        name="login_field"
                        type="email"
                        placeholder="Korisničko ime ili email"
                        value={formData.login_field}
                        onChange={handleChange}
                    ></Form.Control>
                    {errors?.login_field && (
                        <span className="text-danger">
                            {errors.login_field}
                        </span>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup className="flex-nowrap">
                        <Form.Control
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Lozinka"
                            value={formData.password}
                            onChange={handleChange}
                            aria-describedby="basic-addon2"
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
                </Form.Group>

                <Button type="submit" variant="primary" onClick={handleSubmit}>
                    LOGIN
                </Button>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={handleGoogleLogin}
                >
                    <FontAwesomeIcon icon={faGoogle} /> Prijavite se putem
                    Google naloga
                </Button>
                <span className="text-danger">{errors}</span>
            </Form>
        </>
    );
};

export default Login;
