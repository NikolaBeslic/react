import { useCallback, useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axios";
import { useRouter } from "next/router";
import moment from "moment";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import { toast } from "react-hot-toast";
import { Button, ButtonGroup, Col, Modal, Row, Spinner } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashCan,
    faPenToSquare,
    faClone,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { csrf, getCookieValue } from "../../../utils";

const ActionCellRenderer = (props) => {
    const { data, context } = props;

    function CopyButton(params) {
        return (
            <Button
                onClick={(e) => context.handleCopyButtonClick(params?.params)}
                size="sm"
                variant="outline-success"
            >
                <FontAwesomeIcon icon={faClone} /> Kopiraj link
            </Button>
        );
    }

    return (
        <div style={{ display: "flex", gap: "18px", justifyContent: "end" }}>
            <CopyButton params={data} />
            <Button
                as={Link}
                href={`/admin/tekstovi/edit?tekstid=${data.tekstid}`}
                size="sm"
                variant="outline-primary"
            >
                <FontAwesomeIcon icon={faPenToSquare} /> Izmeni
            </Button>
            <Button
                onClick={(e) => context.handleDeleteClick(data)}
                size="sm"
                variant="outline-danger"
            >
                <FontAwesomeIcon icon={faTrashCan} /> Obriši
            </Button>
        </div>
    );
};

export default function TekstoviPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const gridRef = useRef(null);

    const [rows, setRows] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const dayInMonthComparator = (d1, d2) => {
        const a1 = d1 ? moment(d1, "DD.MM.YYYY") : null;
        const a2 = d2 ? moment(d2, "DD.MM.YYYY") : null;

        return a1 - a2;
    };

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/tekstovi")
            .then((res) => {
                setPosts(res.data);
                setRows(res.data);
                setLoading(false);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const columns = [
        {
            field: "naslov",
            headerName: "Naslov",
            flex: 3,
            wrapText: true,
            autoHeight: true,
        },
        {
            field: "kategorija",
            headerName: "Kategorija",
            flex: 1,
            valueFormatter: (params) => {
                return params.value?.naziv_kategorije;
            },
        },
        {
            field: "published_at",
            headerName: "Datum objave",
            flex: 1,
            valueFormatter: (params) =>
                params.value ? moment(params.value).format("DD. MMM YYYY") : "",
            comparator: dayInMonthComparator,
        },
        {
            field: "actions",
            headerName: "",
            flex: 2,
            align: "right",
            cellRenderer: ActionCellRenderer,
            /* cellRenderer: (params) => <CopyButton params={params} />,*/
        },
    ];

    const onEditButtonClick = (e, params) => {
        router.push(`/admin/tekstovi/edit?tekstid=${params.id}`);
    };

    const handleCreateClick = (kategorijaid) => {
        router.push(`/admin/tekstovi/create?kategorijaid=${kategorijaid}`);
    };

    const handleCopyButtonClick = (params) => {
        const post = rows.find((row) => row.tekstid == params.tekstid);
        if (post && post.kategorija && post.slug) {
            const url = `${window.location.origin}/${post.kategorija.kategorija_slug}/${post.slug}`;
            navigator.clipboard
                .writeText(url)
                .then(() => {
                    toast.success("Link uspešno kopiran.");
                })
                .catch((err) => {
                    console.error("Could not copy text: ", err);
                    toast.error("Greška pri kopiranju linka.");
                });
        } else {
            toast.error("Greška pri kopiranju linka.");
        }
    };

    const handleCancel = () => {
        setOpenDialog(false);
        setSelectedRow(null);
    };

    /*const handleDeleteClick = useCallback(
        (data) => {
            setSelectedRow(rows.find((row) => row.id === data.id));
            setOpenDialog(true);
        },
        [rows],
    ); */

    const handleDeleteClick = (params) => {
        setSelectedRow(rows.find((row) => row.tekstid === params?.tekstid));
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        setDeleteLoading(true);
        try {
            await csrf();
            const res = await axiosClient.put(
                "/admin/delete-tekst",
                { tekstid: selectedRow.tekstid },
                {
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                    },
                },
            );
            if (res) {
                setRows((prev) =>
                    prev.filter((r) => r.tekstid !== selectedRow.tekstid),
                );
                toast.success("Uspesno obrisan tekst");
            }
        } catch (err) {
            console.error(err);
            toast.error("Greska prilikom brisanja teksta");
        } finally {
            setDeleteLoading(false);
            setOpenDialog(false);
            setSelectedRow(null);
        }
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
                        : post,
                );

                setPosts(updatedRows);
            })
            .catch((error) => console.error(error));
    };

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    return (
        <>
            <AdminHeader metaTitle="Tekstovi" />
            <div className="container">
                <Row>
                    <Col lg={8} md={6} sm={12}>
                        <h1>Tekstovi</h1>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <ButtonGroup className="mb-2">
                            <Button
                                variant="success"
                                onClick={() => handleCreateClick(1)}
                            >
                                Dodaj vest
                            </Button>
                            <Button
                                variant="warning"
                                onClick={() => handleCreateClick(2)}
                            >
                                Dodaj intervju
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleCreateClick(4)}
                            >
                                Dodaj recenziju
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>

                <div
                    style={{
                        width: "100%",
                        height: "700px",
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
                        context={{
                            handleCopyButtonClick,
                            handleDeleteClick,
                        }}
                        pagination={true}
                        paginationAutoPageSize={true}
                        loading={loading}
                    />
                </div>
                {/* Confirmation Dialog */}
                <Modal show={openDialog} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Potvrdi brisanje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {deleteLoading ? (
                            <Spinner animation="border" role="status" />
                        ) : (
                            <p>
                                Da li si siguran_a da želiš da obrišeš tekst:{" "}
                                <br />
                                {selectedRow?.naslov}
                            </p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            disabled={deleteLoading}
                            onClick={handleCancel}
                        >
                            Odustani
                        </Button>
                        <Button
                            variant="danger"
                            disabled={deleteLoading}
                            onClick={handleConfirmDelete}
                        >
                            DA
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
