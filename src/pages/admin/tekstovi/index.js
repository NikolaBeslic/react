import { useCallback, useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axios";
import { useRouter } from "next/router";
import moment from "moment";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import { toast } from "react-hot-toast";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faPenToSquare,
    faClone,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function TekstoviPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const gridRef = useRef(null);

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
                console.log(res.data);
                setPosts(res.data);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    function CopyButton(params) {
        return (
            <Button
                onClick={(e) => handleCopyButtonClick(e, params.params.data)}
                size="sm"
                variant="light"
            >
                <FontAwesomeIcon icon={faClone} />
            </Button>
        );
    }

    const columns = [
        {
            field: "naslov",
            headerName: "Naslov",
            flex: 3,
            wrapText: true,
            autoHeight: true,
        },
        { field: "kategorija", headerName: "Kategorija", flex: 1 },
        {
            field: "published_at",
            headerName: "Datum objave",
            flex: 1,
            comparator: dayInMonthComparator,
        },
        {
            field: "copy",
            headerName: "",
            width: 50,
            flex: 1,
            align: "center",
            cellRenderer: (params) => <CopyButton params={params} />,
        },
        {
            field: "edit",
            headerName: "",
            width: 100,
            flex: 1,
            align: "center",
            cellRenderer: (params) => (
                <Button
                    as={Link}
                    href={`/admin/tekstovi/edit?tekstid=${params.data.id}`}
                    size="sm"
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </Button>
            ),
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
        router.push(`/admin/tekstovi/edit?tekstid=${params.id}`);
    };

    const handleCreateClick = (kategorijaid) => {
        router.push(`/admin/tekstovi/create?kategorijaid=${kategorijaid}`);
    };

    const handleCopyButtonClick = (e, params) => {
        debugger;
        const post = posts.find((post) => post.tekstid == params.id);
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
