import { Box, FormControl, Grid, Grid2, Stack, TextField } from "@mui/material";
import { useState } from "react";

const HuPkastCreate = () => {
    const [formData, setFormData] = useState({
        sezona: 1,
        epizoda: 1,
        mp3_url: "",
        kategorijaid: 11,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
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
                    />
                    <TextField
                        name="epizoda"
                        label="Epizoda"
                        variant="outlined"
                        type="number"
                        value={formData.epizoda}
                        onChange={handleChange}
                        width={40}
                    />
                </Grid2>
                <TextField
                    name="mp3_url"
                    label="Link za mp3"
                    variant="standard"
                    value={formData.mp3_url}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>
        </>
    );
};

export default HuPkastCreate;
