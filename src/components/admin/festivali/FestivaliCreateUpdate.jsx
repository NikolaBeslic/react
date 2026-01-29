import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axios";
import { slugify } from "../../../../lib/slugify";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-hot-toast";
import LoadingBackdrop from "../LoadingBackdrop";

const FestivaliCreateUpdate = ({ festivalid }) => {
    const [festivalImage, setFestivalImage] = useState(null);
    const [gradovi, setGradovi] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [datumod, setDatumod] = useState(null);
    const [datumdo, setDatumdo] = useState(null);

    const [formData, setFormData] = useState({
        gradid: null,
        naziv_festivala: "",
        festival_slug: "",
        tekst_festivala: "",
        repertoar: "",
        festival_slika: null,
        datumod: null,
        datumdo: null,
    });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);

            try {
                const requests = [axiosClient.get("/admin/get-gradovi")];

                if (festivalid) {
                    requests.push(
                        axiosClient.get(
                            `/admin/get-single-festival/${festivalid}`,
                        ),
                    );
                }

                const [gradoviRes, festivalRes] = await Promise.all(requests);

                if (!isMounted) return;

                setGradovi(gradoviRes.data);

                if (festivalRes) {
                    console.log(festivalRes.data);
                    setFormData({
                        ...festivalRes.data,
                    });
                    setFestivalImage(festivalRes.data.festival_slika);
                    setDatumod(moment(festivalRes.data.datumod));
                    setDatumdo(moment(festivalRes.data.datumdo));
                    editorTekst.content = festivalRes.data.tekst_festivala;
                    editorRepertoar.content = festivalRes.data.repertoar;
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
    }, [festivalid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "naziv_festivala") {
            const slug = slugify(value);
            formData.festival_slug = slug;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleGradSelectChange = (event) => {
        console.log(event.target.value);
        setFormData({ ...formData, gradid: event.target.value });
    };

    const handleFestivalFoto = (event) => {
        if (!event.target.files[0]) {
            setFormData({ ...formData, festival_slika: null });
            setFestivalImage(null);
        } else {
            setFormData({ ...formData, festival_slika: event.target.files[0] });
            setFestivalImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const editorTekst = useRef(null);
    const handleEditorTekstChange = (content, editorId) => {
        setFormData({ ...formData, tekst_festivala: content });
        editorTekst.content = content;
    };

    const editorRepertoar = useRef(null);
    const handleEditorRepertoarChange = (content, editorId) => {
        setFormData({ ...formData, repertoar: content });
        editorRepertoar.content = content;
    };

    const handleSubmit = (event) => {
        showLoading();
        event.preventDefault();
        formData.datumod = moment(datumod).format("YYYY-MM-DD");
        formData.datumdo = moment(datumdo).format("YYYY-MM-DD");
        console.log(formData);
        if (formData.festivalid) {
            console.log("update");

            axiosClient
                .post("/admin/festival-update", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res);
                    setErrors({});
                    hideLoading();
                    toast.success("Uspešno sačuvane izmene");
                })
                .catch((err) => {
                    console.error(err);
                    console.log(err.response.data.errors);
                    setErrors(err.response.data.errors);
                    hideLoading();
                });
        } else {
            axiosClient
                .post("/admin/festival-store", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res);
                    setErrors({});
                    hideLoading();
                    toast.success("Uspešno dodat festival");
                })
                .catch((err) => {
                    console.error(err);
                    console.log(err.response.data.errors);
                    setErrors(err.response.data.errors);
                    hideLoading();
                });
        }
    };

    /* This one is for tiny mce */
    const handleImageUpload = async (blobInfo) => {
        let formDataTinyMce = new FormData();
        formDataTinyMce.append("gradid", gradid);
        formDataTinyMce.append("slika", blobInfo.blob(), blobInfo.filename());
        try {
            console.log(formDataTinyMce);
            const res = await axiosClient.post(
                "/admin/uploadImage",
                formDataTinyMce,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            console.log(res);

            if (res.data && res.data.location) {
                return res.data.location;
            } else {
                throw new Error("Unable to upload image");
            }
        } catch (err) {
            throw new Error("Unable to upload image 2");
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
                    <Form.Label>Grad</Form.Label>
                    <Form.Select
                        onChange={handleGradSelectChange}
                        value={formData.gradid ?? ""}
                    >
                        {gradovi.map((grad) => (
                            <option key={grad.gradid} value={grad.gradid}>
                                {grad.naziv_grada}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Row>
                        <Col xs={12} sm={6}>
                            <Form.Label>Od</Form.Label>
                            <Form.Control
                                type="date"
                                name="datumod"
                                value={formData.datumod}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Label>Do</Form.Label>
                            <Form.Control
                                type="date"
                                name="datumdo"
                                value={formData.datumdo}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Naziv festivala</Form.Label>
                    <Form.Control
                        type="text"
                        name="naziv_festivala"
                        value={formData.naziv_festivala}
                        onChange={handleChange}
                    />
                    {errors?.naziv_festivala && (
                        <span className="text-danger">
                            {errors.naziv_festivala}
                        </span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="text"
                        name="festival_slug"
                        value={formData.festival_slug}
                        onChange={handleChange}
                    />
                    {errors?.festival_slug && (
                        <span className="text-danger">
                            {errors.festival_slug}
                        </span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Festival foto (plakat)</Form.Label>
                    {festivalImage && (
                        <div style={{ marginBottom: "10px" }}>
                            <img
                                src={festivalImage}
                                alt="Preview"
                                style={{
                                    maxWidth: "100%",
                                    height: "100px",
                                }}
                            />
                        </div>
                    )}
                    <Form.Control type="file" onChange={handleFestivalFoto} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tekst</Form.Label>
                    <br />
                    <Editor
                        name="tekst"
                        onInit={(_evt, editor) =>
                            (editorTekst.current = editor)
                        }
                        value={editorTekst.content}
                        onEditorChange={(content) =>
                            handleEditorTekstChange(content, "editorTekst")
                        }
                        apiKey="03k8vwp18ao4tt5y19jbhgstzi8foquxopmba2mxieyujnv3"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: "code image link lists",
                            toolbar1:
                                "code | undo redo | styles fontsize | numlist bullist | blockquote  | paste pastetext | selectall",
                            toolbar2:
                                "formatSelect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | indent outdent | link unlink | forecolor backcolor hilitecolor | image  | removeformat ",
                            images_upload_url:
                                "http://127.0.0.1:8000/admin/uploadImage",
                            automatic_uploads: true,
                            images_reuse_filename: true,
                            images_upload_handler: handleImageUpload,
                        }}
                    />
                    {errors?.tekst && (
                        <span className="text-danger">{errors.tekst}</span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Repertoar</Form.Label>
                    <br />
                    <Editor
                        name="sadrzaj"
                        onEditorChange={handleEditorRepertoarChange}
                        onInit={(_evt, editor2) =>
                            (editorRepertoar.current = editor2)
                        }
                        value={editorRepertoar.content}
                        apiKey="03k8vwp18ao4tt5y19jbhgstzi8foquxopmba2mxieyujnv3"
                        init={{
                            height: 700,
                            menubar: false,
                            automatic_uploads: true,
                            plugins: "code image link lists",
                            toolbar1:
                                "code | undo redo | styles fontsize | numlist bullist | blockquote  | paste pastetext | selectall",
                            toolbar2:
                                "formatSelect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | indent outdent | link unlink | forecolor backcolor hilitecolor | image  | removeformat ",
                            images_upload_url:
                                "http://127.0.0.1:8000/admin/uploadImage",
                            automatic_uploads: true,
                            images_reuse_filename: true,
                            images_upload_handler: handleImageUpload,
                        }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default FestivaliCreateUpdate;
