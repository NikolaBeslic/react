import { useCallback, useEffect, useRef, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../utils/axios";
import moment from "moment";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";

export default function PredstavePage() {
    const [predstave, setPredstave] = useState([]);
    const [loading, setLoading] = useState(false);
    const gridRef = useRef(null);

    const dayInMonthComparator = (d1, d2) => {
        const a1 = d1 ? moment(d1, "DD.MM.YYYY") : null;
        const a2 = d2 ? moment(d2, "DD.MM.YYYY") : null;

        return a1 - a2;
    };

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/get-all-predstave")
            .then((res) => {
                setPredstave(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const columns = [
        { field: "naziv_predstave", headerName: "Naziv predstave", flex: 2 },
        { field: "pozorista", headerName: "Pozorista", flex: 2 },
        {
            field: "premijera",
            headerName: "Premijera",
            flex: 1,
            sort: "desc",
            comparator: dayInMonthComparator,
        },
        {
            field: "edit",
            headerName: "",
            width: 200,
            flex: 1,
            align: "center",
            cellRenderer: (params) => (
                <Button
                    as={Link}
                    href={`/admin/predstave/edit?predstavaid=${params.data.id}`}
                    size="sm"
                    variant="primary"
                >
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </Button>
            ),
        },
    ];
    const rows = new Array();

    predstave.map((pred) =>
        rows.push({
            id: pred.predstavaid,
            naziv_predstave: pred.naziv_predstave,
            pozorista: pred.pozorista
                .map((poz) => poz.naziv_pozorista)
                .join(", "),
            premijera: pred.premijera
                ? moment(pred.premijera).format("DD.MM.YYYY")
                : "",
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
            <AdminHeader metaTitle="Predstave" />
            <div className="container">
                <Row>
                    <Col lg={8} md={6} sm={12}>
                        <h1>Predstave</h1>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <Button
                            as={Link}
                            href="/admin/predstave/create"
                            variant="primary"
                        >
                            <FontAwesomeIcon icon={faPlus} /> Dodaj predstavu
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
