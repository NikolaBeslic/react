import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

export default function StatisticsDetailsPage() {
    const router = useRouter();
    const { fetchId } = router.query;

    const [fetchDetails, setFetchDetials] = useState([]);

    useEffect(() => {
        if (fetchId) {
            axiosClient
                .get(`/admin/get-fetch-details/${fetchId}`)
                .then((res) => {
                    console.log(res.data);
                    setFetchDetials(res.data);
                })
                .catch((err) => console.error(err));
        }
    }, [fetchId]);

    const columns = [
        { field: "id", headerName: "Id", flex: 0.5 },
        { field: "title", headerName: "Stranica ", flex: 3 },
        { field: "url", headerName: "Url", flex: 3 },
        { field: "views", headerName: "Pregleda", flex: 1 },
    ];
    const rows = new Array();

    fetchDetails?.map((detail) =>
        rows.push({
            id: detail.fetch_details_id,
            title: detail.title,
            url: detail.url,
            views: detail.views,
        })
    );

    return (
        <>
            <h1>Detalji</h1>
            <Paper sx={{ height: 800, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sx={{ border: 0, mt: 4 }}
                    autoPageSize
                    initialState={{
                        sorting: {
                            sortModel: [
                                {
                                    field: "views",
                                    sort: "desc",
                                },
                            ],
                        },
                    }}
                />
            </Paper>
        </>
    );
}
