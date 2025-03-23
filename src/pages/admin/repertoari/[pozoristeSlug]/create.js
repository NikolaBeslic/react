import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosClient from "../../../../utils/axios";
import {
    Autocomplete,
    Box,
    Button,
    Grid2,
    Paper,
    TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { toast } from "react-hot-toast";
import { useStateContext } from "../../../../contexts/StateContext";
import { Spinner } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";

export default function RepertoarPozoristaCreatePage() {
    const router = useRouter();
    const { isLoading, showLoading, hideLoading } = useStateContext();
    const { pozoristeSlug } = router.query;
    const [errors, setErrors] = useState({});
    const [pozoriste, setPozoriste] = useState([]);
    const [igranja, setIgranja] = useState([]);

    const [dbPredstave, setDbPredstave] = useState([]);
    const [dbScene, setDbScene] = useState([]);

    const [datum, setDatum] = useState(null);
    const [vreme, setVreme] = useState(null);

    let [formData, setFormData] = useState({
        pozoristeid: null,
        predstavaid: null,
        scenadid: null,
        datum: null,
        vreme: null,
    });

    useEffect(() => {
        if (pozoristeSlug) {
            axiosClient
                .get(`/admin/pozoriste-with-predstave/${pozoristeSlug}`)
                .then((res) => {
                    console.log(res.data);

                    setPozoriste(res.data);
                    fetchIgranja(res.data.pozoristeid);
                    setFormData({
                        ...formData,
                        pozoristeid: res.data.pozoristeid,
                    });
                    if (res.data.predstave)
                        setDbPredstave(
                            res.data.predstave.map((pred) => ({
                                value: pred.predstavaid,
                                label: pred.naziv_predstave,
                            }))
                        );
                    if (res.data.scene)
                        setDbScene(
                            res.data.scene.map((scena) => ({
                                value: scena.scenaid,
                                label: scena.naziv_scene,
                            }))
                        );
                })
                .catch((err) => console.error(err));
        }
    }, [pozoristeSlug]);

    const handlePredstavaChange = (event, selectedPredstava) => {
        setFormData({ ...formData, predstavaid: selectedPredstava.value });
    };

    const handleScenaChange = (event, selectedScena) => {
        setFormData({ ...formData, scenaid: selectedScena.value });
    };

    const handleSubmit = () => {
        showLoading();
        formData.datum = moment(datum).format("YYYY-MM-DD");
        formData.vreme = moment(vreme).format("HH:mm");
        axiosClient
            .post("/admin/igranje-store", formData)
            .then((res) => {
                console.log(res.data);
                setIgranja(res.data);
                setFormData({
                    pozoristeid: null,
                    predstavaid: null,
                    scenadid: null,
                    datum: null,
                    vreme: null,
                }); // TO DO reset form values
                hideLoading();
                toast.success("Uspesno dodato izvodjenje");
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data);
                setErrors(err.response.data.errors);
                hideLoading();
            });

        console.log(formData);
    };

    const fetchIgranja = (pozoristeid) => {
        axiosClient
            .get(`/admin/get-igranja-pozorista/${pozoristeid}`)
            .then((res) => setIgranja(res.data))
            .catch((err) => console.error(err));
    };

    const columns = [
        { field: "id", headerName: "Id", flex: 0.5 },
        { field: "naziv_predstave", headerName: "Naziv predstave", flex: 3 },
        { field: "scena", headerName: "Scena", flex: 1 },
        { field: "datum", headerName: "Datum", flex: 1 },
        { field: "vreme", headerName: "Vreme", flex: 1 },
        {
            field: "edit",
            headerName: "Edit",
            width: 200,
            flex: 1,
            align: "center",
        },
    ];
    const rows = new Array();

    igranja?.map((igranje) =>
        rows.push({
            id: igranje.seigraid,
            naziv_predstave: igranje.predstava.naziv_predstave,
            scena: igranje.scena?.naziv_scene,
            datum: moment(igranje.datum).format("DD. MMM YYYY. dddd"),
            vreme: igranje.vreme, // TO DO fix this
        })
    );

    return (
        <>
            <h1>Dodaj repertoar za {pozoriste.naziv_pozorista}</h1>
            <div className="container">
                <Box sx={{ flexGrow: 1, my: 3 }}>
                    {isLoading && (
                        <Spinner
                            animation="border"
                            role="status"
                            className="hup-spinner"
                        />
                    )}
                    <Grid2 container spacing={2} sx={{ width: 500, mb: 2 }}>
                        <Autocomplete
                            name="predstave"
                            options={dbPredstave}
                            onChange={handlePredstavaChange}
                            sx={{ mb: 2 }}
                            aria-required
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Izaberi predstavu"
                                    style={{
                                        fontSize: "1.2rem",
                                        width: "400px",
                                    }}
                                />
                            )}
                        />
                        <Autocomplete
                            name="scena"
                            options={dbScene}
                            onChange={handleScenaChange}
                            sx={{ mb: 2 }}
                            aria-required
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Izaberi scenu"
                                    style={{
                                        fontSize: "1.2rem",
                                        width: "400px",
                                    }}
                                />
                            )}
                        />
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Datum"
                                name="datum"
                                value={datum}
                                onChange={(value) => setDatum(value)}
                            />
                            <TimeField
                                label="Vreme"
                                name="vreme"
                                format="HH:mm"
                                value={vreme}
                                onChange={(value) => setVreme(value)}
                            />
                        </LocalizationProvider>
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid2>
                    <Paper sx={{ height: 800, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            sx={{ border: 0 }}
                            autoPageSize
                            initialState={{
                                sorting: {
                                    sortModel: [
                                        {
                                            field: "id",
                                            sort: "desc",
                                        },
                                    ],
                                },
                            }}
                        />
                    </Paper>
                </Box>
            </div>
        </>
    );
}
