import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";

export default function GradoviPage() {
    const [gradovi, setGradovi] = useState([]);
    const [nazivGrada, setNazivGrada] = useState("");

    useEffect(() => {
        axiosClient
            .get("/admin/get-gradovi")
            .then((res) => setGradovi(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleGradSave = () => {
        axiosClient
            .post("/admin/store-grad", { naziv_grada: nazivGrada })
            .then((res) => {
                console.log(res.data);
                setGradovi(res.data);
                setNazivGrada("");
                toast.success("Uspesno dodat grad");
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div className="container">
                <h1>Gradovi </h1>
                <TextField
                    name="naziv_grada"
                    label="Ime grada"
                    variant="standard"
                    onChange={(e) => setNazivGrada(e.target.value)}
                    value={nazivGrada}
                    sx={{ width: "300px", mr: 3 }}
                />
                <Button
                    onClick={handleGradSave}
                    variant="contained"
                    sx={{ mb: 5 }}
                    startIcon={<AddIcon />}
                >
                    Dodaj grad
                </Button>

                <TableContainer>
                    <Table>
                        <TableBody>
                            {gradovi.map((grad) => (
                                <TableRow key={grad.grad}>
                                    <TableCell>{grad.naziv_grada}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
