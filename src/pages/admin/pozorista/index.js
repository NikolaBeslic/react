import { useCallback, useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import { Col, Row, Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";

export default function PozoristaPage() {
    const [loading, setLoading] = useState(false);
    const [pozorista, setPozorista] = useState([]);
    const gridRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-all-pozorista")
            .then((res) => setPozorista(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const columns = [
        { field: "naziv_pozorista", headerName: "Naziv pozorista", flex: 4 },
        {
            field: "edit",
            headerName: "",
            cellRenderer: (params) => {
                return (
                    <Button
                        as={Link}
                        href={`/admin/pozorista/edit?pozoristeid=${params.data.id}`}
                        size="sm"
                        variant="primary"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </Button>
                );
            },
        },
    ];
    const rows = new Array();

    pozorista.map((poz) =>
        rows.push({
            id: poz.pozoristeid,
            naziv_pozorista: poz.naziv_pozorista,
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
            <AdminHeader metaTitle="Pozorišta" />
            <div className="container">
                <Row>
                    <Col lg={8} md={6} sm={12}>
                        <h1>Pozorišta</h1>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <Button
                            as={Link}
                            href="/admin/pozorista/create"
                            variant="primary"
                        >
                            <FontAwesomeIcon icon={faPlus} /> Dodaj pozoriste
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
