import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useRouter } from "next/router";

export default function ZanroviPage() {

    const [zanrovi, setZanrovi] = useState([]);
    const router = useRouter();


    useEffect(() => {
        axiosClient.get('/admin/zanrovi')
            .then((res) => {
                console.log(res.data);
                setZanrovi(res.data);
            }).catch(error => console.error(error));
    }, []);

    const handleEditClick = (zanrid) => {
        console.log(zanrid);
        router.push(`/admin/zanrovi/create?zanrid=${zanrid}`);
    }

    return (
        <>
            <div className="container">
                <h1>Zanrovi</h1>
                <Button href="/admin/zanrovi/create" variant="contained" startIcon={<AddIcon />}>Dodaj zanr</Button>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {zanrovi.map((zanr) =>
                                <TableRow key={zanr.zanrid}>
                                    <TableCell>
                                        {zanr.naziv_zanra}
                                    </TableCell>
                                    <TableCell>
                                        <span className="zanr-button" style={{ color: zanr.zanr_boja, borderColor: zanr.zanr_boja }}>
                                            {zanr.naziv_zanra}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" startIcon={<EditNoteIcon />} onClick={() => handleEditClick(zanr.zanrid)}>
                                            Izmeni
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}