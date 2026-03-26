import { useRouter } from "next/router";
import { useState } from "react";
import { csrf, getCookieValue } from "../utils";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import axiosClient from "../utils/axios";
import toast from "react-hot-toast";
import ResetPasswordHeader from "../components/post/post-format/elements/meta/ResetPasswordHeader";

const ResetLozinkePage = () => {
    const router = useRouter();
    const { email, token } = router.query;

    const [formData, setFormData] = useState({
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = "Lozinka je obavezna.";
        } else if (formData.password.length < 8) {
            newErrors.password = "Lozinka mora imati najmanje 8 karaktera.";
        }

        if (!formData.password_confirmation) {
            newErrors.password_confirmation = "Potvrda lozinke je obavezna.";
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Lozinke se ne poklapaju.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validate()) return;
        if (!email || !token) return;

        setLoading(true);

        try {
            await csrf();
            const res = await axiosClient.post(
                "/reset-password",
                {
                    email,
                    token,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation,
                },
                {
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                    },
                },
            );
            setMessage(res.data.message);
            setFormData({
                password: "",
                password_confirmation: "",
            });
            toast.success(
                "Uspešno izmenjena lozinka. Možeš se ulogovati sa novom lozinkom.",
            );
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors || {});
            }
            toast.error(err.response.data);
        } finally {
            setLoading(false);
        }
    };

    if (!email || !token) {
        return <p>Neispravan link za reset lozinke.</p>;
    }

    return (
        <>
            <div className="axil-our-team section-gap">
                <div className="container">
                    {loading && (
                        <Spinner
                            animation="border"
                            role="status"
                            className="hup-spinner"
                        />
                    )}
                    <Form className="m-t-xs-10 authmodal-login-form">
                        <Form.Group className="form-group m-b-xs-15">
                            <InputGroup className="flex-nowrap">
                                <Form.Control
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Lozinka"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={
                                        errors.password
                                            ? "border-danger"
                                            : "input"
                                    }
                                ></Form.Control>
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
                                    className={
                                        errors.password_confirmation
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
                                    placeholder="Potvrdi lozinku"
                                    onChange={handleChange}
                                ></Form.Control>
                            </InputGroup>
                            {errors?.password_confirmation && (
                                <span className="text-danger">
                                    {errors.password_confirmation}
                                </span>
                            )}
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={handleSubmit}
                        >
                            Izmeni lozinku
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default ResetLozinkePage;

ResetLozinkePage.getLayoutProps = (pageProps) => ({
    header: <ResetPasswordHeader />,
});
