import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import { ColorPicker } from "primereact/colorpicker";
import { useEffect, useState } from "react";
import { slugify } from "../../../../lib/slugify";
import axiosClient from "../../../utils/axios";
import { toast } from "react-hot-toast";

const KategorijaCreate = ({ kategorijaid }) => {
    const [color, setColor] = useState(null);
    const [sveKategorije, setSveKategorije] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        naziv_kategorije: "",
        kategorija_slug: "",
        parent_kategorija: "",
    });

    useEffect(() => {
        axiosClient
            .get("/admin/get-sve-kategorije")
            .then((res) => {
                setSveKategorije(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
        if (kategorijaid) {
            axiosClient
                .get(`/admin/get-single-kategorija/${kategorijaid}`)
                .then((res) => {
                    console.log(res.data);
                    setFormData({ ...res.data });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [kategorijaid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "naziv_kategorije") {
            const slug = slugify(value);
            formData.kategorija_slug = slug;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleColorChange = (e) => {
        setColor(e.value);
        setFormData({ ...formData, kategorija_boja: `#${e.value}` });
    };

    const handleParentKategorijaChange = (event) => {
        console.log(event.target.value);
        setFormData({ ...formData, parent_kategorija: event.target.value });
    };

    const optionsKategorije = sveKategorije.map((kategorija) => ({
        value: kategorija.kategorijaid,
        label: kategorija.naziv_kategorije,
    }));

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        if (formData.kategorijaid) {
            axiosClient
                .put("/admin/update-kategorija", formData)
                .then((res) => {
                    console.log(res);
                    toast.success("Uspešno sačuvane izmene");
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
                });
        } else {
            axiosClient
                .post("/admin/create-kategorija", formData)
                .then((res) => {
                    console.log(res);
                    setErrors({});
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
                    setErrors(error.response.data.errors);
                });
        }
    };
    const handleSuccess = () => {
        toast.success("This is a success message!");
    };

    return (
        <>
            <Stack
                component="form"
                direction="column"
                spacing={2}
                alignItems="center"
                sx={{ width: 300 }}
                marginX={"auto"}
            >
                <FormControl>
                    <TextField
                        name="naziv_kategorije"
                        label="Naziv kategorije"
                        variant="outlined"
                        value={formData.naziv_kategorije}
                        onChange={handleChange}
                    />
                    {errors?.naziv_kategorije && (
                        <span className="text-danger">
                            {errors.naziv_kategorije}
                        </span>
                    )}
                </FormControl>
                <FormControl>
                    <TextField
                        name="kategorija_slug"
                        label="Slug"
                        variant="outlined"
                        value={formData.kategorija_slug}
                        onChange={handleChange}
                    />
                    {errors?.kategorija_slug && (
                        <span className="text-danger">
                            {errors.kategorija_slug}
                        </span>
                    )}
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="select-label">NadKategorija</InputLabel>
                    <Select
                        labelId="select-label"
                        name="parentkategorija"
                        options={optionsKategorije}
                        label="Nadkategorija"
                        value={formData.parent_kategorija ?? ""}
                        onChange={handleParentKategorijaChange}
                        sx={{ mb: 2 }}
                        variant="outlined"
                    >
                        {sveKategorije.map((kat) => (
                            <MenuItem
                                key={kat.kategorijaid}
                                value={kat.kategorijaid}
                            >
                                {kat.naziv_kategorije}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <ColorPicker
                        name="kategorija_boja"
                        value={formData.kategorija_boja}
                        onChange={handleColorChange}
                    />
                    {errors?.kategorija_boja && (
                        <span className="text-danger">
                            {errors.kategorija_boja}
                        </span>
                    )}
                </FormControl>
                <FormControl>
                    Preview:{" "}
                    <a
                        href={`/${formData.kategorija_slug}`}
                        className={`post-cat cat-btn ${formData.naziv_kategorije}-tag-bg-color`}
                        style={{ backgroundColor: formData.kategorija_boja }}
                    >
                        {formData.naziv_kategorije}
                    </a>
                </FormControl>
                <FormControl>
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </FormControl>
            </Stack>
        </>
    );
};

export default KategorijaCreate;
