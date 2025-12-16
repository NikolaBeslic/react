import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRouter } from "next/router";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function AutoriPage() {
    const [autori, setAutori] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axiosClient
            .get("/admin/get-all-autori")
            .then((res) => setAutori(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleEditClick = (autorid) => {
        console.log(autorid);
        router.push(`/admin/autori/create?autorid=${autorid}`);
    };

    return (
        <>
            <AdminHeader metaTitle="Autori" />

            <div className="container">
                <h1>Autori na sajtu </h1>
                <Button
                    href="/admin/autori/create"
                    variant="contained"
                    sx={{ mb: 5 }}
                    startIcon={<AddIcon />}
                >
                    Dodaj autora
                </Button>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {autori.map((autor) => (
                                <TableRow key={autor.autorid}>
                                    <TableCell>{autor.ime_autora}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<EditNoteIcon />}
                                            onClick={() =>
                                                handleEditClick(autor.autorid)
                                            }
                                        >
                                            Izmeni
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
