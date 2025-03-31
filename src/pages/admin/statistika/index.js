import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import moment from "moment";
import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import DvrIcon from "@mui/icons-material/Dvr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useRouter } from "next/router";

export default function StatistikaPage() {
    const [fetches, setFetches] = useState([]);
    const [monthAndYear, setMonthAndYear] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-fetches")
            .then((res) => {
                console.log(res.data);
                setFetches(res.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    const columns = [
        { field: "id", headerName: "Id", flex: 0.5 },
        { field: "naziv", headerName: "Naziv ", flex: 3 },
        { field: "parameter", headerName: "Parametar ", flex: 2 },
        { field: "timestamp", headerName: "Ucitano", flex: 1 },
        { field: "brojTekstova", headerName: "Broj", flex: 1 },
        {
            field: "details",
            headerName: "",
            width: 100,
            flex: 1,
            align: "center",
            renderCell: (params) => (
                <Button
                    onClick={(e) => handleDetailClick(e, params)}
                    variant="outlined"
                    startIcon={<DvrIcon />}
                    size="small"
                >
                    Detalji
                </Button>
            ),
        },
    ];
    const rows = new Array();

    fetches?.map((fetch) =>
        rows.push({
            id: fetch.fetch_id,
            naziv: fetch.fetch_type.display_name,
            parameter: fetch.parameter,
            timestamp: moment(fetch.created_at).format("DD. MMM YYYY. HH:mm"),
            brojTekstova: fetch.fetch_details.length,
        })
    );

    const handleSubmit = () => {
        setLoading(true);
        console.log(monthAndYear);
        let month = monthAndYear.month() + 1;
        let year = monthAndYear.year();
        let url = `/admin/get-ga-monthly-data?month=${month}&year=${year}`;
        console.log(url);
        axiosClient
            .get(url)
            .then((res) => {
                console.log(res.data);
                setFetches(res.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    };

    const handleDetailClick = (e, params) => {
        console.log(params);
        router.push(`/admin/statistika/details?fetchId=${params.id}`);
    };

    return (
        <>
            <h1>Statistika</h1>

            <Paper sx={{ height: 800, width: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        label="Izaber mesec i godinu"
                        views={["month", "year"]}
                        value={monthAndYear}
                        onChange={(value) => setMonthAndYear(value)}
                    />
                </LocalizationProvider>
                <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sx={{ border: 0, mt: 4 }}
                    autoPageSize
                    loading={loading}
                    initialState={{
                        sorting: {
                            sortModel: [
                                {
                                    field: "id",
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
