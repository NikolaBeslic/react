import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../utils/axios";
import { InputGroup, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { csrf, getCookieValue } from "../../utils";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "../../contexts/UserContext";

const RegistrationForm = ({ handleGoogleLogin }) => {
    const [formData, setFormData] = useState({
        korisnickoIme: "",
        email: "",
        password: "",
        password_confirmation: "",
        // Add more fields as needed
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, refreshUser, isModalOpen, setModalOpen } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log(formData);
        await csrf();
        axiosClient
            .post(`/register`, formData, {
                headers: {
                    "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                },
            })
            .then((res) => {
                setModalOpen(false);
                toast.success("Uspešno ste se registrovali!");
                setFormData({
                    korisnickoIme: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                });
            })
            .catch((error) => {
                console.error(error);
                setErrors(error.response.data.errors);
            })
            .finally(() => setLoading(false));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Form onSubmit={handleSubmit}>
            {loading && (
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
                <InputGroup className="flex-nowrap">
                    <Form.Control
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Lozinka"
                        value={formData.password}
                        onChange={handleChange}
                    ></Form.Control>
                    <InputGroup.Text
                        role="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={
                            showPassword ? "Sakrij lozinku" : "Prikaži lozinku"
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
            </Form.Group>
            <Form.Group className="mb-3">
                <InputGroup className="flex-nowrap">
                    <Form.Control
                        name="password_confirmation"
                        type={showPassword ? "text" : "password"}
                        placeholder="Potvrdite lozinku"
                        onChange={handleChange}
                    ></Form.Control>
                </InputGroup>
                {errors?.password && (
                    <span className="text-danger">{errors.password}</span>
                )}
            </Form.Group>
            <div className="justify-content-center">
                <Button type="submit" variant="primary">
                    SAČUVAJ
                </Button>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={handleGoogleLogin}
                    align="right"
                >
                    <FontAwesomeIcon icon={faGoogle} />
                    Prijavite se koristeci Google
                </Button>
            </div>
        </Form>
    );
};

export default RegistrationForm;
