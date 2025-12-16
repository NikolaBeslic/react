import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { slugify } from "../../../../lib/slugify";
import axiosClient from "../../../utils/axios";
import { toast } from "react-hot-toast";

const AutoriCreateUpdate = ({ autorid }) => {
    const [gradovi, setGradovi] = useState([]);
    const [autorImage, setAutorImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        ime_autora: "",
        autor_slug: "",
        pozicija: "",
        url_slike: "t",
        biografija: "",
        gradid: 1,
        slika: null,
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
        if (autorid) {
            axiosClient
                .get(`/admin/get-single-autor/${autorid}`)
                .then((res) => {
                    console.log(res.data);
                    setFormData({ ...res.data });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
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

    const handleFile = (event) => {
        console.log(event.target.files[0]);
        setFormData({ ...formData, slika: event.target.files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        if (formData.autorid) {
            axiosClient
                .put("/admin/update-autor", formData)
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
            <Stack
                component="form"
                direction="column"
                spacing={2}
                alignItems="left"
                sx={{ width: 500 }}
                marginX={"auto"}
            >
                <FormControl fullWidth>
                    <TextField
                        name="ime_autora"
                        label="Ime autora"
                        variant="outlined"
                        value={formData.ime_autora}
                        onChange={handleChange}
                    />
                    {errors?.ime_autora && (
                        <span className="text-danger">{errors.ime_autora}</span>
                    )}
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name="autor_slug"
                        label="Slug"
                        variant="outlined"
                        value={formData.autor_slug}
                        onChange={handleChange}
                    />
                    {errors?.autor_slug && (
                        <span className="text-danger">{errors.autor_slug}</span>
                    )}
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name="pozicija"
                        label="Pozicija"
                        variant="outlined"
                        value={formData.pozicija}
                        onChange={handleChange}
                    />
                    {errors?.pozicija && (
                        <span className="text-danger">{errors.pozicija}</span>
                    )}
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name="biografija"
                        label="Biografija"
                        variant="outlined"
                        value={formData.biografija}
                        onChange={handleChange}
                        multiline={true}
                    />
                </FormControl>
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
                            <MenuItem key={grad.gradid} value={grad.gradid}>
                                {grad.naziv_grada}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Foto</FormLabel>
                    <Input
                        type="file"
                        onChange={handleFile}
                        accept="image/png, image/gif, image/jpeg"
                    />
                </FormControl>

                <FormControl>
                    <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        sx={{ width: 100, alignSelf: "center" }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </FormControl>
            </Stack>
        </>
    );
};

export default AutoriCreateUpdate;
