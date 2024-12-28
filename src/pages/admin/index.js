import {
    Button,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import axiosClient from "../../utils/axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRouter } from "next/router";

export default function AdminHomePage() {
    const [tekstovi, setTekstovi] = useState([]);
    const [predstave, setPredstave] = useState([]);
    const [komentari, setKomentari] = useState([]);
    const [festivali, setFestivali] = useState([]);
    const [igranja, setIgranja] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axiosClient
            .get("/admin/tekstovi-za-naslovnu")
            .then((res) => setTekstovi(res.data))
            .catch((err) => console.error(err));

        axiosClient
            .get("/admin/predstave-za-naslovnu")
            .then((res) => setPredstave(res.data))
            .catch((err) => console.error(err));

        // axiosClient
        //     .get("/admin/komentari-za-naslovnu")
        //     .then((res) => setKomentari(res.data))
        //     .catch((err) => console.error(err));

        axiosClient
            .get("/admin/festivali-za-naslovnu")
            .then((res) => setFestivali(res.data))
            .catch((err) => console.error(err));

        axiosClient
            .get("/admin/igranja-za-naslovnu")
            .then((res) => setIgranja(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleEditClick = (tekstid) => {
        console.log(tekstid);
        router.push(`/admin/tekstovi/create?tekstid=${tekstid}`);
    };

    return (
        <>
            <h1>HuP Admin</h1>
            <p>
                TO DO / IDEAS za naslovnu: najnoviji komentari za odobrenje,
                festivali odrzani prethodnih godina u slicno vreme, najcitaniji
                tekstovi force update, najposecenije stranice predstava (force
                update), veliki sidebar menu
            </p>
            <Button
                href="/admin/tekstovi/create"
                variant="contained"
                sx={{ my: 2 }}
            >
                Dodaj tekst
            </Button>
            <h2>10 najnovijih tekstova</h2>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Naslov</TableCell>
                            <TableCell>Na slajderu</TableCell>
                            <TableCell>Datum objave</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tekstovi.map((tekst) => (
                            <TableRow key={tekst.tekstid}>
                                <TableCell>{tekst.naslov}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={Boolean(tekst.na_slajderu)}
                                    />
                                </TableCell>
                                <TableCell>
                                    {moment(tekst.published_at).format(
                                        "DD.MM.YYYY"
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        startIcon={<EditNoteIcon />}
                                        onClick={() =>
                                            handleEditClick(tekst.tekstid)
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

            <h2>10 najnovijih predstava</h2>

            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table size="small">
                    <TableHead>
                        <TableCell>Naziv predstave</TableCell>
                        <TableCell>Pozorista</TableCell>
                        <TableCell>Datum premijere</TableCell>
                        <TableCell></TableCell>
                    </TableHead>
                    <TableBody>
                        {predstave.map((pred) => (
                            <TableRow key={pred.predstavaid}>
                                <TableCell>{pred.naziv_predstave}</TableCell>
                                <TableCell>
                                    {pred.pozorista
                                        .map((poz) => poz.naziv_pozorista)
                                        .join(", ")}
                                </TableCell>
                                <TableCell>
                                    {moment(pred.premijera).format(
                                        "DD.MM.YYYY"
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        startIcon={<EditNoteIcon />}
                                        onClick={() =>
                                            handleEditClick(pred.predstavaid)
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
        </>
    );
}
