import { useEffect, useState } from "react";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import axiosClient from "../../../utils/axios";
import {
    Button,
    CircularProgress,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import moment from "moment";
import { useRouter } from "next/router";

export default function KomentariPage() {
    const [komentari, setKomentari] = useState([]);
    const router = useRouter();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [loading, setLoading] = useState(false);
    const [odobriLoading, setOdobriLoading] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-all-komentari")
            .then((res) => {
                setKomentari(res.data);
                console.log(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    /* Dialog  */
    const handleDeleteClick = (ev, id) => {
        ev.preventDefault();
        debugger;
        setSelectedRow(komentari.find((kom) => kom.komentarid === id));
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        setDeleteLoading(true);
        axiosClient
            .delete(`/admin/komentar-delete/${selectedRow.komentarid}`)
            .then((res) => {
                setKomentari((prev) =>
                    prev.filter((r) => r.komentarid !== selectedRow.komentarid)
                );
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

    function DeleteButton(params) {
        const row = params.params.row;

        return (
            <Button
                onClick={(e) => handleDeleteClick(e, row.id)}
                variant="outlined"
                size="small"
                color="error"
                startIcon={<DeleteOutlineOutlinedIcon />}
            >
                Obriši
            </Button>
        );
    }

    function EditButton(params) {
        const row = params.params.row;
        const isButtonLoading = odobriLoading === params.id;
        return (
            <Button
                onClick={(e) => onEditButtonClick(e, row)}
                variant="contained"
                size="small"
                startIcon={
                    isButtonLoading ? (
                        <CircularProgress size={18} color="inherit" />
                    ) : (
                        <AddTaskOutlinedIcon />
                    )
                }
            >
                Odobri
            </Button>
        );
    }

    const onEditButtonClick = (event, params) => {
        debugger;
        event.preventDefault();
        setOdobriLoading(params.id);
        axiosClient
            .put(`/admin/odobri-komentar/${params.id}`)
            .then((res) => {
                const updatedKomentar = res.data.komentar;
                setKomentari((prevKom) =>
                    prevKom.map((komentar) =>
                        komentar.komentarid === updatedKomentar.komentarid
                            ? updatedKomentar
                            : komentar
                    )
                );
                toast.success("Uspesno odobren komentar");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Doslo je do greske, pokusajte ponovo");
            })
            .finally(() => {
                setOdobriLoading(null);
            });
    };

    const columns = [
        { field: "id", headerName: "Id", flex: 1 },
        { field: "korisnik", headerName: "Korisnik", flex: 1 },
        { field: "komentar", headerName: "Komentar", flex: 4 },
        { field: "predstava", headerName: "Predstava", flex: 2 },
        { field: "datum", headerName: "Datum", flex: 1 },
        {
            field: "edit",
            headerName: "",
            width: 200,
            flex: 1,
            align: "center",
            renderCell: (params) => {
                if (params.row.statusid == 2)
                    return (
                        <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            disabled
                            startIcon={<DoneOutlineOutlinedIcon />}
                        >
                            Odobren
                        </Button>
                    );
                else return <EditButton params={params} />;
            },
        },

        {
            field: "delete",
            headerName: "",
            width: 200,
            flex: 1,
            align: "center",
            renderCell: (params) => <DeleteButton params={params} />,
        },
    ];
    const rows = new Array();

    komentari.map((kom) =>
        rows.push({
            id: kom.komentarid,
            korisnik: kom.korisnik.korisnicko_ime,
            komentar: kom.tekst_komentara,
            predstava: kom.predstava.naziv_predstave,
            datum: moment(kom.created_at).format("DD. MM. YYYY"),
            statusid: kom.statuskomentaraid,
        })
    );

    return (
        <>
            <AdminHeader metaTitle="Komentari" />
            <div className="container">
                <h1>Komentari</h1>
                <Paper sx={{ height: 800, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        sx={{ border: 0 }}
                        autoPageSize
                        loading={loading}
                        slots={{ toolbar: GridToolbar }}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        getRowHeight={() => "auto"}
                        slotProps={{
                            pagination: {
                                showFirstButton: true,
                                showLastButton: true,
                            },
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                    />
                </Paper>
                {/* Confirmation Dialog */}
                <Dialog open={openDialog} onClose={handleCancel}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete
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
