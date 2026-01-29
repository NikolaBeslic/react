import { useEffect, useState } from "react";
import { slugify } from "../../../../lib/slugify";
import axiosClient from "../../../utils/axios";
import { toast } from "react-hot-toast";
import { Form, Button } from "react-bootstrap";
import LoadingBackdrop from "../LoadingBackdrop";

const AutoriCreateUpdate = ({ autorid }) => {
    const [gradovi, setGradovi] = useState([]);
    const [autorImage, setAutorImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        ime_autora: "",
        autor_slug: "",
        pozicija: "",
        url_slike: "t",
        biografija: "",
        gradid: "",
        slika: null,
    });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);

            try {
                const requests = [axiosClient.get("/admin/get-gradovi")];

                if (autorid) {
                    requests.push(
                        axiosClient.get(`/admin/get-single-autor/${autorid}`),
                    );
                }

                const [gradoviRes, autorRes] = await Promise.all(requests);

                if (!isMounted) return;

                setGradovi(gradoviRes.data);

                if (autorRes) {
                    console.log(autorRes.data);

                    setFormData({ ...autorRes.data });
                    setAutorImage(autorRes.data.url_slike);
                }
            } catch (error) {
                console.error(error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [autorid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "ime_autora") {
            const slug = slugify(value);
            formData.autor_slug = slug;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleGradSelectChange = (event) => {
        console.log(event.target.value);
        setFormData({ ...formData, gradid: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        if (formData.autorid) {
            axiosClient
                .post("/admin/update-autor", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res);
                    setErrors({});
                    toast.success("Uspešno sačuvane izmene");
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
                    setErrors(error.response.data.errors);
                });
        } else {
            axiosClient
                .post("/admin/create-autor", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res);
                    setErrors({});
                    toast.success("Uspesno dodat novi autor");
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
                    setErrors(error.response.data.errors);
                });
        }
    };

    const handleAutorImageChange = (event) => {
        if (!event.target.files[0]) {
            setFormData({ ...formData, slika: null });
            setAutorImage(null);
        } else {
            setFormData({ ...formData, slika: event.target.files[0] });
            setAutorImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <>
            <LoadingBackdrop show={loading} text="Working..." />
            <Form onSubmit={handleSubmit} className="w-50 m-auto">
                <Form.Group className="mb-3">
                    <Form.Label>Ime autora</Form.Label>
                    <Form.Control
                        type="text"
                        name="ime_autora"
                        value={formData.ime_autora}
                        onChange={handleChange}
                    />
                    {errors?.ime_autora && (
                        <span className="text-danger">{errors.ime_autora}</span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="text"
                        name="autor_slug"
                        value={formData.autor_slug}
                        onChange={handleChange}
                    />
                    {errors?.autor_slug && (
                        <span className="text-danger">{errors.autor_slug}</span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Pozicija</Form.Label>
                    <Form.Control
                        type="text"
                        name="pozicija"
                        value={formData.pozicija}
                        onChange={handleChange}
                    />
                    {errors?.pozicija && (
                        <span className="text-danger">{errors.pozicija}</span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Biografija</Form.Label>
                    <Form.Control
                        type="text"
                        as="textarea"
                        rows={3}
                        name="biografija"
                        value={formData.biografija}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Grad</Form.Label>
                    <Form.Select
                        onChange={handleGradSelectChange}
                        value={formData.gradid}
                    >
                        {gradovi.map((grad) => (
                            <option key={grad.gradid} value={grad.gradid}>
                                {grad.naziv_grada}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Fotka</Form.Label>
                    {autorImage && (
                        <div style={{ marginBottom: "10px" }}>
                            <img
                                src={autorImage}
                                alt="Preview"
                                style={{
                                    maxWidth: "100%",
                                    height: "100px",
                                }}
                            />
                        </div>
                    )}
                    <Form.Control
                        type="file"
                        onChange={handleAutorImageChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default AutoriCreateUpdate;
