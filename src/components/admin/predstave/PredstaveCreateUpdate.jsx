import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axios";
import { slugify } from "../../../../lib/slugify";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-hot-toast";
import { Button, Form } from "react-bootstrap";
import LoadingBackdrop from "../LoadingBackdrop";

const PredstaveCreateUpdate = ({ predstavaid }) => {
    const [formData, setFormData] = useState({
        naziv_predstave: "",
        predstava_slug: "",
        premijera: "",
        autor: "",
        reditelj: "",
        opis: "",
        uloge: "",
        plakat: "",
        pozorista: [],
        slika: null,
    });

    const [svaPozorista, setSvaPozorista] = useState([]);
    const [dbPozorista, setDbPozorista] = useState([]);

    const optionsPozorista = svaPozorista?.map((pozoriste) => ({
        value: pozoriste.pozoristeid,
        label: pozoriste.naziv_pozorista,
    }));

    const [sviZanrovi, setSviZanrovi] = useState([]);
    const [dbZanrovi, setDbZanrovi] = useState([]);

    const optionsZanrovi = sviZanrovi?.map((zanr) => ({
        value: zanr.zanrid,
        label: zanr.naziv_zanra,
    }));

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [predstavaImage, setPredstavaImage] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);

            try {
                const requests = [
                    axiosClient.get("/admin/get-all-pozorista"),
                    axiosClient.get("/admin/zanrovi"),
                ];

                if (predstavaid) {
                    requests.push(
                        axiosClient.get(
                            `/admin/get-single-predstava/${predstavaid}`,
                        ),
                    );
                }

                const [pozoristaRes, zanroviRes, predstavaRes] =
                    await Promise.all(requests);

                if (!isMounted) return;

                setSvaPozorista(pozoristaRes.data);
                setSviZanrovi(zanroviRes.data);

                if (predstavaRes) {
                    console.log(predstavaRes.data);

                    setFormData(predstavaRes.data);
                    setPredstavaImage(predstavaRes.data.plakat);
                    editorOpis.content = predstavaRes.data.opis;
                    editorUloge.content = predstavaRes.data.uloge;
                    if (predstavaRes.data.pozorista)
                        setDbPozorista(
                            predstavaRes.data.pozorista.map((poz) => ({
                                value: poz.pozoristeid,
                                label: poz.naziv_pozorista,
                            })),
                        );
                    if (predstavaRes.data.zanrovi)
                        setDbZanrovi(
                            predstavaRes.data.zanrovi.map((zanr) => ({
                                value: zanr.zanrid,
                                label: zanr.naziv_zanra,
                            })),
                        );
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
    }, [predstavaid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "naziv_predstave") {
            const slug = slugify(value);
            formData.predstava_slug = slug;
        }
        setFormData({ ...formData, [name]: value });
    };

    const editorOpis = useRef(null);
    const handleEditorOpisChange = (content, editorId) => {
        setFormData({ ...formData, opis: content });
        editorOpis.content = content;
    };

    const editorUloge = useRef(null);
    const handleEditorUlogeChange = (content, editorId) => {
        setFormData({ ...formData, uloge: content });
        editorUloge.content = content;
    };

    const handlePozoristaChange = (selectedPozorista) => {
        console.log(selectedPozorista);

        setFormData({
            ...formData,
            pozorista: selectedPozorista.map((option) => option.value),
        });
        setDbPozorista(selectedPozorista);
    };

    const handleZanroviChange = (selectedZanrovi) => {
        setFormData({
            ...formData,
            pozorista: selectedZanrovi.map((option) => option.value),
        });
        setDbPozorista(selectedZanrovi);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        if (formData.predstavaid) {
            axiosClient
                .post("/admin/update-predstava", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res);
                    toast.success("Predstava uspesno izmenjena");
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
                });
        } else {
            axiosClient
                .post("/admin/create-predstava", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res);
                    setErrors({});
                    toast.success("Predstava uspesno dodata");
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
                    setErrors(error.response.data.errors);
                });
        }
    };

    const handlePredstavaImageChange = (event) => {
        if (!event.target.files[0]) {
            setFormData({ ...formData, slika: null });
            setPredstavaImage(null);
        } else {
            setFormData({ ...formData, slika: event.target.files[0] });
            setPredstavaImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <>
            <LoadingBackdrop show={loading} text="Working..." />
            <Form onSubmit={handleSubmit} className="w-50 m-auto">
                <Form.Group className="mb-3">
                    <Form.Label>Pozorista</Form.Label>
                    <Select
                        name="pozorista"
                        options={optionsPozorista}
                        isMulti
                        value={dbPozorista}
                        onChange={handlePozoristaChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Naziv predstave</Form.Label>
                    <Form.Control
                        type="text"
                        name="naziv_predstave"
                        value={formData.naziv_predstave}
                        onChange={handleChange}
                    />
                    {errors?.naziv_predstave && (
                        <span className="text-danger">
                            {errors.naziv_predstave}
                        </span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="text"
                        name="predstava_slug"
                        value={formData.predstava_slug}
                        onChange={handleChange}
                    />
                    {errors?.predstava_slug && (
                        <span className="text-danger">
                            {errors.predstava_slug}
                        </span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Autor_ka</Form.Label>
                    <Form.Control
                        type="text"
                        name="autor"
                        value={formData.autor}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Reditelj_ka</Form.Label>
                    <Form.Control
                        type="text"
                        name="reditelj"
                        value={formData.reditelj}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Premijera</Form.Label>
                    <Form.Control
                        type="date"
                        name="premijera"
                        value={formData.premijera}
                        className="form-control"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Plakat</Form.Label>

                    {predstavaImage && (
                        <div style={{ marginBottom: "10px" }}>
                            <img
                                src={predstavaImage}
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
                        onChange={handlePredstavaImageChange}
                        accept="image/png, image/gif, image/jpeg"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Opis</Form.Label>
                    <Editor
                        name="opis"
                        onInit={(_evt, editor) => (editorOpis.current = editor)}
                        value={editorOpis.content}
                        onEditorChange={(content) =>
                            handleEditorOpisChange(content, "editorOpis")
                        }
                        apiKey="03k8vwp18ao4tt5y19jbhgstzi8foquxopmba2mxieyujnv3"
                        init={{
                            height: 200,
                            menubar: false,
                            toolbar:
                                "undo redo | bold italic underline strikethrough | removeformat",
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Uloge</Form.Label>
                    <Editor
                        name="uloge"
                        onInit={(_evt, editor) => (editorOpis.current = editor)}
                        value={editorUloge.content}
                        onEditorChange={(content) =>
                            handleEditorUlogeChange(content, "editorOpis")
                        }
                        apiKey="03k8vwp18ao4tt5y19jbhgstzi8foquxopmba2mxieyujnv3"
                        init={{
                            height: 400,
                            menubar: false,
                            toolbar:
                                "undo redo | bold italic underline strikethrough  forecolor  | removeformat",
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Žanrovi</Form.Label>
                    <Select
                        name="zanrovi"
                        options={optionsZanrovi}
                        isMulti
                        value={dbZanrovi}
                        onChange={handleZanroviChange}
                    />
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

export default PredstaveCreateUpdate;
