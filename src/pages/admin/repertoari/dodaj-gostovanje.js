import moment from "moment";
import { toast } from "react-hot-toast";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axios";
import { Box } from "@mui/material";
import { Col, Form, Row, Button } from "react-bootstrap";
import Select from "react-select";
import LoadingBackdrop from "../../../components/admin/LoadingBackdrop";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import { AgGridReact } from "ag-grid-react";
import { csrf, getCookieValue } from "../../../utils";

export default function DodajGostovanjePage() {
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

    const [datum, setDatum] = useState("");
    const [vreme, setVreme] = useState("");

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
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handlePredstavaChange = (event) => {
        setFormData({ ...formData, predstavaid: event.value });
    };

    const handlePozoristeChange = (event) => {
        setFormData({ ...formData, pozoristeid: event.value, scenaid: null });
        setSceneZaDropdown(
            dbScene.filter((scen) => scen.pozoristeid == event.value),
        );
    };

    const handleScenaChange = (event) => {
        setFormData({ ...formData, scenaid: event.value });
    };

    const handleVremeChange = (event) => {
        console.log(event);
        setVreme(event.target.value);
        setFormData({ ...formData, vreme: event.target.value });
    };

    const handleDatumChange = (event) => {
        console.log(event);
        setDatum(event.target.value);
        setFormData({
            ...formData,
            datum: moment(event.target.value).format("YYYY-MM-DD"),
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        setLoading(true);

        console.log(formData);
        try {
            await csrf();
            const res = await axiosClient.post(
                "/admin/igranje-store",
                formData,
                {
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                    },
                },
            );

            console.log(res.data);

            setFormData({
                pozoristeid: null,
                predstavaid: null,
                scenadid: null,
                datum: "",
                vreme: "",
            });
            setDatum("");
            setVreme(""); // TO DO reset form values
            setIgranja(res.data);
            toast.success("Uspesno dodato izvodjenje");
        } catch (err) {
            console.error(err);
            //toast.error(err.response.data);
            setErrors(err.response.data.errors);
        } finally {
            setLoading(false);
        }
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
            vreme: moment("1970.01.01 " + igranje.vreme).format("HH:mm"), // TO DO fix this
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
                <LoadingBackdrop show={loading} text="Working..." />
                <Box sx={{ flexGrow: 1, my: 3 }}>
                    <Row>
                        <Col md={6}>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Predstava</Form.Label>
                                    <Select
                                        name="predstava"
                                        options={dbPredstave}
                                        isSearchable
                                        onChange={handlePredstavaChange}
                                        value={
                                            dbPredstave.find(
                                                (option) =>
                                                    option.value ===
                                                    formData.predstavaid,
                                            ) || null
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Pozorište</Form.Label>
                                    <Select
                                        name="pozorista"
                                        options={dbPozorista}
                                        isSearchable
                                        onChange={handlePozoristeChange}
                                        value={
                                            dbPozorista.find(
                                                (option) =>
                                                    option.value ===
                                                    formData.pozoristeid,
                                            ) || null
                                        }
                                        menuPortalTarget={document.body}
                                        menuPosition="fixed"
                                        styles={{
                                            menuPortal: (base) => ({
                                                ...base,
                                                zIndex: 9999,
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                zIndex: 9999,
                                                fontSize: 14,
                                            }),
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Scena</Form.Label>
                                    <Select
                                        name="scena"
                                        options={sceneZaDropdown}
                                        isSearchable
                                        onChange={handleScenaChange}
                                        value={
                                            dbScene.find(
                                                (option) =>
                                                    option.value ===
                                                    formData.scenaid,
                                            ) || null
                                        }
                                    />
                                </Form.Group>

                                <Row className="align-items-end g-2">
                                    <Col xs="auto">
                                        <Form.Label>Datum</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="datum"
                                            value={datum}
                                            onChange={handleDatumChange}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Form.Label>Vreme</Form.Label>
                                        <Form.Control
                                            type="time"
                                            name="vreme"
                                            value={vreme}
                                            onChange={handleVremeChange}
                                        />
                                    </Col>
                                </Row>

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
