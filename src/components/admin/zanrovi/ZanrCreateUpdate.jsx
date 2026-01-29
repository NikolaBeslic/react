import { ColorPicker } from "primereact/colorpicker";
import { useEffect, useState } from "react";
import { slugify } from "../../../../lib/slugify";
import axiosClient from "../../../utils/axios";
import toast from "react-hot-toast";
import { Form, Button } from "react-bootstrap";

const ZanrCreateUpdate = ({ zanrid }) => {
    const [errors, setErrors] = useState({});
    const [color, setColor] = useState(null);
    const [formData, setFormData] = useState({
        naziv_zanra: "",
        zanr_slug: "",
        zanr_boja: "",
        zanr_mnozina: "",
    });

    useEffect(() => {
        if (zanrid) {
            axiosClient.get(`/admin/get-single-zanr/${zanrid}`).then((res) => {
                console.log(res.data);
                setFormData({ ...res.data });
            });
        }
    }, [zanrid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "naziv_zanra") {
            const slug = slugify(value);
            formData.zanr_slug = slug;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleColorChange = (e) => {
        setColor(e.value);
        setFormData({ ...formData, zanr_boja: `#${e.value}` });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        if (formData.zanrid) {
            axiosClient
                .put("/admin/update-zanr", formData)
                .then((res) => console.log(res))
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
                });
        } else {
            axiosClient
                .post("/admin/create-zanr", formData)
                .then((res) => {
                    console.log(res);
                    setErrors({});
                    toast.success("Uspesno dodat zanr");
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
                    setErrors(error.response.data.errors);
                });
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit} className="w-50 m-auto">
                <Form.Group className="mb-3">
                    <Form.Label>Naziv zanra</Form.Label>
                    <Form.Control
                        type="text"
                        name="naziv_zanra"
                        value={formData.naziv_zanra}
                        onChange={handleChange}
                    />
                    {errors?.naziv_zanra && (
                        <span className="text-danger">
                            {errors.naziv_zanra}
                        </span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="text"
                        name="zanr_slug"
                        value={formData.zanr_slug}
                        onChange={handleChange}
                    />
                    {errors?.zanr_slug && (
                        <span className="text-danger">{errors.zanr_slug}</span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mnozina</Form.Label>
                    <Form.Control
                        type="text"
                        name="zanr_mnozina"
                        value={formData.zanr_mnozina}
                        onChange={handleChange}
                    />
                    {errors?.zanr_mnozina && (
                        <span className="text-danger">
                            {errors.zanr_mnozina}
                        </span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <ColorPicker
                        name="zanr_boja"
                        value={formData.zanr_boja}
                        onChange={handleColorChange}
                    />
                    {errors?.zanr_boja && (
                        <span className="text-danger">{errors.zanr_boja}</span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    Preview:{" "}
                    <span
                        className="zanr-button"
                        style={{
                            color: formData.zanr_boja,
                            borderColor: formData.zanr_boja,
                        }}
                    >
                        {formData?.naziv_zanra}
                    </span>
                </Form.Group>
                <Button
                    size="large"
                    type="submit"
                    variant="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default ZanrCreateUpdate;
