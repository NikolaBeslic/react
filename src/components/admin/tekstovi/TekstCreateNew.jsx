import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { slugify } from "../../../../lib/slugify";
import axiosClient from "../../../utils/axios";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-hot-toast";
import { Autocomplete, Button, FormControl, TextField } from "@mui/material";

const TekstCreateNew = ({ tekstid, kategorijaid }) => {
    const [formData, setFormData] = useState({
        kategorijaid: kategorijaid,
        naslov: "",
        slug: "",
        uvod: "",
        sadrzaj: "",
        autori: [],
        predstave: [],
        pozorista: [],
        tagovi: [],
        festivalid: null,
        // Add more fields as needed
    });

    const [sviAutori, setSviAutori] = useState([]);
    const [dbAutori, setDbAutori] = useState([]);

    const [svePredstave, setSvePredstave] = useState([]);
    const [dbPredstave, setDbPredstave] = useState([]);

    const [svaPozorista, setSvaPozorista] = useState([]);
    const [dbPozorista, setDbPozorista] = useState([]);

    const [sviTagovi, setSviTagovi] = useState([]);
    const [dbTagovi, setDbTagovi] = useState([]);

    const [sviFestivali, setSviFestivali] = useState([]);
    const [dbFestival, setDbFestival] = useState(null);

    useEffect(() => {
        console.log("tekstid" + tekstid);
        if (tekstid) {
            axiosClient
                .get(`/get-tekst/${tekstid}`)
                .then((res) => {
                    console.log(res.data);
                    setFormData({
                        ...res.data,
                        predstave: res.data.predstave?.map(
                            (pred) => pred.predstavaid
                        ),
                        pozorista: res.data.pozorista?.map(
                            (poz) => poz.pozoristeid
                        ),
                        tagovi: res.data.tagovi?.map((tag) => tag.tagid),
                        autori: res.data.autori?.map((a) => a.autorid),
                    });
                    editorSadrzaj.content = res.data.sadrzaj;
                    editorUvod.content = res.data.uvod;
                    if (res.data.festival)
                        setDbFestival({
                            value: res.data.festival.festivalid,
                            label: res.data.festival.naziv_festivala,
                        });
                    if (res.data.autori)
                        setDbAutori(
                            res.data.autori.map((autor) => ({
                                value: autor.autorid,
                                label: autor.ime_autora,
                            }))
                        );
                    if (res.data.predstave)
                        setDbPredstave(
                            res.data.predstave.map((predstava) => ({
                                value: predstava.predstavaid,
                                label: predstava.naziv_predstave,
                            }))
                        );
                    if (res.data.pozorista)
                        setDbPozorista(
                            res.data.pozorista.map((poz) => ({
                                value: poz.pozoristeid,
                                label: poz.naziv_pozorista,
                            }))
                        );
                    if (res.data.tagovi)
                        setDbTagovi(
                            res.data.tagovi.map((tag) => ({
                                value: tag.tagid,
                                label: tag.tag_naziv,
                            }))
                        );
                })
                .catch((error) => console.error(error));
        }
    }, [tekstid]);

    useEffect(() => {
        axiosClient
            .get("/get-autori")
            .then((res) => {
                setSviAutori(res.data.data);
            })
            .catch((error) => console.error(error));

        axiosClient
            .get("/get-all-predstave")
            .then((resPredstave) => {
                setSvePredstave(resPredstave.data);
            })
            .catch((error) => console.error(error));

        axiosClient
            .get("/get-all-pozorista")
            .then((resPozorista) => {
                setSvaPozorista(resPozorista.data);
            })
            .catch((error) => console.error(error));

        axiosClient
            .get("/get-all-tagovi")
            .then((resTagovi) => {
                setSviTagovi(resTagovi.data);
            })
            .catch((error) => console.error(error));

        axiosClient
            .get("/get-all-festivali")
            .then((resFestivali) => {
                setSviFestivali(resFestivali.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const optionsAutori = sviAutori?.map((autor) => ({
        value: autor.autorid,
        label: autor.ime_autora,
    }));

    const optionsPredstave = svePredstave.map((predstava) => ({
        value: predstava.predstavaid,
        label: predstava.naziv_predstave,
    }));

    const optionsPozorista = svaPozorista.map((pozoriste) => ({
        value: pozoriste.pozoristeid,
        label: pozoriste.naziv_pozorista,
    }));

    const optionsTagovi = sviTagovi.map((tag) => ({
        value: tag.tagid,
        label: tag.tag_naziv,
    }));

    const optionsFestivali = sviFestivali.map((festival) => ({
        value: festival.festivalid,
        label: festival.naziv_festivala,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "naslov") {
            const slug = slugify(value);
            formData.slug = slug;
        }
        setFormData({ ...formData, [name]: value });
    };

    const editorUvod = useRef(null);
    const handleEditorUvodChange = (content, editorId) => {
        setFormData({ ...formData, uvod: content });
        editorUvod.content = content;
    };

    const editorSadrzaj = useRef(null);
    const handleEditorSadrzajChange = (content) => {
        setFormData({ ...formData, sadrzaj: content });
        editorSadrzaj.content = content;
    };

    const handleAutoriChange = (event, selectedAutori) => {
        console.log(selectedAutori);
        setFormData({
            ...formData,
            autori: selectedAutori.map((sa) => sa.value),
        });
        setDbAutori(selectedAutori);
    };

    const handleFestivalChange = (event, selectedFestival) => {
        console.log(selectedFestival);
        setFormData({
            ...formData,
            festivalid: selectedFestival.value,
        });
        setDbFestival(selectedFestival);
    };

    const handlePredstaveChange = (event, selectedPredstave) => {
        setFormData({
            ...formData,
            predstave: selectedPredstave.map((sp) => sp.value),
        });
        setDbPredstave(selectedPredstave);
    };

    const handlePozoristaChange = (event, selectedPozorista) => {
        setFormData({
            ...formData,
            pozorista: selectedPozorista.map((sp) => sp.value),
        });
        setDbPozorista(selectedPozorista);
    };

    const handleTagoviChange = (event, selectedTagovi) => {
        setFormData({
            ...formData,
            tagovi: selectedTagovi.map((st) => st.value),
        });
        setDbTagovi(selectedTagovi);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        if (formData.tekstid) {
            axiosClient
                .put("/update-tekst", formData)
                .then((res) => console.log(res))
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
                });
        } else {
            axiosClient
                .post("/admin-create-tekst", formData)
                .then((res) => {
                    console.log(res);
                    toast.succes("Uspesno dodat tekst");
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
                });
        }
    };

    editorSadrzaj.activeEditor?.getFlmngr((Flmngr) => {
        Flmngr.open({
            // Do not specify here 'apiKey', 'urlFileManager', 'urlFiles'
            // and 'imageFormats' again (they were passed in TinyMCE initialization code)
            // createImageFormats: ["preview"],                     // return these format IDs
            acceptExtensions: ["png", "jpeg", "jpg", "webp"], // accept images only
            isMultiple: false, // let selecting a single file
            onFinish: (files) => {
                // Selected image (isMultiple == false returns always a single file)
                let file = files[0];
                console.log(file);
                file.url = file.url.replace("api/flmngr/", "slike/");
                console.log("Original image: " + file.url);
            },
        });
    });

    return (
        <>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <Form>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <TextField
                                name="naslov"
                                label="Naslov"
                                variant="standard"
                                value={formData.naslov}
                                onChange={handleChange}
                                fullWidth
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <TextField
                                name="slug"
                                label="Slug"
                                variant="standard"
                                value={formData.slug}
                                onChange={handleChange}
                                fullWidth
                            />
                        </FormControl>

                        <Form.Group className="form-group mb-3">
                            <Form.Label>Uvod</Form.Label>
                            <br />
                            <Editor
                                name="uvod"
                                onInit={(_evt, editor) =>
                                    (editorUvod.current = editor)
                                }
                                value={editorUvod.content}
                                onEditorChange={(content) =>
                                    handleEditorUvodChange(
                                        content,
                                        "editorUvod"
                                    )
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
                        <Form.Group className="form-group mb-3">
                            <Form.Label>Tekst</Form.Label>
                            <br />
                            <Editor
                                name="sadrzaj"
                                onEditorChange={handleEditorSadrzajChange}
                                onInit={(_evt, editor2) =>
                                    (editorSadrzaj.current = editor2)
                                }
                                value={editorSadrzaj.content}
                                apiKey="03k8vwp18ao4tt5y19jbhgstzi8foquxopmba2mxieyujnv3"
                                init={{
                                    height: 700,
                                    menubar: false,
                                    automatic_uploads: true,
                                    external_plugins: {
                                        filemanager:
                                            "https://hocupozoriste.rs/filemanager/plugin.min.js",
                                    },
                                    plugins:
                                        "code image link lists file-manager",
                                    toolbar1:
                                        "code | undo redo | styles fontsize | numlist bullist | blockquote  | paste pastetext | selectall",
                                    toolbar2:
                                        "formatSelect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | indent outdent | link unlink | forecolor backcolor hilitecolor | image  | removeformat Flmngr,Upload,ImgPen",
                                    Flmngr: {
                                        apiKey: "8vVOggwO",
                                        urlFileManager:
                                            "http://localhost:8000/api/flmngr",
                                        urlFiles:
                                            "http://localhost:8000/api/flmngr", // demo server
                                    },
                                }}
                            />
                        </Form.Group>

                        <Autocomplete
                            name="festival"
                            options={optionsFestivali}
                            value={dbFestival}
                            onChange={handleFestivalChange}
                            sx={{ mb: 2 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Festivali"
                                    fullWidth
                                    style={{ fontSize: "1.2rem" }}
                                />
                            )}
                        />

                        <Autocomplete
                            name="autori"
                            options={optionsAutori}
                            multiple
                            value={dbAutori}
                            onChange={handleAutoriChange}
                            sx={{ mb: 2 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Autori"
                                    fullWidth
                                    style={{ fontSize: "1.2rem" }}
                                />
                            )}
                        />

                        <Autocomplete
                            name="predstave"
                            options={optionsPredstave}
                            multiple
                            value={dbPredstave}
                            onChange={handlePredstaveChange}
                            sx={{ mb: 2 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Predstave"
                                    fullWidth
                                    style={{ fontSize: "1.2rem" }}
                                />
                            )}
                        />

                        <FormControl
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                        >
                            <Autocomplete
                                name="pozorista"
                                options={optionsPozorista}
                                multiple
                                value={dbPozorista}
                                onChange={handlePozoristaChange}
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

                        <Autocomplete
                            name="tagovi"
                            options={optionsTagovi}
                            multiple
                            value={dbTagovi}
                            onChange={handleTagoviChange}
                            sx={{ mb: 2 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Tagovi"
                                    fullWidth
                                    style={{ fontSize: "1.2rem" }}
                                />
                            )}
                        />

                        {/* <Select name='tagovi' options={optionsTagovi} isMulti={true} onChange={handleTagoviChange} value={dbTagovi} isSearchable={true} /> */}

                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Form>
                </div>

                <div className="col-md-2"></div>
            </div>
        </>
    );
};

export default TekstCreateNew;
