import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Button, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import { useRouter } from "next/router";
import moment from "moment";

export default function PredstavePage() {
    const [predstave, setPredstave] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dayInMonthComparator = (d1, d2) => {
        const a1 = d1 ? moment(d1, "DD.MM.YYYY") : null;
        const a2 = d2 ? moment(d2, "DD.MM.YYYY") : null;

        return a1 - a2;
    };

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-all-predstave")
            .then((res) => {
                setPredstave(res.data);
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

    const columns = [
        { field: "naziv_predstave", headerName: "Naziv predstave", flex: 1 },
        { field: "pozorista", headerName: "Pozorista", flex: 1 },
        {
            field: "premijera",
            headerName: "Premijera",
            flex: 1,
            sortComparator: dayInMonthComparator,
        },
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

    predstave.map((pred) =>
        rows.push({
            id: pred.predstavaid,
            naziv_predstave: pred.naziv_predstave,
            pozorista: pred.pozorista
                .map((poz) => poz.naziv_pozorista)
                .join(", "),
            premijera: pred.premijera
                ? moment(pred.premijera).format("DD.MM.YYYY")
                : "",
        })
    );

    const onEditButtonClick = (event, params) => {
        event.preventDefault();
        router.push(`/admin/predstave/create?predstavaid=${params.id}`);
    };

    return (
        <>
            <div className="container">
                <h1>Predstave</h1>
                <Button
                    href="/admin/predstave/create"
                    variant="contained"
                    sx={{ mb: 5 }}
                    startIcon={<AddIcon />}
                >
                    Dodaj predstavu
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
                                    { field: "premijera", sort: "desc" },
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
