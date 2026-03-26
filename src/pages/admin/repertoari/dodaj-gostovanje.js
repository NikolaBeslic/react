import moment from "moment";
import { toast } from "react-hot-toast";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axios";
import { Box } from "@mui/material";
import { Col, Form, Row, Button, Spinner } from "react-bootstrap";
import Select from "react-select";
import LoadingBackdrop from "../../../components/admin/LoadingBackdrop";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import { AgGridReact } from "ag-grid-react";
import { csrf, getCookieValue } from "../../../utils";

export default function DodajGostovanjePage() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formaLoading, setFormaLoading] = useState(false);
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
        setErrors({ ...errors, predstavaid: null });
    };

    const handlePozoristeChange = (event) => {
        setFormData({ ...formData, pozoristeid: event.value, scenaid: null });
        setSceneZaDropdown(
            dbScene.filter((scen) => scen.pozoristeid == event.value),
        );
        setErrors({ ...errors, pozoristeid: null });
    };

    const handleScenaChange = (event) => {
        setFormData({ ...formData, scenaid: event.value });
    };

    const handleVremeChange = (event) => {
        setVreme(event.target.value);
        setFormData({ ...formData, vreme: event.target.value });
        setErrors({ ...errors, vreme: null });
    };

    const handleDatumChange = (event) => {
        setDatum(event.target.value);
        setFormData({
            ...formData,
            datum: moment(event.target.value).format("YYYY-MM-DD"),
        });
        setErrors({ ...errors, datum: null });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateIgranjeStore()) return;

        setFormaLoading(true);

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
            toast.success("Uspešno dodato izvođenje");
        } catch (err) {
            const status = err?.response?.status;
            const data = err?.response?.data;

            if (status === 422 && data?.errors) {
                setErrors(data.errors);
                toast.error("Proverite uneta polja.");
            } else {
                toast.error(data?.message || "Došlo je do greške.");
            }
        } finally {
            setFormaLoading(false);
        }
    };

    const validateIgranjeStore = () => {
        const newErrors = {};

        if (!formData.predstavaid) {
            newErrors.predstavaid = "Obavezno izaberi predstavu.";
        }

        if (!formData.pozoristeid) {
            newErrors.pozoristeid = "Obavezno izaberi pozorište.";
        }

        if (!formData.datum) {
            newErrors.datum = "Datum je obavezan.";
        }

        if (!formData.vreme) {
            newErrors.vreme = "Vreme je obavezno.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
            datum: moment(igranje.datum).format("DD. MMM YYYY."),
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
                                        isDisabled={formaLoading}
                                        onChange={handlePredstavaChange}
                                        value={
                                            dbPredstave.find(
                                                (option) =>
                                                    option.value ===
                                                    formData.predstavaid,
                                            ) || null
                                        }
                                    />
                                    {errors?.predstavaid && (
                                        <span className="text-danger">
                                            {errors.predstavaid}
                                        </span>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Pozorište</Form.Label>
                                    <Select
                                        name="pozorista"
                                        options={dbPozorista}
                                        isSearchable
                                        isDisabled={formaLoading}
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
                                    {errors?.pozoristeid && (
                                        <span className="text-danger">
                                            {errors.pozoristeid}
                                        </span>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Scena</Form.Label>
                                    <Select
                                        name="scena"
                                        options={sceneZaDropdown}
                                        isSearchable
                                        isDisabled={formaLoading}
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
                                            disabled={formaLoading}
                                        />
                                        {errors?.datum && (
                                            <span className="text-danger">
                                                {errors.datum}
                                            </span>
                                        )}
                                    </Col>
                                    <Col xs="auto">
                                        <Form.Label>Vreme</Form.Label>
                                        <Form.Control
                                            type="time"
                                            name="vreme"
                                            value={vreme}
                                            onChange={handleVremeChange}
                                            disabled={formaLoading}
                                        />
                                        {errors?.vreme && (
                                            <span className="text-danger">
                                                {errors.vreme}
                                            </span>
                                        )}
                                    </Col>
                                </Row>

                                <Button
                                    size="large"
                                    type="submit"
                                    variant="primary"
                                    onClick={handleSubmit}
                                    disabled={formaLoading}
                                    className="mt-4"
                                >
                                    Submit
                                </Button>
                                {formaLoading && (
                                    <Spinner animation="border" role="status" />
                                )}
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
