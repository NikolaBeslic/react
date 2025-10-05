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
    Toolbar,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { toast } from "react-hot-toast";
import { useStateContext } from "../../../../contexts/StateContext";
import { Row, Spinner } from "react-bootstrap";
import {
    DataGrid,
    GridRowModes,
    GridRowEditStopReasons,
    GridActionsCellItem,
    GridDeleteIcon,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AdminHeader from "../../../../components/admin/layout/AdminHeader";

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    return (
        <Toolbar>
            <Tooltip title="Add record">
                {/* <ToolbarButton onClick={handleClick}>
                    <AddIcon fontSize="small" />
                </ToolbarButton> */}
            </Tooltip>
        </Toolbar>
    );
}

function TimeEditInputCell(props) {
    const { id, value, field, api } = props;

    const handleChange = (newValue) => {
        console.log(newValue);
        api.setEditCellValue({
            id,
            field,
            value: newValue.format("HH:mm"),
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
                value={moment("1970.01.01 " + value)} // 👈 ensure value is moment, not string
                onChange={handleChange}
                slotProps={{
                    textField: { size: "small", variant: "standard" },
                }}
            />
        </LocalizationProvider>
    );
}

export default function RepertoarPozoristaCreatePage() {
    const router = useRouter();
    const { isLoading, showLoading, hideLoading } = useStateContext();
    const { pozoristeSlug } = router.query;
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [pozoriste, setPozoriste] = useState([]);
    const [igranja, setIgranja] = useState([]);

    const [dbPredstave, setDbPredstave] = useState([]);
    const [dbScene, setDbScene] = useState([]);

    const [datum, setDatum] = useState(null);
    const [vreme, setVreme] = useState(null);

    let [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    let [formData, setFormData] = useState({
        pozoristeid: null,
        predstavaid: null,
        scenadid: null,
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
                .catch((err) => {
                    console.error(err);
                });
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
        setLoading(true);
        axiosClient
            .get(`/admin/get-igranja-pozorista/${pozoristeid}`)
            .then((res) => {
                setIgranja(res.data);
                setRows(
                    res.data?.map((igranje) => ({
                        id: igranje.seigraid,
                        naziv_predstave: igranje.predstava.naziv_predstave,
                        scena: igranje.scena?.scenaid,
                        datum: new Date(igranje.datum),
                        vreme: moment("1970.01.01 " + igranje.vreme).format(
                            "HH:mm"
                        ),
                    }))
                );
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    /* МAKING GRID EDITABLE */
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        console.log(id);
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        debugger;
        const newDatum = moment(newRow.datum).format("YYYY-MM-DD");

        axiosClient
            .put(`/admin/igranje-update`, {
                seigraid: newRow.id,
                pozoristeid: pozoriste.pozoristeid,
                scenaid: newRow.scena,
                datum: newDatum,
                vreme: newRow.vreme,
            })
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

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: "id", headerName: "Id", flex: 0.5 },
        {
            field: "naziv_predstave",
            headerName: "Naziv predstave",
            flex: 3,
        },
        {
            field: "scena",
            headerName: "Scena",
            flex: 1,
            type: "singleSelect",
            editable: true,
            valueOptions: dbScene,
        },
        {
            field: "datum",
            headerName: "Datum",
            flex: 1,
            type: "date",
            valueFormatter: (value) => {
                // value is the raw date
                return moment(value).format("DD. MMM YYYY.");
            },
            editable: true,
        },
        {
            field: "vreme",
            headerName: "Vreme",
            flex: 1,
            type: "time",
            editable: true,

            valueFormatter: (value) => {
                // value is the raw time
                return moment("1970.01.01 " + value).format("HH:mm");
            },
            renderEditCell: (params) => <TimeEditInputCell {...params} />,
        },

        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            flex: 1,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key={"save"}
                            icon={<SaveIcon />}
                            label="Save"
                            material={{
                                sx: {
                                    color: "primary.main",
                                },
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            key={"Cancel"}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={"edit"}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={"delete"}
                        icon={<GridDeleteIcon />}
                        label="Delete"
                        onClick={() => handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <AdminHeader
                metaTitle={`Dodaj repertoar - ${pozoriste.naziv_pozorista}`}
            />
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
                            loading={loading}
                            showToolbar
                            slots={{ toolbar: EditToolbar }}
                            slotProps={{
                                toolbar: { setRows, setRowModesModel },
                            }}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            experimentalFeatures={{ newEditingApi: true }} // if using v5/v6
                            onProcessRowUpdateError={(error) =>
                                console.error(error)
                            }
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
