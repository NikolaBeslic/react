import { useEffect, useState } from "react";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import axiosClient from "../../../utils/axios";
import { Button } from "react-bootstrap";
import {
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faPenToSquare,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useRouter } from "next/router";
import { useStateContext } from "../../../contexts/StateContext";
import { AgGridReact } from "ag-grid-react";

export default function KomentariPage() {
    const [komentari, setKomentari] = useState([]);
    const router = useRouter();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [loading, setLoading] = useState(false);
    const [odobriLoading, setOdobriLoading] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const { unnaprovedCommentsCount, setUnnapprovedCommentsCount } =
        useStateContext();

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
                    prev.filter((r) => r.komentarid !== selectedRow.komentarid),
                );
                toast.success("Uspesno obrisan komentar");
                if (res.data.unnapprovedCommentsCount !== undefined) {
                    setUnnapprovedCommentsCount(
                        res.data.unnapprovedCommentsCount,
                    );
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Greska prilikom brisanja komentara");
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

    const onEditButtonClick = (event, params) => {
        debugger;
        event.preventDefault();
        setLoading(true);
        axiosClient
            .put(`/admin/odobri-komentar/${params.id}`)
            .then((res) => {
                const updatedKomentar = res.data.komentar;
                setKomentari((prevKom) =>
                    prevKom.map((komentar) =>
                        komentar.komentarid === updatedKomentar.komentarid
                            ? updatedKomentar
                            : komentar,
                    ),
                );
                setUnnapprovedCommentsCount(unnaprovedCommentsCount - 1);
                toast.success("Uspesno odobren komentar");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Doslo je do greske, pokusajte ponovo");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const columns = [
        { field: "id", headerName: "Id", flex: 1 },
        { field: "korisnik", headerName: "Korisnik", flex: 2 },
        {
            field: "komentar",
            headerName: "Komentar",
            flex: 7,
            wrapText: true,
            autoHeight: true,
        },
        { field: "predstava", headerName: "Predstava", flex: 3 },
        { field: "datum", headerName: "Datum", flex: 2 },
        {
            field: "edit",
            headerName: "",
            width: 220,
            flex: 2,
            align: "center",
            cellRenderer: (params) => {
                if (params.data.statusid == 2)
                    return (
                        <Button
                            size="sm"
                            variant="outline-primary"
                            disabled={true}
                        >
                            <FontAwesomeIcon icon={faCheck} /> Odobren
                        </Button>
                    );
                else
                    return (
                        <Button
                            onClick={(e) => onEditButtonClick(e, params.data)}
                            size="sm"
                            variant="info"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} /> Odobri
                        </Button>
                    );
            },
        },
        {
            field: "delete",
            headerName: "",
            width: 200,
            flex: 2,
            align: "center",
            cellRenderer: (params) => (
                <Button
                    onClick={(e) => handleDeleteClick(e, params.data.id)}
                    variant="danger"
                    size="small"
                >
                    <FontAwesomeIcon icon={faTrashCan} /> Obriši
                </Button>
            ),
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
        }),
    );

    return (
        <>
            <AdminHeader metaTitle="Komentari" />
            <div className="container">
                <h1>Komentari</h1>
                <div
                    style={{
                        width: "100%",
                        height: "600px",
                        marginTop: "25px",
                        marginBottom: "30px",
                    }}
                >
                    <AgGridReact
                        rowData={rows}
                        columnDefs={columns}
                        pagination={true}
                        paginationAutoPageSize={true}
                        loading={loading}
                    />
                </div>
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
