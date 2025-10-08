import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function PozoristaPage() {
    const [loading, setLoading] = useState(false);
    const [pozorista, setPozorista] = useState([]);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-all-pozorista")
            .then((res) => setPozorista(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    function EditButton(params) {
        return (
            <Button
                onClick={(e) => onEditButtonClick(e, params.params)}
                variant="outlined"
                startIcon={<EditNoteIcon />}
                size="small"
            >
                Edit
            </Button>
        );
    }

    const columns = [
        { field: "naziv_pozorista", headerName: "Naziv pozorista", flex: 1 },
        {
            field: "edit",
            headerName: "",
            width: 200,
            flex: 1,
            align: "center",
            renderCell: (params) => <EditButton params={params} />,
        },
    ];
    const rows = new Array();

    pozorista.map((poz) =>
        rows.push({
            id: poz.pozoristeid,
            naziv_pozorista: poz.naziv_pozorista,
        })
    );

    const onEditButtonClick = (event, params) => {
        event.preventDefault();
        router.push(`/admin/pozorista/create?pozoristeid=${params.id}`);
    };

    return (
        <>
            <AdminHeader metaTitle="Pozorišta" />
            <div className="container">
                <h1>Pozorista</h1>
                <div className="container">
                    <Button
                        href="/admin/pozorista/create"
                        variant="contained"
                        startIcon={<AddIcon />}
                        className="mb-3"
                        size="small"
                    >
                        Dodaj pozoriste
                    </Button>
                    <Paper sx={{ height: 800, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            sx={{ border: 0 }}
                            autoPageSize
                            loading={loading}
                        />
                    </Paper>
                </div>
            </div>
        </>
    );
}
