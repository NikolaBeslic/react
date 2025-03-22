import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import { Button, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

export default function RepertoariPage() {
    const [pozorista, setPozorista] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-all-pozorista")
            .then((res) => {
                setPozorista(res.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
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

    function AddButton(params) {
        return (
            <Button
                onClick={(e) => onAddButtonClick(e, params.params)}
                variant="outlined"
                startIcon={<AddIcon />}
                size="small"
            >
                Dodaj repertoar
            </Button>
        );
    }

    const columns = [
        { field: "naziv_pozorista", headerName: "Naziv pozorista", flex: 1 },
        {
            field: "add",
            headerName: "",
            width: 200,
            flex: 1,
            align: "center",
            renderCell: (params) => <AddButton params={params} />,
        },
    ];
    const rows = new Array();

    pozorista.map((poz) =>
        rows.push({
            id: poz.pozoristeid,
            naziv_pozorista: poz.naziv_pozorista,
            pozoriste_slug: poz.pozoriste_slug,
        })
    );

    const onEditButtonClick = (event, params) => {
        event.preventDefault();
        router.push(`/admin/repertoari/${params.pozoriste_slug}create`);
    };

    const onAddButtonClick = (event, params) => {
        event.preventDefault();
        console.log(params);
        router.push(`/admin/repertoari/${params.row.pozoriste_slug}/create`);
    };

    return (
        <>
            <h1>Repertoari</h1>
            <div className="container">
                <Button
                    href="/admin/repertoari/dodaj-gostovanje"
                    variant="contained"
                    startIcon={<AddIcon />}
                    className="mb-3"
                    size="small"
                >
                    Dodaj gostovanje
                </Button>
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
                                sortModel: [
                                    { field: "naziv_pozorista", sort: "asc" },
                                ],
                            },
                            filter: {
                                filterModel: {
                                    items: [],
                                    quickFilterValues: [],
                                },
                            },
                        }}
                    />
                </Paper>
            </div>
        </>
    );
}
