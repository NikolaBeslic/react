import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap";
import { csrf, getCookieValue } from "../utils";
import toast from "react-hot-toast";
import axiosClient from "../utils/axios";
import ForgotPasswordHeader from "../components/post/post-format/elements/meta/ForgotPasswordHeader";

const ZaboravljenaLozinkaPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email je obavezan.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validate()) return;

        setLoading(true);
        await csrf();
        try {
            const res = await axiosClient.post(
                "/forgot-password",
                { email },
                {
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                    },
                },
            );
            ///setMessage(res.data.message);
            toast.success(res.data.message);
            setEmail("");
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors || {});
            }
            toast.error("Greška prilikom slanja podataka. Pokušajte ponovo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="axil-our-team section-gap">
                <div className="container">
                    <p>
                        Unesite email adresu i poslaćemo vam link za reset
                        lozinke.
                    </p>
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
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors((prev) => ({
                                        ...prev,
                                        email: "",
                                    }));
                                }}
                                className={
                                    errors.email ? "border-danger" : "input"
                                }
                                disabled={loading}
                            />
                            {errors?.email && (
                                <span className="text-danger">
                                    {errors.email}
                                </span>
                            )}
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={handleSubmit}
                        >
                            Pošalji link
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default ZaboravljenaLozinkaPage;

ZaboravljenaLozinkaPage.getLayoutProps = (pageProps) => ({
    header: <ForgotPasswordHeader />,
});
