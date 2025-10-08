import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axiosClient from "../../../utils/axios";
import { useRouter } from "next/router";
import { Button, ButtonGroup, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function TekstoviPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dayInMonthComparator = (d1, d2) => {
        const a1 = d1 ? moment(d1, "DD.MM.YYYY") : null;
        const a2 = d2 ? moment(d2, "DD.MM.YYYY") : null;

        return a1 - a2;
    };

    useEffect(() => {
        debugger;
        setLoading(true);
        axiosClient
            .get("/admin/tekstovi")
            .then((res) => {
                console.log(res.data);
                setPosts(res.data);
            })
            .catch((error) => console.error(error))
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
        { field: "naslov", headerName: "Naslov", flex: 3 },
        { field: "kategorija", headerName: "Kategorija", flex: 1 },
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
    posts.map((post) => {
        rows.push({
            id: post.tekstid,
            naslov: post.naslov,
            kategorija: post.kategorija.naziv_kategorije,
            published_at: moment(post.published_at).format("DD.MM.YYYY"),
        });
    });

    const onEditButtonClick = (e, params) => {
        console.log(params);
        router.push(`/admin/tekstovi/create?tekstid=${params.id}`);
    };

    const handleCreateClick = (kategorijaid) => {
        router.push(`/admin/tekstovi/create?kategorijaid=${kategorijaid}`);
    };

    const handleIstakniClick = (row) => {
        let updatedData = null;

        axiosClient
            .put(`/admin/tekstovi/istakni?tekstid=${row.tekstid}`)
            .then((res) => {
                updatedData = res.data;
                const updatedRows = posts.map((post) =>
                    post.tekstid == row.tekstid
                        ? { ...post, ...updatedData }
                        : post
                );

                setPosts(updatedRows);
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <AdminHeader metaTitle="Tekstovi" />
            <div className="container">
                <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                    sx={{ mb: 5 }}
                >
                    <Button
                        onClick={() => handleCreateClick(1)}
                        variant="contained"
                        startIcon={<AddIcon />}
                    >
                        Dodaj vest
                    </Button>
                    <Button
                        onClick={() => handleCreateClick(2)}
                        variant="contained"
                        startIcon={<AddIcon />}
                    >
                        Dodaj Intervju
                    </Button>
                </ButtonGroup>

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
