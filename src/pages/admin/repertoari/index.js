import { useCallback, useEffect, useState, useRef } from "react";
import axiosClient from "../../../utils/axios";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";

export default function RepertoariPage() {
    const [pozorista, setPozorista] = useState([]);
    const [loading, setLoading] = useState(false);

    const gridRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-all-pozorista")
            .then((res) => {
                setPozorista(res.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    const columns = [
        { field: "naziv_pozorista", headerName: "Naziv pozorista", flex: 2 },
        {
            field: "add",
            headerName: "",
            width: 200,
            flex: 1,
            align: "center",
            cellRenderer: (params) => (
                <Button
                    as={Link}
                    href={`/admin/repertoari/${params.data.pozoriste_slug}/create`}
                    variant="outline-primary"
                    size="small"
                >
                    <FontAwesomeIcon icon={faPlus} /> Dodaj repertoar
                </Button>
            ),
        },
    ];
    const rows = new Array();

    pozorista.map((poz) =>
        rows.push({
            id: poz.pozoristeid,
            naziv_pozorista: poz.naziv_pozorista,
            pozoriste_slug: poz.pozoriste_slug,
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
            <AdminHeader metaTitle="Repertoari" />

            <h1>Repertoari</h1>
            <div className="container">
                <Button
                    as={Link}
                    href="/admin/repertoari/dodaj-gostovanje"
                    variant="primary"
                    className="mb-3 mt-3"
                    size="small"
                >
                    <FontAwesomeIcon icon={faCalendarPlus} /> Dodaj gostovanje
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
