import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid2,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axios";
import { slugify } from "../../../../lib/slugify";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import { useStateContext } from "../../../contexts/StateContext";
import { Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";

const FestivaliCreateUpdate = ({ festivalid }) => {
    const router = useRouter();
    const { isLoading, showLoading, hideLoading } = useStateContext();

    const [festival, setFestival] = useState([]);
    const [festivalImage, setFestivalImage] = useState(null);
    const [gradovi, setGradovi] = useState([]);
    const [errors, setErrors] = useState({});
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
        axiosClient
            .get("/admin/get-gradovi")
            .then((res) => {
                setGradovi(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
        if (festivalid) {
            axiosClient
                .get(`/admin/get-single-festival/${festivalid}`)
                .then((res) => {
                    console.log(res.data);
                    setFormData({
                        ...res.data,
                    });
                    setFestivalImage(res.data.festival_slika);
                    setDatumod(moment(res.data.datumod));
                    setDatumdo(moment(res.data.datumdo));
                    editorTekst.content = res.data.tekst_festivala;
                    editorRepertoar.content = res.data.repertoar;
                    // setDatumod(res.data.datumod);
                    // setDatumdo(res.data.datumdo);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
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
            <div className="container">
                <Box
                    sx={{ flexGrow: 1, my: 3, mx: "auto" }}
                    alignItems={"center"}
                >
                    {isLoading && (
                        <Spinner
                            animation="border"
                            role="status"
                            className="hup-spinner"
                        />
                    )}
                    <Grid2
                        container
                        spacing={2}
                        sx={{ width: 800, mb: 2 }}
                        marginX={"auto"}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Grad</InputLabel>
                            <Select
                                labelId="select-label"
                                name="grad"
                                label="Grad"
                                value={formData.gradid ?? ""}
                                onChange={handleGradSelectChange}
                                sx={{ mb: 2 }}
                                variant="outlined"
                                MenuProps={MenuProps}
                            >
                                {gradovi.map((grad) => (
                                    <MenuItem
                                        key={grad.gradid}
                                        value={grad.gradid}
                                    >
                                        {grad.naziv_grada}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Datum od"
                                name="datumod"
                                value={datumod}
                                onChange={(value) => setDatumod(value)}
                            />
                            <DatePicker
                                label="Datum do"
                                name="datumdo"
                                value={datumdo}
                                onChange={(value) => setDatumdo(value)}
                            />
                        </LocalizationProvider>
                        <FormControl fullWidth>
                            <TextField
                                name="naziv_festivala"
                                label="Naziv festivala"
                                variant="outlined"
                                value={formData.naziv_festivala}
                                onChange={handleChange}
                            />
                            {errors?.naziv_festivala && (
                                <span className="text-danger">
                                    {errors.naziv_festivala}
                                </span>
                            )}
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                name="festival_slug"
                                label="Slug"
                                variant="outlined"
                                value={formData.festival_slug}
                                onChange={handleChange}
                            />
                            {errors?.festival_slug && (
                                <span className="text-danger">
                                    {errors.festival_slug}
                                </span>
                            )}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <FormLabel>Festival foto</FormLabel>
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
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFestivalFoto}
                            />
                            {errors?.festival_slika && (
                                <span className="text-danger">
                                    {errors.festival_slika}
                                </span>
                            )}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <FormLabel>Tekst</FormLabel>
                            <br />
                            <Editor
                                name="tekst"
                                onInit={(_evt, editor) =>
                                    (editorTekst.current = editor)
                                }
                                value={editorTekst.content}
                                onEditorChange={(content) =>
                                    handleEditorTekstChange(
                                        content,
                                        "editorTekst"
                                    )
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
                                <span className="text-danger">
                                    {errors.tekst}
                                </span>
                            )}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <FormLabel>Repertoar</FormLabel>
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
                        </FormControl>

                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid2>
                </Box>
            </div>
        </>
    );
};

export default FestivaliCreateUpdate;
