import { useCallback, useEffect, useRef, useState } from "react";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import axiosClient from "../../../utils/axios";
import { Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";

export default function FestivaliPage() {
    const [festivali, setFestivali] = useState([]);
    const [loading, setLoading] = useState(false);
    const gridRef = useRef(null);

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

    const formatDateRange = (date1, date2) => {
        const d1 = moment(date1);
        const d2 = moment(date2);
        if (d1.isSame(d2, "month") && d1.isSame(d2, "year")) {
            return `${d1.format("DD")} - ${d2.format("DD")}. ${d1.format(
                "MMMM YYYY",
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
            cellRenderer: (params) => (
                <Button
                    as={Link}
                    href={`/admin/festivali/edit?festivalid=${params.data.id}`}
                    size="sm"
                    variant="primary"
                >
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </Button>
            ),
        },
    ];
    const rows = new Array();

    festivali.map((fest) =>
        rows.push({
            id: fest.festivalid,
            naziv_festivala: fest.naziv_festivala,
            naziv_grada: fest.grad.naziv_grada,
            datumi: formatDateRange(fest.datumod, fest.datumdo),
        }),
    );

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    return (
        <>
            <AdminHeader metaTitle="Festivali" />
            <div className="container">
                <Row>
                    <Col lg={8} md={6} sm={12}>
                        <h1>Festivali</h1>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <Button
                            as={Link}
                            href="/admin/festivali/create"
                            variant="primary"
                        >
                            <FontAwesomeIcon icon={faPlus} /> Dodaj festival
                        </Button>
                    </Col>
                </Row>
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
