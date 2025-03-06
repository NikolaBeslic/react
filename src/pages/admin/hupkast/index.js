import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axiosClient from "../../../utils/axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import toast from "react-hot-toast";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function HuPkastPage() {
    const [allHupkast, setAllHupkast] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axiosClient
            .get("/admin/get-all-hupkast")
            .then((res) => {
                console.log(res.data);
                setAllHupkast(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleCheckRSSClick = () => {
        setLoading(true);
        axiosClient
            .get("/admin/check-hupkast-rss")
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    toast.success(res.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                let errorMsg = err.response.data
                    ? err.response.data
                    : err.message;
                toast.error(errorMsg);
                setLoading(false);
            });
    };

    const handleEditClick = (hupkastid) => {
        console.log(hupkastid);
        router.push(`/admin/hupkast/create?tekstid=${hupkastid}`);
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
    allHupkast.map((hupkastSingle) => {
        rows.push({
            id: hupkastSingle.tekstid,
            naslov: hupkastSingle.naslov,
            published_at: moment(hupkastSingle.published_at).format(
                "DD.MM.YYYY"
            ),
        });
    });

    return (
        <>
            <AdminHeader metaTitle="HuPkast" />
            <h1>HuPkast</h1>
            <div className="container">
                <Button variant="contained" onClick={handleCheckRSSClick}>
                    Check RSS
                </Button>

                <Button variant="contained" type="secondary" color="inherit">
                    <Link href="/admin/hupkast/create">Dodaj nove epizode</Link>
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
