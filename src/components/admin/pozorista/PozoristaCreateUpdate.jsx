import { useEffect, useState } from "react";
import { slugify } from "../../../../lib/slugify";
import axiosClient from "../../../utils/axios";
import { toast } from "react-hot-toast";
import { Form, Button } from "react-bootstrap";
import LoadingBackdrop from "../LoadingBackdrop";

const PozoristaCreateUpdate = ({ pozoristeid }) => {
    const [loading, setLoading] = useState(false);
    const [gradovi, setGradovi] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        naziv_pozorista: "",
        pozoriste_slug: "",
        adresa: "",
        email: "",
        telefon: "",
        url_cover_slike: "t",
        url_logo: "t",
        gradid: 0,
    });

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-gradovi")
            .then((gradoviRes) => {
                setGradovi(gradoviRes.data);

                if (!pozoristeid) return null;

                return axiosClient.get(
                    `/admin/get-single-pozoriste/${pozoristeid}`,
                );
            })
            .then((pozoristeRes) => {
                if (pozoristeRes) {
                    setFormData({ ...pozoristeRes.data });
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [pozoristeid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "naziv_pozorista") {
            const slug = slugify(value);
            formData.pozoriste_slug = slug;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleGradSelectChange = (event) => {
        console.log(event.target.value);
        setFormData({ ...formData, gradid: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.pozoristeid) {
            axiosClient
                .put("/admin/update-pozoriste", formData)
                .then((res) => {
                    console.log(res);
                    res.status == 200
                        ? toast.success("Uspešno sačuvane izmene")
                        : "";
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data);
                });
        } else {
            axiosClient
                .post("/admin/create-pozoriste", formData)
                .then((res) => {
                    console.log(res);
                    setErrors({});
                    res.status == "ok"
                        ? toast.success("Uspesno dodato novo pozoriste")
                        : "";
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
                    setErrors(error.response.data.errors);
                });
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
                    <Form.Label>Naziv pozorista</Form.Label>
                    <Form.Control
                        type="text"
                        name="naziv_pozorista"
                        value={formData.naziv_pozorista}
                        onChange={handleChange}
                    />
                    {errors?.naziv_pozorista && (
                        <span className="text-danger">
                            {errors.naziv_pozorista}
                        </span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="text"
                        name="pozoriste_slug"
                        value={formData.pozoriste_slug}
                        onChange={handleChange}
                    />
                    {errors?.pozoriste_slug && (
                        <span className="text-danger">
                            {errors.pozoriste_slug}
                        </span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control
                        type="text"
                        name="adresa"
                        value={formData.adresa}
                        onChange={handleChange}
                    />
                    {errors?.adresa && (
                        <span className="text-danger">{errors.adresa}</span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default PozoristaCreateUpdate;
