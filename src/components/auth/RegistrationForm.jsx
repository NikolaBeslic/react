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
        if (!validateForm()) return;
        setLoading(true);
        await csrf();
        axiosClient
            .post(`/register`, formData, {
                headers: {
                    "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                },
            })
            .then((res) => {
                setModalOpen(false);
                toast.success(
                    "Uspešno ste se registrovali! Proverite vaš email da biste aktivirali nalog.",
                );
                setFormData({
                    korisnickoIme: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                });
            })
            .catch((error) => {
                console.error(error);
                toast.error("Neka greška se dogodila. Pokušajte ponovo.");
                setErrors(error.response.data.errors);
            })
            .finally(() => setLoading(false));
    };

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

        if (!formData.korisnickoIme.trim()) {
            newErrors.korisnickoIme = "Korisničko ime je obavezno.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email je obavezan.";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Lozinka je obavezna.";
        }

        if (!formData.password_confirmation.trim()) {
            newErrors.password_confirmation = "Potvrda lozinke je obavezna.";
        }

        if (
            formData.password &&
            formData.password_confirmation &&
            formData.password !== formData.password_confirmation
        ) {
            newErrors.password_confirmation = "Lozinke se ne poklapaju.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return (
        <Form
            className="m-t-xs-10 authmodal-registration-form"
            onSubmit={handleSubmit}
        >
            {loading && (
                <Spinner
                    animation="border"
                    role="status"
                    className="hup-spinner"
                />
            )}
            <Form.Group className="form-group m-b-xs-15">
                <Form.Control
                    name="korisnickoIme"
                    type="text"
                    placeholder="Korisnicko ime"
                    value={formData.korisnickoIme}
                    disabled={loading}
                    onChange={handleChange}
                    className={
                        errors?.korisnickoIme ? "border-danger" : "input"
                    }
                ></Form.Control>
                {errors?.korisnickoIme && (
                    <span className="text-danger">{errors.korisnickoIme}</span>
                )}
            </Form.Group>
            <Form.Group className="form-group m-b-xs-15">
                <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    disabled={loading}
                    onChange={handleChange}
                    className={errors?.email ? "border-danger" : "input"}
                ></Form.Control>
                {errors?.email && (
                    <span className="text-danger">{errors.email}</span>
                )}
            </Form.Group>
            <Form.Group className="form-group m-b-xs-15">
                <InputGroup className="flex-nowrap">
                    <Form.Control
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Lozinka"
                        value={formData.password}
                        disabled={loading}
                        onChange={handleChange}
                        className={errors?.password ? "border-danger" : "input"}
                    ></Form.Control>
                    <InputGroup.Text
                        role="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={
                            showPassword ? "Sakrij lozinku" : "Prikaži lozinku"
                        }
                        aria-pressed={showPassword}
                        disabled={loading}
                        id="basic-addon2"
                        className={
                            errors?.password_confirmation
                                ? "border-danger"
                                : "input"
                        }
                    >
                        {showPassword ? (
                            <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                            <FontAwesomeIcon icon={faEye} />
                        )}
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>
            <Form.Group className="form-group m-b-xs-15">
                <InputGroup className="flex-nowrap">
                    <Form.Control
                        name="password_confirmation"
                        type={showPassword ? "text" : "password"}
                        placeholder="Potvrdite lozinku"
                        disabled={loading}
                        onChange={handleChange}
                    ></Form.Control>
                </InputGroup>
                {errors?.password && (
                    <span className="text-danger">{errors.password}</span>
                )}
            </Form.Group>
            <div className="authmodal-action-buttons-wrapper m-b-xs-10">
                <Button type="submit" variant="primary" disabled={loading}>
                    SAČUVAJ
                </Button>
                <Button
                    className="btn btn-nofill"
                    type="button"
                    onClick={handleGoogleLogin}
                    align="right"
                    disabled={loading}
                >
                    <FontAwesomeIcon icon={faGoogle} />
                    Google prijava
                </Button>
            </div>
        </Form>
    );
};

export default RegistrationForm;
