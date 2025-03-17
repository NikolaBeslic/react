import { Button, Paper } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddIcon from "@mui/icons-material/Add";
import axiosClient from "../../../utils/axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import toast from "react-hot-toast";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function HuPikonPage() {
    const [allHupikon, setAllHupikon] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-all-hupikon")
            .then((res) => {
                console.log(res.data);
                setLoading(false);
                setAllHupikon(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const onEditButtonClick = (e, params) => {
        router.push(`/admin/hupikon/create?tekstid=${params.id}`);
    };

    /* data grid stuff */
    const dayInMonthComparator = (d1, d2) => {
        const a1 = d1 ? moment(d1, "DD.MM.YYYY") : null;
        const a2 = d2 ? moment(d2, "DD.MM.YYYY") : null;

        return a1 - a2;
    };

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
        { field: "naslov", headerName: "Naslov", flex: 3 },
        {
            field: "published_at",
            headerName: "Datum objave",
            flex: 1,
            sortComparator: dayInMonthComparator,
        },
        {
            field: "edit",
            headerName: "",
            width: 100,
            flex: 1,
            align: "center",
            renderCell: (params) => <EditButton params={params} />,
        },
    ];

    const rows = new Array();
    allHupikon.map((hupikon) => {
        rows.push({
            id: hupikon.tekstid,
            naslov: hupikon.naslov,
            published_at: moment(hupikon.published_at).format("DD.MM.YYYY"),
        });
    });

    return (
        <>
            <AdminHeader metaTitle="HuPikon" />
            <h1>HuPikon</h1>
            <div className="container">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                >
                    <Link href="/admin/hupikon/create">Dodaj novi hupikon</Link>
                </Button>

                <Paper sx={{ height: 800, width: "100%", mt: 2 }}>
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
                                    { field: "datum_objave", sort: "desc" },
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
