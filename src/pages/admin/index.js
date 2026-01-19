import {
    Backdrop,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Checkbox,
    CircularProgress,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import axiosClient from "../../utils/axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AdminHomePage() {
    const [tekstovi, setTekstovi] = useState([]);
    const [predstave, setPredstave] = useState([]);
    const [komentari, setKomentari] = useState([]);
    const [festivali, setFestivali] = useState([]);
    const [igranja, setIgranja] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/tekstovi-za-naslovnu")
            .then((res) => {
                console.log(res.data);
                setTekstovi(res.data);
            })
            .catch((err) => console.error(err));

        axiosClient
            .get("/admin/predstave-za-naslovnu")
            .then((res) => setPredstave(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));

        // axiosClient
        //     .get("/admin/komentari-za-naslovnu")
        //     .then((res) => setKomentari(res.data))
        //     .catch((err) => console.error(err));

        // axiosClient
        //     .get("/admin/festivali-za-naslovnu")
        //     .then((res) => setFestivali(res.data))
        //     .catch((err) => console.error(err));

        // axiosClient
        //     .get("/admin/igranja-za-naslovnu")
        //     .then((res) => setIgranja(res.data))
        //     .catch((err) => console.error(err))
        //     .finally(() => setLoading(false));
    }, []);

    const handleRemoveFromSlider = (tekstid) => {
        setLoading(true);
        axiosClient
            .put("/admin/tekstovi/ukloni-sa-slajdera", { tekstid })
            .then((res) => {
                setTekstovi((prevTekstovi) =>
                    prevTekstovi.map((tekst) =>
                        tekst.tekstid === tekstid
                            ? { ...tekst, na_slajderu: 0 }
                            : tekst
                    )
                );
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            {loading && (
                <Backdrop
                    open={loading}
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
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
                component={Link}
                prefetch
            >
                Dodaj tekst
            </Button>
            <h2>Tekstovi na slajderu</h2>
            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                {tekstovi
                    .filter((t) => t.na_slajderu == 1)
                    .map((tekst) => (
                        <Card
                            sx={{ maxWidth: 300 }}
                            key={`slajd-${tekst.tekstid}`}
                        >
                            <CardMedia
                                sx={{ height: 180 }}
                                image={tekst.tekst_photo}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {tekst.naslov}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    aria-label="edit tekst"
                                    color="primary"
                                    title="Edituj tekst"
                                    component={Link}
                                    href={`/admin/tekstovi/edit?tekstid=${tekst.tekstid}`}
                                    prefetch
                                >
                                    <EditNoteIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="Kopiraj link"
                                    color="primary"
                                    title="Kopiraj link"
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            window.location.origin +
                                                `/tekst/${tekst.slug}`
                                        );
                                    }}
                                >
                                    <ContentCopyIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="remove from slider"
                                    color="error"
                                    title="Ukloni sa slajdera"
                                    onClick={() =>
                                        handleRemoveFromSlider(tekst.tekstid)
                                    }
                                >
                                    <PlaylistRemoveIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </Stack>

            <h2>10 najnovijih tekstova</h2>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Naslov</TableCell>
                            <TableCell>Na slajderu</TableCell>
                            <TableCell>Datum objave</TableCell>
                            <TableCell>Akcije</TableCell>
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
                                        component={Link}
                                        href={`/admin/tekstovi/edit?tekstid=${tekst.tekstid}`}
                                        prefetch
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
                        <TableRow>
                            <TableCell>Naziv predstave</TableCell>
                            <TableCell>Pozorista</TableCell>
                            <TableCell>Datum premijere</TableCell>
                            <TableCell>Akcije</TableCell>
                        </TableRow>
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
                                    {pred.premijera
                                        ? moment(pred.premijera).format(
                                              "DD.MM.YYYY"
                                          )
                                        : ""}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        startIcon={<EditNoteIcon />}
                                        component={Link}
                                        href={`/admin/predstave/edit?predstavaid=${pred.predstavaid}`}
                                        prefetch
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
