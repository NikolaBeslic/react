import { useEffect, useState } from "react";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import axiosClient from "../../../utils/axios";
import { Button, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import { useRouter } from "next/router";

export default function FestivaliPage() {
    const [festivali, setFestivali] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-all-festivali")
            .then((res) => {
                setFestivali(res.data);
                console.log(res.data);
            })
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

    const formatDateRange = (date1, date2) => {
        const d1 = moment(date1);
        const d2 = moment(date2);
        if (d1.isSame(d2, "month") && d1.isSame(d2, "year")) {
            return `${d1.format("DD")} - ${d2.format("DD")}. ${d1.format(
                "MMMM YYYY"
            )}`;
        } else {
            return `${d1.format("DD. MM")} - ${d2.format("DD. MM. YYYY")}`;
        }
    };

    const columns = [
        { field: "naziv_festivala", headerName: "Naziv festivala", flex: 4 },
        { field: "naziv_grada", headerName: "Grad", flex: 2 },
        { field: "datumi", headerName: "Datumi", flex: 2 },
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

    festivali.map((fest) =>
        rows.push({
            id: fest.festivalid,
            naziv_festivala: fest.naziv_festivala,
            naziv_grada: fest.grad.naziv_grada,
            datumi: formatDateRange(fest.datumod, fest.datumdo),
        })
    );

    const onEditButtonClick = (event, params) => {
        event.preventDefault();
        router.push(`/admin/festivali/create?festivalid=${params.id}`);
    };

    return (
        <>
            <AdminHeader metaTitle="Festivali" />
            <div className="container">
                <h1>Festivali</h1>
                <Button
                    href="/admin/festivali/create"
                    variant="contained"
                    startIcon={<AddIcon />}
                    className="mb-3"
                    size="small"
                >
                    Dodaj festival
                </Button>
                <Paper sx={{ height: 800, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        loading={loading}
                        sx={{ border: 0 }}
                        autoPageSize
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
                    />
                </Paper>
            </div>
        </>
    );
}
