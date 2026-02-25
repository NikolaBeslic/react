import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { slugify } from "../../../../lib/slugify";
import axiosClient from "../../../utils/axios";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-hot-toast";
import LoadingBackdrop from "../LoadingBackdrop";
import { csrf, getCookieValue } from "../../../utils";

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

    const [previewTekstPhoto, setPreviewTekstPhoto] = useState(null);

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
        setLoading(true);
        let isMounted = true;
        console.log("tekstid" + tekstid);
        setFormData({ ...formData, kategorijaid: kategorijaid });

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

        const fetchData = async () => {
            try {
                const requests = [
                    axiosClient.get("/admin/get-all-combobox-data"),
                ];

                if (tekstid) {
                    requests.push(axiosClient.get(`/get-tekst/${tekstid}`));
                }

                if (addHuPkast)
                    requests.push(
                        axiosClient.get("/admin/get-hupkast-platforme"),
                    );

                const [resCb, res, hupkastRes] = await Promise.all(requests);

                if (!isMounted) return;

                setSviAutori(resCb.data.autori);
                setSvePredstave(resCb.data.predstave);
                setSvaPozorista(resCb.data.pozorista);
                setSviTagovi(resCb.data.tagovi);
                setSviFestivali(resCb.data.festivali);

                if (hupkastRes) {
                    setHupkastPlatforme(hupkastRes.data);
                    console.log("hupkast platforme");
                    console.log(hupkastRes.data);

                    setFormData({
                        ...formData,
                        kategorijaid: 11,
                        sezona: 1,
                        epizoda: 1,
                        mp3_url: "",
                        hupkast_linkovi: [],
                    });
                }

                if (res) {
                    console.log(res.data);
                    setFormData({
                        ...res.data,
                        predstave: res.data.predstave?.map(
                            (pred) => pred.predstavaid,
                        ),
                        pozorista: res.data.pozorista?.map(
                            (poz) => poz.pozoristeid,
                        ),
                        tagovi: res.data.tagovi?.map((tag) => tag.tagid),
                        autori: res.data.autori?.map((a) => a.autorid),
                        sezona: res.data.hupkast?.sezona,
                        epizoda: res.data.hupkast?.epizoda,
                        mp3_url: res.data.hupkast?.mp3_url,
                        hupkast_linkovi: res.data.hupkast?.linkovi.map((hl) => {
                            (hl.pivot.platformaid, hl.pivot.hupkast_url);
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
                            })),
                        );
                    if (res.data.predstave)
                        setDbPredstave(
                            res.data.predstave.map((predstava) => ({
                                value: predstava.predstavaid,
                                label: predstava.naziv_predstave,
                            })),
                        );
                    if (res.data.pozorista)
                        setDbPozorista(
                            res.data.pozorista.map((poz) => ({
                                value: poz.pozoristeid,
                                label: poz.naziv_pozorista,
                            })),
                        );
                    if (res.data.tagovi)
                        setDbTagovi(
                            res.data.tagovi.map((tag) => ({
                                value: tag.tagid,
                                label: tag.tag_naziv,
                            })),
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
                            })),
                        );
                    }
                    setPreviewTekstPhoto(res.data.tekst_photo);
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
    }, [tekstid]);

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
        if (!event.target.files[0]) {
            setFormData({ ...formData, slika: null });
            setPreviewTekstPhoto(null);
        } else {
            setFormData({ ...formData, slika: event.target.files[0] });
            setPreviewTekstPhoto(URL.createObjectURL(event.target.files[0]));
        }
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

    const handleAutoriChange = (selectedAutori) => {
        console.log(selectedAutori);
        setFormData({
            ...formData,
            autori: selectedAutori.map((sa) => sa.value),
        });
        setDbAutori(selectedAutori);
    };

    const handleFestivalChange = (selectedFestival) => {
        console.log(selectedFestival);
        setFormData({
            ...formData,
            festivalid: selectedFestival.value,
        });
        setDbFestival(selectedFestival);
    };

    const handlePredstaveChange = (selectedPredstave) => {
        setFormData({
            ...formData,
            predstave: selectedPredstave.map((sp) => sp.value),
        });
        setDbPredstave(selectedPredstave);
    };

    const handlePozoristaChange = (selectedPozorista) => {
        setFormData({
            ...formData,
            pozorista: selectedPozorista.map((sp) => sp.value),
        });
        setDbPozorista(selectedPozorista);
    };

    const handleTagoviChange = (selectedTagovi) => {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrors({});
        linkovi.forEach((value, index) => {
            formData.hupkast_linkovi[index] = value;
            console.log(value);
        });
        console.log(formData);

        let storeUrl = "/admin/create-tekst";
        if (addHuPkast) storeUrl = "/admin/hupkast-store";
        if (addHuPikon) storeUrl = "/admin/hupikon-store";
        await csrf();
        if (formData.tekstid) {
            axiosClient
                .post("/admin/update-tekst", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                    },
                })
                .then((res) => {
                    console.log(res);
                    toast.success("Uspesno izmenjen tekst");
                })
                .catch((error) => {
                    console.error(error);
                    setErrors(error.response.data?.errors);
                    console.log(error.response.data);
                })
                .finally(() => setLoading(false));
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
                })
                .finally(() => setLoading(false));
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
        const platformaid = parseInt(
            event.target.getAttribute("data-platformaid"),
        );
        const matchedElement = newLinkovi.find(
            (obj) => obj?.platformaid == platformaid,
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
                    <LoadingBackdrop show={loading} text="Working..." />
                    <Form>
                        {addHuPkast ? (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Sezona</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="sezona"
                                        value={formData.sezona}
                                        onChange={handleChange}
                                    />
                                    {errors?.sezona && (
                                        <span className="text-danger">
                                            {errors.sezona}
                                        </span>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Epizoda</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="epizoda"
                                        value={formData.epizoda}
                                        onChange={handleChange}
                                    />
                                    {errors?.epizoda && (
                                        <span className="text-danger">
                                            {errors.epizoda}
                                        </span>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Link za mp3</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mp3_url"
                                        value={formData.mp3_url}
                                        onChange={handleChange}
                                    />
                                    {errors?.mp3_url && (
                                        <span className="text-danger">
                                            {errors.mp3_url}
                                        </span>
                                    )}
                                </Form.Group>
                                <h3>Linkovi</h3>
                                {hupkastPlatforme?.map((hp, i) => (
                                    <Form.Group className="mb-3" key={i}>
                                        <Form.Label>
                                            {hp.naziv_platforme}
                                        </Form.Label>
                                        <Form.Control
                                            data-platformaid={hp.platformaid}
                                            type="text"
                                            name="hupkast_linkovi"
                                            value={
                                                linkovi.find(
                                                    (obj) =>
                                                        obj?.platformaid ==
                                                        hp.platformaid,
                                                )?.hupkast_url
                                            }
                                            onChange={(event) =>
                                                handleLinkoviChange(i, event)
                                            }
                                        />
                                    </Form.Group>
                                ))}
                                <hr />
                            </>
                        ) : (
                            ""
                        )}
                        {addHuPikon ? (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Naslov HuPikona (izjava)
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="naslov_hupikona"
                                        value={formData.naslov_hupikona}
                                        onChange={handleChange}
                                    />
                                    {errors?.naslov_hupikona && (
                                        <span className="text-danger">
                                            {errors.naslov_hupikona}
                                        </span>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Sagovornik_ca</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sagovornik"
                                        value={formData.sagovornik}
                                        onChange={handleChange}
                                    />
                                    {errors?.sagovornik && (
                                        <span className="text-danger">
                                            {errors.sagovornik}
                                        </span>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Zanimanje</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="zanimanje_sagovornika"
                                        value={formData.zanimanje_sagovornika}
                                        onChange={handleChange}
                                    />
                                    {errors?.zanimanje_sagovornika && (
                                        <span className="text-danger">
                                            {errors.zanimanje_sagovornika}
                                        </span>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Mesto stanovanja</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mesto_stanovanja"
                                        value={formData.mesto_stanovanja}
                                        onChange={handleChange}
                                    />
                                    {errors?.mesto_stanovanja && (
                                        <span className="text-danger">
                                            {errors.mesto_stanovanja}
                                        </span>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Biografija</Form.Label>
                                    <Form.Control
                                        type="text"
                                        as="textarea"
                                        rows={5}
                                        name="biografija"
                                        value={formData.biografija}
                                        onChange={handleChange}
                                    />
                                    {errors?.biografija && (
                                        <span className="text-danger">
                                            {errors.biografija}
                                        </span>
                                    )}
                                </Form.Group>

                                <hr />
                            </>
                        ) : (
                            ""
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label>Naslov</Form.Label>
                            <Form.Control
                                type="text"
                                name="naslov"
                                value={formData.naslov}
                                onChange={handleChange}
                            />
                            {errors?.naslov && (
                                <span className="text-danger">
                                    {errors.naslov}
                                </span>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Slug</Form.Label>
                            <Form.Control
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                            />
                            {errors?.slug && (
                                <span className="text-danger">
                                    {errors.slug}
                                </span>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tekst foto</Form.Label>

                            {previewTekstPhoto && (
                                <div style={{ marginBottom: "10px" }}>
                                    <img
                                        src={previewTekstPhoto}
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
                                accept="image/*"
                                onChange={handleTekstPhoto}
                            />
                            {errors?.slika && (
                                <span className="text-danger">
                                    {errors.slika}
                                </span>
                            )}
                            {errors?.tekst_photo && (
                                <span className="text-danger">
                                    {errors.tekst_photo}
                                </span>
                            )}
                        </Form.Group>

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
                                        "editorUvod",
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
                                    images_upload_handler: handleImageUpload,
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Festival</Form.Label>
                            <Select
                                name="festivali"
                                options={optionsFestivali}
                                value={dbFestival}
                                onChange={handleFestivalChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Autori</Form.Label>
                            <Select
                                name="autori"
                                options={optionsAutori}
                                isMulti
                                value={dbAutori}
                                onChange={handleAutoriChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Predstave</Form.Label>
                            <Select
                                name="predstave"
                                options={optionsPredstave}
                                isMulti
                                value={dbPredstave}
                                onChange={handlePredstaveChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Pozorišta</Form.Label>
                            <Select
                                name="pozorista"
                                options={optionsPozorista}
                                isMulti
                                isSearchable
                                value={dbPozorista}
                                onChange={handlePozoristaChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tagovi</Form.Label>
                            <Select
                                name="tagovi"
                                options={optionsTagovi}
                                isMulti
                                onChange={handleTagoviChange}
                                value={dbTagovi}
                                isSearchable
                            />
                        </Form.Group>

                        <Button
                            size="large"
                            variant="primary"
                            type="submit"
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
