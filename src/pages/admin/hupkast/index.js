import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import {
    faPlus,
    faPenToSquare,
    faSquareRss,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../../../utils/axios";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import toast from "react-hot-toast";
import { AgGridReact } from "ag-grid-react";

export default function HuPkastPage() {
    const [allHupkast, setAllHupkast] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const gridRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-all-hupkast")
            .then((res) => {
                console.log(res.data);
                setAllHupkast(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
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

    /* data grid stuff */
    const dayInMonthComparator = (d1, d2) => {
        const a1 = d1 ? moment(d1, "DD.MM.YYYY") : null;
        const a2 = d2 ? moment(d2, "DD.MM.YYYY") : null;

        return a1 - a2;
    };

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    function EditButton(params) {
        return (
            <Button
                as={Link}
                href={`/admin/hupkast/edit?tekstid=${params.params.data.id}`}
                variant="outline-primary"
                size="small"
            >
                <FontAwesomeIcon icon={faPenToSquare} /> Edit
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
            cellRenderer: (params) => <EditButton params={params} />,
        },
    ];

    const rows = new Array();
    allHupkast.map((hupkastSingle) => {
        rows.push({
            id: hupkastSingle.tekstid,
            naslov: hupkastSingle.naslov,
            published_at: moment(hupkastSingle.published_at).format(
                "DD.MM.YYYY",
            ),
        });
    });

    return (
        <>
            <AdminHeader metaTitle="HuPkast" />
            <div className="container">
                <h1>HuPkast</h1>
                <Button variant="primary" onClick={handleCheckRSSClick}>
                    <FontAwesomeIcon icon={faSquareRss} /> Check RSS
                </Button>

                <Button
                    variant="secondary"
                    color="inherit"
                    as={Link}
                    href="/admin/hupkast/create"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Dodaj novu epizodu
                </Button>

                <div
                    style={{
                        width: "100%",
                        height: "600px",
                        marginTop: "25px",
                        marginBottom: "30px",
                    }}
                >
                    <div className="example-header mb-3">
                        <input
                            type="text"
                            id="filter-text-box"
                            placeholder="Pretraga..."
                            onInput={onFilterTextBoxChanged}
                            className="form-control"
                            style={{ width: "300px" }}
                        />
                    </div>
                    <AgGridReact
                        ref={gridRef}
                        rowData={rows}
                        columnDefs={columns}
                        pagination={true}
                        paginationAutoPageSize={true}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    );
}
