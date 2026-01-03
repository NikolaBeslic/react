import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axios";
import { slugify } from "../../../../lib/slugify";
import {
    Autocomplete,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    TextField,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-hot-toast";

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
    const [errors, setErrors] = useState({});
    const [svaPozorista, setSvaPozorista] = useState([]);
    const [dbPozorista, setDbPozorista] = useState([]);
    const [predstavaImage, setPredstavaImage] = useState(null);
    const optionsPozorista = svaPozorista?.map((pozoriste) => ({
        value: pozoriste.pozoristeid,
        label: pozoriste.naziv_pozorista,
    }));

    useEffect(() => {
        axiosClient
            .get("/admin/get-all-pozorista")
            .then((res) => setSvaPozorista(res.data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (predstavaid) {
            axiosClient
                .get(`/admin/get-single-predstava/${predstavaid}`)
                .then((res) => {
                    setFormData(res.data);
                    setPredstavaImage(res.data.plakat);
                    editorOpis.content = res.data.opis;
                    editorUloge.content = res.data.uloge;
                    if (res.data.pozorista)
                        setDbPozorista(
                            res.data.pozorista.map((poz) => ({
                                value: poz.pozoristeid,
                                label: poz.naziv_pozorista,
                            }))
                        );
                })
                .catch((err) => console.error(err));
        }
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

    const handlePozoristaChange = (event, selectedPozorista) => {
        setFormData({
            ...formData,
            pozorista: selectedPozorista.map((sp) => sp.value),
        });
        setDbPozorista(selectedPozorista);
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
            <Stack
                component="form"
                direction="column"
                spacing={2}
                alignItems="center"
                sx={{ width: 700 }}
                marginX={"auto"}
            >
                <FormControl fullWidth>
                    <Autocomplete
                        name="pozorista"
                        options={optionsPozorista}
                        multiple
                        value={dbPozorista}
                        onChange={handlePozoristaChange}
                        sx={{ mb: 2 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Pozorista"
                                fullWidth
                                style={{ fontSize: "1.2rem" }}
                            />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name="naziv_predstave"
                        label="Naziv predstave"
                        variant="outlined"
                        value={formData.naziv_predstave}
                        onChange={handleChange}
                    />
                    {errors?.naziv_predstave && (
                        <span className="text-danger">
                            {errors.naziv_predstave}
                        </span>
                    )}
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name="predstava_slug"
                        label="Slug"
                        variant="outlined"
                        value={formData.predstava_slug}
                        onChange={handleChange}
                    />
                    {errors?.predstava_slug && (
                        <span className="text-danger">
                            {errors.predstava_slug}
                        </span>
                    )}
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name="autor"
                        label="Autor_ka"
                        variant="outlined"
                        value={formData.autor}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name="reditelj"
                        label="Reditelj_ka"
                        variant="outlined"
                        value={formData.reditelj}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Premijera</FormLabel>
                    <input
                        type="date"
                        name="premijera"
                        value={formData.premijera}
                        className="form-control"
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Plakat</FormLabel>

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
                    <Input
                        type="file"
                        onChange={handlePredstavaImageChange}
                        accept="image/png, image/gif, image/jpeg"
                    />
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel>Opis</FormLabel>
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
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel>Uloge</FormLabel>
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
                </FormControl>
                <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Stack>
        </>
    );
};

export default PredstaveCreateUpdate;
