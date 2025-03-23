import moment from "moment";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import {
    Autocomplete,
    Box,
    Button,
    Grid2,
    Paper,
    TextField,
} from "@mui/material";
import { Spinner } from "react-bootstrap";
import { useStateContext } from "../../../contexts/StateContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DataGrid } from "@mui/x-data-grid";

export default function DodajGostovanjePage() {
    const { isLoading, showLoading, hideLoading } = useStateContext();
    const [errors, setErrors] = useState({});
    let [formData, setFormData] = useState({
        pozoristeid: null,
        predstavaid: null,
        scenaid: null,
        datum: null,
        vreme: null,
        gostovanje: true,
    });
    const [dbPredstave, setDbPredstave] = useState([]);
    const [dbPozorista, setDbPozorista] = useState([]);
    const [dbScene, setDbScene] = useState([]);

    const [sceneZaDropdown, setSceneZaDropdown] = useState(dbScene);

    const [datum, setDatum] = useState(null);
    const [vreme, setVreme] = useState(null);

    const [igranja, setIgranja] = useState([]);

    useEffect(() => {
        showLoading();
        axiosClient
            .get("/admin/get-all-for-gostovanja")
            .then((res) => {
                console.log(res.data);
                setDbPredstave(
                    res.data.predstave.map((pred) => ({
                        value: pred.predstavaid,
                        label: pred.naziv_predstave,
                    }))
                );
                setDbPozorista(
                    res.data.pozorista.map((poz) => ({
                        value: poz.pozoristeid,
                        label: poz.naziv_pozorista,
                    }))
                );
                setDbScene(
                    res.data.scene.map((scena) => ({
                        value: scena.scenaid,
                        label: scena.naziv_scene,
                        pozoristeid: scena.pozoristeid,
                    }))
                );
                setIgranja(res.data.igranja);
                hideLoading();
            })
            .catch((err) => console.error(err));
    }, []);

    const handlePredstavaChange = (event, selectedPredstava) => {
        setFormData({ ...formData, predstavaid: selectedPredstava?.value });
    };

    const handlePozoristeChange = (event, selectedPozoriste) => {
        debugger;
        setFormData({ ...formData, pozoristeid: selectedPozoriste?.value });
        setSceneZaDropdown(
            dbScene.filter(
                (scen) => scen.pozoristeid == selectedPozoriste?.value
            )
        );
    };

    const handleScenaChange = (event, selectedScena) => {
        debugger;
        setFormData({ ...formData, scenaid: selectedScena.value });
    };

    const handleSubmit = () => {
        console.log(formData);

        showLoading();
        formData.datum = moment(datum).format("YYYY-MM-DD");
        formData.vreme = moment(vreme).format("HH:mm");

        console.log(formData);

        axiosClient
            .post("/admin/igranje-store", formData)
            .then((res) => {
                debugger;
                console.log(res.data);

                setFormData({
                    pozoristeid: null,
                    predstavaid: null,
                    scenadid: null,
                    datum: null,
                    vreme: null,
                }); // TO DO reset form values
                setIgranja(res.data);
                hideLoading();
                toast.success("Uspesno dodato izvodjenje");
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data);
                setErrors(err.response.data.errors);
                hideLoading();
            });
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
            <h1>Dodaj gostovanje</h1>
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
                            name="pozorista"
                            options={dbPozorista}
                            onChange={handlePozoristeChange}
                            sx={{ mb: 2 }}
                            aria-required
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Izaberi pozoriste"
                                    style={{
                                        fontSize: "1.2rem",
                                        width: "400px",
                                    }}
                                />
                            )}
                        />
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
                            name="scene"
                            options={sceneZaDropdown}
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
