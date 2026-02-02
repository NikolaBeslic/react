import { Button } from "react-bootstrap";
import { faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../utils/axios";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import Link from "next/link";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HuPikonPage() {
    const [allHupikon, setAllHupikon] = useState([]);
    const [loading, setLoading] = useState(false);
    const gridRef = useRef(null);

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

    /* data grid stuff */
    const dayInMonthComparator = (d1, d2) => {
        const a1 = d1 ? moment(d1, "DD.MM.YYYY") : null;
        const a2 = d2 ? moment(d2, "DD.MM.YYYY") : null;

        return a1 - a2;
    };

    function EditButton(params) {
        return (
            <Button
                as={Link}
                href={`/admin/hupikon/edit?tekstid=${params.params.data.id}`}
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
    allHupikon.map((hupikon) => {
        rows.push({
            id: hupikon.tekstid,
            naslov: hupikon.hupikon.sagovornik + " - " + hupikon.naslov,
            published_at: moment(hupikon.published_at).format("DD.MM.YYYY"),
        });
    });

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    return (
        <>
            <AdminHeader metaTitle="HuPikon" />
            <h1>HuPikon</h1>
            <div className="container">
                <Button
                    variant="primary"
                    as={Link}
                    href="/admin/hupikon/create"
                >
                    <FontAwesomeIcon icon={faPlus} /> Dodaj novi HuPikon
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
