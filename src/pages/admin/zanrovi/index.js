import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import { useRouter } from "next/router";
import { Button, Spinner, Table } from "react-bootstrap";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function ZanroviPage() {
    const [zanrovi, setZanrovi] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/admin/zanrovi")
            .then((res) => {
                console.log(res.data);
                setZanrovi(res.data);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const handleEditClick = (zanrid) => {
        router.push(`/admin/zanrovi/edit?zanrid=${zanrid}`);
    };

    return (
        <>
            <AdminHeader metaTitle="Žanrovi" />
            <div className="container">
                <h1>Žanrovi</h1>
                <Button
                    as={Link}
                    href="/admin/zanrovi/create"
                    variant="primary"
                >
                    <FontAwesomeIcon icon={faPlus} /> Dodaj žanr
                </Button>
                {!loading && (
                    <Table striped className="mt-3">
                        <thead>
                            <tr>
                                <th>Naziv zanra</th>
                                <th>Preview</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {zanrovi.map((zanr) => (
                                <tr key={zanr.zanrid}>
                                    <td>{zanr.naziv_zanra}</td>
                                    <td>
                                        {" "}
                                        <span
                                            className="zanr-button"
                                            style={{
                                                color: zanr.zanr_boja,
                                                borderColor: zanr.zanr_boja,
                                            }}
                                        >
                                            {zanr.naziv_zanra}
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            as={Link}
                                            href={`/admin/zanrovi/edit?zanrid=${zanr.zanrid}`}
                                            size="sm"
                                            variant="outline-primary"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                            />{" "}
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </>
    );
}
