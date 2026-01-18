import { useEffect, useState } from "react";
import axiosClient from "../../../../utils/axios";
import {
    Paper,
    Button,
    Alert,
    AlertTitle,
    IconButton,
    Collapse,
    Box,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import moment from "moment";
import { toast } from "react-hot-toast";
import AdminHeader from "../../../../components/admin/layout/AdminHeader";
import { useRouter } from "next/router";

export default function RepertoarPozoristaScrapePage() {
    const router = useRouter();
    const { pozoristeSlug } = router.query;
    const [igranja, setIgranja] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);

    const [scrapeSaveResponse, setScrapeSaveResponse] = useState(null);
    const [successAlertOpen, setSuccessAlertOpen] = useState(true);
    const [errorAlertOpen, setErrorAlertOpen] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (pozoristeSlug) {
            axiosClient
                .get(`/admin/repertoari/${pozoristeSlug}/scrape`)
                .then((res) => {
                    setIgranja(res.data);
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [pozoristeSlug]);

    function SaveSingleButton(params) {
        return (
            <Button
                onClick={(e) => handleSaveSingleButtonClick(e, params)}
                variant="contained"
                startIcon={<SaveIcon />}
                size="small"
                disabled={params.row.predstavaid ? false : true}
            >
                Sacuvaj
            </Button>
        );
    }

    const handleSaveSingleButtonClick = (e, params) => {
        console.log(params);
        const igranje = {
            pozoristeid: params.row.pozoristeid,
            predstavaid: params.row.predstavaid,
            scenaid: params.row.scenaid,
            datum: moment(params.row.datum, "DD.MM.YYYY").format("YYYY-MM-DD"),
            vreme: params.row.vreme,
        };

        axiosClient
            .post("/admin/igranje-store", igranje)
            .then((res) => {
                toast.success("Uspesno sacuvano izvodjenje");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Greska prilikom cuvanja izvodjenja");
            });
        console.log(igranje);
    };

    function SaveAllButton(params) {
        return (
            <Button
                onClick={(e) => handleSaveAllButtonClick(e, params)}
                variant="contained"
                startIcon={<LibraryAddIcon />}
                size="small"
                className="mb-2 mt-2"
                color="success"
            >
                Sacuvaj sve
            </Button>
        );
    }

    const handleSaveAllButtonClick = (e, params) => {
        if (selectionModel.length === 0) {
            toast.error("Niste izabrali nijedno izvodjenje za cuvanje");
            return;
        }
        const selectedRows = rows.filter((r) => selectionModel.includes(r.id));
        selectedRows.map((row) => {
            row.datum = moment(row.datum, "DD.MM.YYYY").format("YYYY-MM-DD");
        });
        setLoading(true);
        axiosClient
            .post("/admin/igranje-multi-store", { igranja: selectedRows })
            .then((res) => {
                console.log(res.data);
                setScrapeSaveResponse(res.data);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Greska prilikom cuvanja izvodjenja");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const columns = [
        {
            field: "naziv_predstave",
            headerName: "Predstava",
            flex: 3,
        },
        { field: "datum", headerName: "Datum", flex: 1 },
        { field: "vreme", headerName: "Vreme", flex: 1 },
        { field: "naziv_scene", headerName: "Scena", flex: 2 },
        {
            field: "add",
            headerName: "",
            width: 200,
            flex: 1,
            align: "center",
            renderCell: (params) => SaveSingleButton(params),
        },
    ];
    const rows = new Array();

    igranja.map((igr) =>
        rows.push({
            id: igr.datum + " " + igr.vreme,
            naziv_predstave: igr.predstava
                ? igr.predstava.naziv_predstave
                : "Predstava nije pronadjena, ili je potrebno dodati, a mozda je i gostovanje",
            datum: moment(igr.datum).format("DD.MM.YYYY"),
            vreme: igr.vreme,
            naziv_scene: igr.scena?.naziv_scene,
            pozoristeid: igr.pozoriste?.pozoristeid,
            predstavaid: igr.predstava?.predstavaid,
            scenaid: igr.scena?.scenaid,
        })
    );

    return (
        <>
            <AdminHeader metaTitle={`Preuzmi repertoar `} />
            <h1>Preuzmi repertoar </h1>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                {/* LEFT */}
                <SaveAllButton />

                {/* RIGHT */}
                <Box display="flex" gap={2}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                            router.push(
                                `/admin/repertoari/${pozoristeSlug}/create`
                            )
                        }
                    >
                        Povratak na repertoar
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => router.push("/admin/repertoari")}
                    >
                        Povratak na listu pozorista
                    </Button>
                </Box>
            </Box>

            {scrapeSaveResponse?.saved.length > 0 && (
                <Collapse in={successAlertOpen}>
                    <Alert
                        severity="success"
                        className="mb-4"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setSuccessAlertOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Uspesno sacuvano {scrapeSaveResponse.saved.length}{" "}
                        izvođenja.
                    </Alert>
                </Collapse>
            )}

            {scrapeSaveResponse?.errors.length > 0 && (
                <Collapse in={errorAlertOpen}>
                    <Alert
                        severity="error"
                        className="mb-4"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErrorAlertOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        <AlertTitle>Greške prilikom čuvanja</AlertTitle>
                        <ul>
                            {scrapeSaveResponse.errors.map((err, index) => (
                                <li key={index}>{err}</li>
                            ))}
                        </ul>
                    </Alert>
                </Collapse>
            )}

            <Paper sx={{ height: 800, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    isRowSelectable={(params) =>
                        params.row.predstavaid ? true : false
                    }
                    onRowSelectionModelChange={(newSelection) => {
                        setSelectionModel(newSelection);
                    }}
                    rowSelectionModel={selectionModel}
                    sx={{ border: 0 }}
                    loading={loading}
                    slots={{ toolbar: GridToolbar }}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    pageSize={100}
                    slotProps={{
                        pagination: {
                            showFirstButton: true,
                            showLastButton: true,
                        },
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "Datum", sort: "asc" }],
                        },
                        filter: {
                            filterModel: {
                                items: [],
                                quickFilterValues: [],
                            },
                        },
                        pagination: {
                            paginationModel: { pageSize: 100, page: 0 },
                        },
                    }}
                />
            </Paper>
        </>
    );
}
