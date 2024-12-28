import {
    Button,
    FormControl,
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

const PozoristaCreate = ({ pozoristeid }) => {
    const [gradovi, setGradovi] = useState([]);
    const [formData, setFormData] = useState({
        naziv_pozorista: "",
        pozoriste_slug: "",
        adresa: "",
        email: "",
        telefon: "",
        url_cover_slike: "t",
        url_logo: "t",
        gradid: 0,
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
        if (pozoristeid) {
            axiosClient
                .get(`/admin/get-single-pozoriste/${pozoristeid}`)
                .then((res) => {
                    console.log(res.data);
                    setFormData({ ...res.data });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [pozoristeid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "naziv_pozorista") {
            const slug = slugify(value);
            formData.pozoriste_slug = slug;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleGradSelectChange = (event) => {
        console.log(event.target.value);
        setFormData({ ...formData, gradid: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.pozoristeid) {
            axiosClient
                .put("/admin/update-pozoriste", formData)
                .then((res) => {
                    console.log(res);
                    res.status == 200
                        ? toast.success("Uspešno sačuvane izmene")
                        : "";
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data);
                });
        } else {
            axiosClient
                .post("/admin/create-pozoriste", formData)
                .then((res) => {
                    console.log(res);
                    res.status == "ok"
                        ? toast.success("Uspesno dodato novo pozoriste")
                        : "";
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.data.errors);
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
        <Stack
            component="form"
            direction="column"
            spacing={2}
            alignItems="center"
            sx={{ width: 500 }}
            marginX={"auto"}
        >
            <FormControl fullWidth>
                <TextField
                    name="naziv_pozorista"
                    label="Naziv pozorista"
                    variant="outlined"
                    value={formData.naziv_pozorista}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    name="pozoriste_slug"
                    label="Slug"
                    variant="outlined"
                    value={formData.pozoriste_slug}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    name="adresa"
                    label="Adresa"
                    variant="outlined"
                    value={formData.adresa}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    name="telefon"
                    label="Telefon"
                    variant="outlined"
                    value={formData.telefon}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
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
    );
};

export default PozoristaCreate;
