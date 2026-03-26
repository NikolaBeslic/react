import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axiosClient from "../../../../utils/axios";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
} from "@mui/material";

import moment from "moment";
import { toast } from "react-hot-toast";
import { Col, Form, Row, Button, Spinner } from "react-bootstrap";
import Select from "react-select";

import AdminHeader from "../../../../components/admin/layout/AdminHeader";
import { csrf, getCookieValue } from "../../../../utils";
import { AgGridReact } from "ag-grid-react";
import LoadingBackdrop from "../../../../components/admin/LoadingBackdrop";

/**
 * Custom select editor for "scena"
 */
const ScenaSelectEditor = ({ value, onValueChange, values = [] }) => {
    return (
        <select
            autoFocus
            value={value != null ? String(value) : ""}
            onChange={(e) =>
                onValueChange(
                    e.target.value === "" ? null : Number(e.target.value),
                )
            }
            className="form-control"
            style={{ width: "100%", height: "100%", border: "none" }}
        >
            {values.map((scena) => (
                <option key={scena.value} value={String(scena.value)}>
                    {scena.label}
                </option>
            ))}
        </select>
    );
};

const DateEditor = ({ value, onValueChange }) => {
    return (
        <input
            type="date"
            autoFocus
            value={value || ""}
            onChange={(e) => onValueChange(e.target.value || null)}
            className="form-control"
            style={{ width: "100%", height: "100%", border: "none" }}
        />
    );
};

/**
 * Custom time editor
 */
const TimeEditor = ({ value, onValueChange }) => {
    return (
        <input
            type="time"
            autoFocus
            value={value || ""}
            onChange={(e) => onValueChange(e.target.value || null)}
            className="form-control"
            style={{ width: "100%", height: "100%", border: "none" }}
        />
    );
};

/**
 * Action buttons renderer
 */
const ActionCellRenderer = (props) => {
    const { data, context } = props;
    const isEditing = context.editingRowId === data.id;

    return (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {!isEditing ? (
                <button
                    type="button"
                    onClick={() => context.handleEditRow(data.id)}
                    className="btn btn-primary"
                >
                    Edit
                </button>
            ) : (
                <>
                    <button
                        type="button"
                        onClick={() => context.handleSaveRow(data.id)}
                        className="btn btn-success"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => context.handleCancelRow(data.id)}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
};

export default function RepertoarPozoristaCreatePage() {
    const router = useRouter();
    const { pozoristeSlug } = router.query;
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [pozoriste, setPozoriste] = useState([]);
    const [igranja, setIgranja] = useState([]);
    const gridRef = useRef(null);
    const [dbPredstave, setDbPredstave] = useState([]);
    const [dbScene, setDbScene] = useState([]);

    const [datum, setDatum] = useState(null);
    const [vreme, setVreme] = useState(null);

    const [rows, setRows] = useState([]);
    const [editingRowId, setEditingRowId] = useState(null);
    const [originalRow, setOriginalRow] = useState(null);
    const [formaLoading, setFormaLoading] = useState(false);
    let [formData, setFormData] = useState({
        pozoristeid: null,
        predstavaid: null,
        scenaid: null,
        datum: null,
        vreme: null,
    });

    /* dialog constants */
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    /* Dialog functions */
    const handleDeleteClick = (id) => {
        setSelectedRow(rows.find((row) => row.id === id));
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        setDeleteLoading(true);
        axiosClient
            .delete(`/admin/igranje-delete/${selectedRow.id}`)
            .then((res) => {
                setRows((prev) => prev.filter((r) => r.id !== selectedRow.id));
                toast.success("Uspesno obrisano izvodjenje");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Greska prilikom brisanja izvodjenja");
            })
            .finally(() => {
                setDeleteLoading(false);
                setOpenDialog(false);
                setSelectedRow(null);
            });
    };

    const handleCancel = () => {
        setOpenDialog(false);
        setSelectedRow(null);
    };

    useEffect(() => {
        if (pozoristeSlug) {
            axiosClient
                .get(`/admin/pozoriste-with-predstave/${pozoristeSlug}`)
                .then((res) => {
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
                            })),
                        );
                    if (res.data.scene)
                        setDbScene(
                            res.data.scene.map((scena) => ({
                                value: scena.scenaid,
                                label: scena.naziv_scene,
                            })),
                        );
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [pozoristeSlug]);

    const handlePredstavaChange = (event) => {
        setFormData({ ...formData, predstavaid: event.value });
        setErrors({ ...errors, predstavaid: null });
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

            setRows(res.data);
            setFormData({
                ...formData,
                predstavaid: null,
                scenaid: null,
                datum: null,
                vreme: null,
            });
            setDatum("");
            setVreme("");
            const fetchedIgranja = res.data?.map((igranje) => ({
                id: igranje.seigraid,
                naziv_predstave: igranje.predstava.naziv_predstave,
                scenaid: igranje.scena?.scenaid,
                datum: igranje.datum,
                vreme: moment("1970.01.01 " + igranje.vreme).format("HH:mm"),
            }));
            setRows(fetchedIgranja);
            toast.success("Uspesno dodato izvodjenje");
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

    const fetchIgranja = (pozoristeid) => {
        setLoading(true);
        axiosClient
            .get(`/admin/get-igranja-pozorista/${pozoristeid}`)
            .then((res) => {
                const fetchedIgranja = res.data?.map((igranje) => ({
                    id: igranje.seigraid,
                    naziv_predstave: igranje.predstava.naziv_predstave,
                    scenaid: igranje.scena?.scenaid,
                    datum: igranje.datum,
                    vreme: moment("1970.01.01 " + igranje.vreme).format(
                        "HH:mm",
                    ),
                }));
                setRows(fetchedIgranja);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const validateIgranjeStore = () => {
        const newErrors = {};

        if (!formData.predstavaid) {
            newErrors.predstavaid = "Obavezno izaberi predstavu.";
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

    const handleEditRow = useCallback(
        (rowId) => {
            if (editingRowId !== null) return;

            const rowToEdit = rows.find((row) => row.id === rowId);
            if (!rowToEdit) return;

            setOriginalRow({ ...rowToEdit });
            setEditingRowId(rowId);

            requestAnimationFrame(() => {
                const api = gridRef.current?.api;
                if (!api) return;

                const rowIndex = rows.findIndex((row) => row.id === rowId);

                api.startEditingCell({
                    rowIndex,
                    colKey: "scenaid",
                });
            });
        },
        [editingRowId, rows],
    );

    const handleSaveRow = useCallback(async (rowId) => {
        const api = gridRef.current?.api;
        if (!api) return;

        api.stopEditing(false); // commit changes
    }, []);

    const onRowValueChanged = useCallback(
        async (params) => {
            const updatedRow = params.data;
            setLoading(true);
            try {
                await csrf();

                await axiosClient.put(
                    "/admin/igranje-update",
                    {
                        seigraid: updatedRow.id,
                        pozoristeid: pozoriste.pozoristeid,
                        scenaid: updatedRow.scenaid,
                        datum: updatedRow.datum,
                        vreme: updatedRow.vreme,
                    },
                    {
                        headers: {
                            "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                        },
                    },
                );

                setRows((prev) =>
                    prev.map((row) =>
                        row.id === updatedRow.id ? { ...updatedRow } : row,
                    ),
                );

                setEditingRowId(null);
                setOriginalRow(null);
                toast.success("Uspesno sacuvano izvodjenje");
            } catch (err) {
                console.error(err);
                toast.error("Greska prilikom cuvanja izvodjenja");

                if (originalRow) {
                    setRows((prev) =>
                        prev.map((row) =>
                            row.id === updatedRow.id ? { ...originalRow } : row,
                        ),
                    );
                }

                setEditingRowId(null);
                setOriginalRow(null);
            } finally {
                setLoading(false);
            }
        },
        [pozoriste, originalRow],
    );

    const handleCancelRow = useCallback(
        (rowId) => {
            const api = gridRef.current?.api;
            if (!api) return;

            api.stopEditing(true); // cancel changes

            if (originalRow) {
                setRows((prev) =>
                    prev.map((row) => (row.id === rowId ? originalRow : row)),
                );
            }

            setEditingRowId(null);
            setOriginalRow(null);
        },
        [originalRow],
    );

    const handleCellClicked = useCallback(
        (params) => {
            if (!editingRowId) return;

            // allow clicks inside the row currently being edited
            if (params.data?.id === editingRowId) return;

            // keep focus in the current edited row
            const api = gridRef.current?.api;
            if (!api) return;

            const rowIndex = rows.findIndex((row) => row.id === editingRowId);
            if (rowIndex >= 0) {
                requestAnimationFrame(() => {
                    api.startEditingCell({
                        rowIndex,
                        colKey: "scenaid",
                    });
                });
            }
        },
        [editingRowId, rows],
    );

    const processRowUpdate = async (newRow) => {
        const newDatum = moment(newRow.datum).format("YYYY-MM-DD");
        await csrf();
        axiosClient
            .put(
                `/admin/igranje-update`,
                {
                    seigraid: newRow.id,
                    pozoristeid: pozoriste.pozoristeid,
                    scenaid: newRow.scena,
                    datum: newDatum,
                    vreme: newRow.vreme,
                },
                {
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                    },
                },
            )
            .then((res) => {
                toast.success("Uspesno sacuvano izvodjenje");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Greska prilikom cuvanja izvodjenja");
            });

        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleScrapeButtonClick = () => {
        router.push(`/admin/repertoari/${pozoristeSlug}/scrape`);
    };

    const columns = useMemo(
        () => [
            { field: "id", headerName: "Id", flex: 0.5 },
            {
                field: "naziv_predstave",
                headerName: "Naziv predstave",
                flex: 2,
                editable: false,
            },
            {
                field: "scenaid",
                headerName: "Scena",
                flex: 1,
                type: "singleSelect",
                editable: (params) => params.data.id === editingRowId,
                cellEditor: ScenaSelectEditor,
                cellEditorParams: {
                    values: dbScene,
                },
                valueFormatter: (params) => {
                    const found = dbScene.find(
                        (opt) => String(opt.value) === String(params.value),
                    );
                    return found ? found.label : "";
                },
            },
            {
                field: "datum",
                headerName: "Datum",
                flex: 1,
                editable: (params) => params.data.id === editingRowId,
                cellEditor: DateEditor,
                valueFormatter: (params) =>
                    params.value
                        ? moment(params.value).format("DD. MMM YYYY")
                        : "",
            },
            {
                field: "vreme",
                headerName: "Vreme",
                flex: 1,
                editable: (params) => params.data.id === editingRowId,
                cellEditor: TimeEditor,
            },
            {
                field: "actions",
                headerName: "Actions",
                flex: 1,
                editable: false,
                cellRenderer: ActionCellRenderer,
            },
        ],
        [editingRowId, dbScene],
    );

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    return (
        <>
            <AdminHeader
                metaTitle={`Dodaj repertoar - ${pozoriste.naziv_pozorista}`}
            />
            <h1>Dodaj repertoar za {pozoriste.naziv_pozorista}</h1>
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
                                    {errors?.predstavaid && (
                                        <span className="text-danger">
                                            {errors.predstavaid}
                                        </span>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Scena</Form.Label>
                                    <Select
                                        name="scena"
                                        options={dbScene}
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
                        <Col md={6}>
                            <Button
                                onClick={handleScrapeButtonClick}
                                variant="primary"
                                className="mb-3"
                            >
                                Scrape
                            </Button>
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
                            editType="fullRow"
                            context={{
                                editingRowId,
                                handleEditRow,
                                handleSaveRow,
                                handleCancelRow,
                            }}
                            getRowId={(params) => String(params.data.id)}
                            stopEditingWhenCellsLoseFocus={false}
                            onRowValueChanged={onRowValueChanged}
                            suppressClickEdit={true}
                            onCellClicked={handleCellClicked}
                        />
                    </div>
                </Box>
                {/* Confirmation Dialog */}
                <Dialog open={openDialog} onClose={handleCancel}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete{" "}
                        <strong>{selectedRow?.name}</strong>?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button
                            onClick={handleConfirmDelete}
                            color="error"
                            variant="contained"
                            startIcon={
                                deleteLoading ? (
                                    <CircularProgress
                                        size={18}
                                        color="inherit"
                                    />
                                ) : undefined
                            }
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
