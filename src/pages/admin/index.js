import { IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import axiosClient from "../../utils/axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useRouter } from "next/router";
import Link from "next/link";
import LoadingBackdrop from "../../components/admin/LoadingBackdrop";
import {
    Button,
    ButtonGroup,
    Card,
    Col,
    Form,
    Row,
    Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faPenToSquare,
    faClone,
} from "@fortawesome/free-solid-svg-icons";

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
                            : tekst,
                    ),
                );
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleIstakni = (tekstid) => {
        setLoading(true);
        axiosClient
            .put("/admin/tekstovi/istakni", { tekstid })
            .then((res) => {
                setTekstovi((prevTekstovi) =>
                    prevTekstovi.map((tekst) =>
                        tekst.tekstid === tekstid
                            ? { ...tekst, na_slajderu: 1 }
                            : tekst,
                    ),
                );
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleCreateClick = (kategorijaid) => {
        router.push(`/admin/tekstovi/create?kategorijaid=${kategorijaid}`);
    };

    const handleIstakniCheck = (tekstid, isChecked) => {
        if (isChecked) {
            handleIstakni(tekstid);
        } else {
            handleRemoveFromSlider(tekstid);
        }
    };

    return (
        <>
            <LoadingBackdrop show={loading} text="Working..." />
            <h1>HuP Admin</h1>
            <p>
                TO DO / IDEAS za naslovnu: najnoviji komentari za odobrenje,
                festivali odrzani prethodnih godina u slicno vreme, najcitaniji
                tekstovi force update, najposecenije stranice predstava (force
                update), veliki sidebar menu
            </p>
            <ButtonGroup className="mb-2">
                <Button
                    size="lg"
                    variant="success"
                    onClick={() => handleCreateClick(1)}
                >
                    Dodaj vest
                </Button>
                <Button
                    size="lg"
                    variant="warning"
                    onClick={() => handleCreateClick(2)}
                >
                    Dodaj intervju
                </Button>
                <Button
                    size="lg"
                    variant="danger"
                    onClick={() => handleCreateClick(4)}
                >
                    Dodaj recenziju
                </Button>
            </ButtonGroup>
            <h2>Tekstovi na slajderu</h2>
            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                {tekstovi
                    .filter((t) => t.na_slajderu == 1)
                    .map((tekst) => (
                        <Card
                            style={{ width: "18rem" }}
                            key={`slajd-${tekst.tekstid}`}
                        >
                            <Card.Img
                                className="admin-home-card-image"
                                variant="top"
                                src={tekst.tekst_photo}
                            />
                            <Card.Body>
                                <Card.Title>{tekst.naslov}</Card.Title>

                                <IconButton
                                    aria-label="edit tekst"
                                    color="primary"
                                    title="Edituj tekst"
                                    component={Link}
                                    href={`/admin/tekstovi/edit?tekstid=${tekst.tekstid}`}
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
                                                `/tekst/${tekst.slug}`,
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
                            </Card.Body>
                        </Card>
                    ))}
            </Stack>

            <h2>10 najnovijih tekstova</h2>
            <Table striped className="mb-5">
                <thead>
                    <tr>
                        <th>Naslov </th>
                        <th>Na slajderu</th>
                        <th>Datum objave</th>
                    </tr>
                </thead>
                <tbody>
                    {tekstovi.map((tekst) => (
                        <tr key={tekst.tekstid}>
                            <td>{tekst.naslov}</td>
                            <td>
                                <Form.Check // prettier-ignore
                                    type="checkbox"
                                    checked={Boolean(tekst.na_slajderu)}
                                    onChange={(e) =>
                                        handleIstakniCheck(
                                            tekst.tekstid,
                                            e.target.checked,
                                        )
                                    }
                                />
                            </td>
                            <td>
                                {moment(tekst.published_at).format(
                                    "DD.MM.YYYY",
                                )}
                            </td>
                            <td>
                                <Button
                                    variant="outline-primary"
                                    color="secondary"
                                    size="small"
                                    as={Link}
                                    href={`/admin/tekstovi/edit?tekstid=${tekst.tekstid}`}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />{" "}
                                    Izmeni
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h2>10 najnovijih predstava</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>Naziv predstave </th>
                        <th>Pozorista</th>
                        <th>Premijera</th>
                    </tr>
                </thead>
                <tbody>
                    {predstave.map((pred) => (
                        <tr key={pred.predstavaid}>
                            <td>{pred.naziv_predstave}</td>
                            <td>
                                {pred.pozorista
                                    .map((poz) => poz.naziv_pozorista)
                                    .join(", ")}
                            </td>
                            <td>
                                {pred.premijera
                                    ? moment(pred.premijera).format(
                                          "DD.MM.YYYY",
                                      )
                                    : ""}
                            </td>
                            <td>
                                <Button
                                    variant="outline-danger"
                                    color="secondary"
                                    size="small"
                                    as={Link}
                                    href={`/admin/predstave/edit?predstavaid=${pred.predstavaid}`}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />{" "}
                                    Izmeni
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
