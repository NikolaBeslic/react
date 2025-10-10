import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { slugify } from "../../../../lib/slugify";
import axiosClient from "../../../utils/axios";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-hot-toast";
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormLabel,
    Grid2,
    TextField,
} from "@mui/material";

const TekstCreateNew = ({ tekstid, kategorijaid, addHuPkast, addHuPikon }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        kategorijaid: 0,
        naslov: "",
        slug: "",
        uvod: "",
        sadrzaj: "",
        autori: [],
        predstave: [],
        pozorista: [],
        tagovi: [],
        festivalid: null,
        tekst_photo: "",
        slika: null,

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

    const [hupkastPlatforme, setHupkastPlatforme] = useState([]);
    const [linkovi, setLinkovi] = useState([]);

    useEffect(() => {
        console.log("tekstid" + tekstid);
        if (tekstid) {
            setLoading(true);
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
                        sezona: res.data.hupkast?.sezona,
                        epizoda: res.data.hupkast?.epizoda,
                        mp3_url: res.data.hupkast?.mp3_url,
                        hupkast_linkovi: res.data.hupkast?.linkovi.map((hl) => {
                            hl.pivot.platformaid, hl.pivot.hupkast_url;
                        }),

                        naslov_hupikona: res.data.hupikon?.naslov_hupikona,
                        sagovornik: res.data.hupikon?.sagovornik,
                        zanimanje_sagovornika: res.data.hupikon?.sagovornik,
                        mesto_stanovanja: res.data.hupikon?.mesto_stanovanja,
                        biografija: res.data.hupikon?.biografija,
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
                    // if (res.data.hupkast)
                    //     setFormData({
                    //         ...formData,
                    //         sezona: res.data.hupkast.sezona,
                    //         epizoda: res.data.hupkast.epizoda,
                    //         mp3_url: res.data.hupkast.mp3_url,
                    //     });
                    if (res.data.hupkast?.linkovi) {
                        setLinkovi(
                            res.data.hupkast.linkovi.map((hl) => ({
                                platformaid: hl.pivot.platformaid,
                                hupkast_url: hl.pivot.hupkast_url,
                            }))
                        );
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [tekstid]);

    useEffect(() => {
        setFormData({ ...formData, kategorijaid: kategorijaid });

        if (addHuPkast) {
            setLoading(true);
            axiosClient
                .get("/admin/get-hupkast-platforme")
                .then((res) => {
                    setHupkastPlatforme(res.data);
                    console.log("hupkast platforme");
                    console.log(res.data);
                })
                .catch((error) => console.error(error));

            setFormData({
                ...formData,
                kategorijaid: 11,
                sezona: 1,
                epizoda: 1,
                mp3_url: "",
                hupkast_linkovi: [],
            });
        }
        if (addHuPikon) {
            setFormData({
                ...formData,
                kategorijaid: 5,
                naslov_hupikona: "",
                sagovornik: "",
                zanimanje_sagovornika: "",
                mesto_stanovanja: "",
                biografija: "",
            });
        }

        axiosClient
            .get("/get-autori")
            .then((res) => {
                setSviAutori(res.data);
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
        setLoading(false);
    }, []);

    const optionsAutori = sviAutori?.map((autor) => ({
        value: autor.autorid,
        label: autor.ime_autora,
    }));

    const optionsPredstave = svePredstave.map((predstava) => ({
        value: predstava.predstavaid,
        label: predstava.naziv_predstave,
        key: predstava.predstavaid,
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

    const handleTekstPhoto = (event) => {
        console.log(event.target.files[0]);
        setFormData({ ...formData, slika: event.target.files[0] });
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

    /* This one is for tiny mce */
    const handleImageUpload = async (blobInfo) => {
        let formDataTinyMce = new FormData();
        formDataTinyMce.append("kategorijaid", kategorijaid);
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
                }
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

    const handleSubmit = (event) => {
        event.preventDefault();
        linkovi.forEach((value, index) => {
            formData.hupkast_linkovi[index] = value;
            console.log(value);
        });
        console.log(formData);
        let storeUrl = "/admin/create-tekst";
        if (addHuPkast) storeUrl = "/admin/hupkast-store";
        if (addHuPikon) storeUrl = "/admin/hupikon-store";
        if (formData.tekstid) {
            axiosClient
                .put("/update-tekst", formData)
                .then((res) => console.log(res))
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data);
                });
        } else {
            axiosClient
                .post(storeUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    setErrors({});
                    console.log(res);
                    toast.success("Uspesno dodat tekst");
                })
                .catch((error) => {
                    console.error(error.response.data.errors);
                    setErrors(error.response.data.errors);
                    console.error(error);
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

    const handleLinkoviChange = (index, event) => {
        const newLinkovi = [...linkovi];
        debugger;
        const platformaid = parseInt(
            event.target.getAttribute("data-platformaid")
        );
        const matchedElement = newLinkovi.find(
            (obj) => obj?.platformaid == platformaid
        );
        if (matchedElement) {
            matchedElement.hupkast_url = event.target.value;
            console.log(newLinkovi);
        } else {
            newLinkovi.push({
                platformaid: platformaid,
                hupkast_url: event.target.value,
            });
        }
        setLinkovi(newLinkovi);
        setFormData({ ...formData, hupkast_linkovi: newLinkovi });
    };

    return (
        <>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    {loading && <CircularProgress />}
                    {!loading && (
                        <Form>
                            {addHuPkast ? (
                                <Box sx={{ flexGrow: 1, my: 3 }}>
                                    <Grid2
                                        container
                                        spacing={2}
                                        alignItems="center"
                                        sx={{ width: 500, mb: 2 }}
                                        marginX={"auto"}
                                    >
                                        <TextField
                                            name="sezona"
                                            label="Sezona"
                                            variant="outlined"
                                            type="number"
                                            value={formData.sezona}
                                            onChange={handleChange}
                                            width={40}
                                            slotProps={{
                                                inputLabel: { shrink: true },
                                            }}
                                        />
                                        <TextField
                                            name="epizoda"
                                            label="Epizoda"
                                            variant="outlined"
                                            type="number"
                                            value={formData.epizoda}
                                            onChange={handleChange}
                                            width={40}
                                            slotProps={{
                                                inputLabel: { shrink: true },
                                            }}
                                        />
                                    </Grid2>
                                    <TextField
                                        name="mp3_url"
                                        label="Link za mp3"
                                        variant="standard"
                                        value={formData.mp3_url}
                                        onChange={handleChange}
                                        fullWidth
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                        }}
                                    />
                                    <h4>Linkovi</h4>
                                    {hupkastPlatforme?.map((hp, i) => (
                                        <TextField
                                            name="hupkast_linkovi"
                                            label={hp.naziv_platforme}
                                            variant="standard"
                                            slotProps={{
                                                htmlInput: {
                                                    "data-platformaid":
                                                        hp.platformaid,
                                                },
                                                inputLabel: { shrink: true },
                                            }}
                                            onChange={(event) =>
                                                handleLinkoviChange(i, event)
                                            }
                                            value={
                                                linkovi.find(
                                                    (obj) =>
                                                        obj?.platformaid ==
                                                        hp.platformaid
                                                )?.hupkast_url
                                            }
                                            fullWidth
                                            sx={{ mt: 1 }}
                                            key={i}
                                        />
                                    ))}
                                    <hr />
                                </Box>
                            ) : (
                                ""
                            )}
                            {addHuPikon ? (
                                <Box sx={{ flexGrow: 1, my: 3 }}>
                                    <TextField
                                        name="naslov_hupikona"
                                        label="Naslov HuPikona (izjava)"
                                        variant="standard"
                                        value={formData.naslov_hupikona}
                                        onChange={handleChange}
                                        fullWidth
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                        }}
                                    />
                                    <TextField
                                        name="sagovornik"
                                        label="Sagovornik_ca"
                                        variant="standard"
                                        value={formData.sagovornik}
                                        onChange={handleChange}
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                        }}
                                        fullWidth
                                    />

                                    <TextField
                                        name="zanimanje_sagovornika"
                                        label="Zanimanje"
                                        variant="standard"
                                        value={formData.zanimanje_sagovornika}
                                        onChange={handleChange}
                                        fullWidth
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                        }}
                                    />
                                    <TextField
                                        name="mesto_stanovanja"
                                        label="Mesto"
                                        variant="standard"
                                        value={formData.mesto_stanovanja}
                                        onChange={handleChange}
                                        fullWidth
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                        }}
                                    />

                                    <TextField
                                        name="biografija"
                                        label="Biografija"
                                        variant="standard"
                                        value={formData.biografija}
                                        onChange={handleChange}
                                        fullWidth
                                        rows={5}
                                        multiline
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                        }}
                                    />

                                    <hr />
                                </Box>
                            ) : (
                                ""
                            )}

                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <TextField
                                    name="naslov"
                                    label="Naslov"
                                    variant="standard"
                                    value={formData.naslov}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                {errors?.naslov && (
                                    <span className="text-danger">
                                        {errors.naslov}
                                    </span>
                                )}
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
                                {errors?.slug && (
                                    <span className="text-danger">
                                        {errors.slug}
                                    </span>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <FormLabel>Tekst foto</FormLabel>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleTekstPhoto}
                                />
                                {errors?.slika && (
                                    <span className="text-danger">
                                        {errors.slika}
                                    </span>
                                )}
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
                                {errors?.uvod && (
                                    <span className="text-danger">
                                        {errors.uvod}
                                    </span>
                                )}
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
                                        plugins: "code image link lists",
                                        toolbar1:
                                            "code | undo redo | styles fontsize | numlist bullist | blockquote  | paste pastetext | selectall",
                                        toolbar2:
                                            "formatSelect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | indent outdent | link unlink | forecolor backcolor hilitecolor | image  | removeformat ",
                                        images_upload_url:
                                            "http://127.0.0.1:8000/admin/uploadImage",
                                        automatic_uploads: true,
                                        images_reuse_filename: true,
                                        images_upload_handler:
                                            handleImageUpload,
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
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option.predstavaid}>
                                            {option.label}
                                        </li>
                                    );
                                }}
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
                    )}
                </div>

                <div className="col-md-2"></div>
            </div>
        </>
    );
};

export default TekstCreateNew;
