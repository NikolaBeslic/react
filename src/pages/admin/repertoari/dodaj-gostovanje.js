import moment from "moment";
import { toast } from "react-hot-toast";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axios";
import { Autocomplete, Box, Grid2, Paper, TextField } from "@mui/material";
import { Col, Form, Row, Spinner, Button, FormLabel } from "react-bootstrap";
import Select from "react-select";
import { useStateContext } from "../../../contexts/StateContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import { AgGridReact } from "ag-grid-react";

export default function DodajGostovanjePage() {
    const { isLoading, showLoading, hideLoading } = useStateContext();
    const [loading, setLoading] = useState(false);
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
    const gridRef = useRef(null);
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-all-for-gostovanja")
            .then((res) => {
                console.log(res.data);
                setDbPredstave(
                    res.data.predstave.map((pred) => ({
                        value: pred.predstavaid,
                        label: pred.naziv_predstave,
                    })),
                );
                setDbPozorista(
                    res.data.pozorista.map((poz) => ({
                        value: poz.pozoristeid,
                        label: poz.naziv_pozorista,
                    })),
                );
                setDbScene(
                    res.data.scene.map((scena) => ({
                        value: scena.scenaid,
                        label: scena.naziv_scene,
                        pozoristeid: scena.pozoristeid,
                    })),
                );
                setIgranja(res.data.igranja);
                hideLoading();
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handlePredstavaChange = (event, selectedPredstava) => {
        setFormData({ ...formData, predstavaid: selectedPredstava?.value });
    };

    const handlePozoristeChange = (event, selectedPozoriste) => {
        debugger;
        setFormData({ ...formData, pozoristeid: selectedPozoriste?.value });
        setSceneZaDropdown(
            dbScene.filter(
                (scen) => scen.pozoristeid == selectedPozoriste?.value,
            ),
        );
    };

    const handleScenaChange = (event, selectedScena) => {
        debugger;
        setFormData({ ...formData, scenaid: selectedScena.value });
    };

    const handleSubmit = () => {
        console.log(formData);

        setLoading(true);
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
                toast.success("Uspesno dodato izvodjenje");
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data);
                setErrors(err.response.data.errors);
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        { field: "id", headerName: "Id", flex: 0.5 },
        { field: "naziv_predstave", headerName: "Naziv predstave", flex: 3 },
        { field: "scena", headerName: "Scena", flex: 1 },
        {
            field: "datum",
            headerName: "Datum",
            flex: 1,
            wrapText: true,
            autoHeight: true,
        },
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
        }),
    );

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    return (
        <>
            <AdminHeader metaTitle="Dodaj gostovanje" />
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
                    <Row>
                        <Col md={6}>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Pozorišta</Form.Label>
                                    <Select
                                        name="pozorista"
                                        options={dbPozorista}
                                        isSearchable
                                        onChange={handlePozoristeChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Predstava</Form.Label>
                                    <Select
                                        name="predstava"
                                        options={dbPredstave}
                                        isSearchable
                                        onChange={handlePredstavaChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Scene</Form.Label>
                                    <Select
                                        name="scene"
                                        options={sceneZaDropdown}
                                        isSearchable
                                        onChange={handleScenaChange}
                                    />
                                </Form.Group>

                                <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                >
                                    <Row className="align-items-end g-2">
                                        <Col xs="auto">
                                            <Form.Label>Datum</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="datum"
                                                value={datum}
                                                onChange={(value) =>
                                                    setDatum(value)
                                                }
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Label>Vreme</Form.Label>
                                            <Form.Control
                                                type="time"
                                                name="vreme"
                                                value={vreme}
                                                onChange={(value) =>
                                                    setVreme(value)
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </LocalizationProvider>
                                <Button
                                    size="large"
                                    type="submit"
                                    variant="primary"
                                    onClick={handleSubmit}
                                    className="mt-4"
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <div
                        style={{
                            width: "100%",
                            height: "600px",
                            marginTop: "25px",
                            marginBottom: "30px",
                        }}
                    >
                        <div className="example-header mb-3">
                            <input
                                type="text"
                                id="filter-text-box"
                                placeholder="Pretraga..."
                                onInput={onFilterTextBoxChanged}
                                className="form-control"
                                style={{ width: "300px" }}
                            />
                        </div>
                        <AgGridReact
                            ref={gridRef}
                            rowData={rows}
                            columnDefs={columns}
                            pagination={true}
                            paginationAutoPageSize={true}
                            loading={loading}
                        />
                    </div>
                </Box>
            </div>
        </>
    );
}
