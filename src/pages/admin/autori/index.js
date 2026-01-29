import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import { useRouter } from "next/router";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import { Col, Row, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserPen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AutoriPage() {
    const [autori, setAutori] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axiosClient
            .get("/admin/get-all-autori")
            .then((res) => setAutori(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleEditClick = (autorid) => {
        console.log(autorid);
        router.push(`/admin/autori/edit?autorid=${autorid}`);
    };

    return (
        <>
            <AdminHeader metaTitle="Autori" />

            <div className="container">
                <Row>
                    <Col lg={8} md={6} sm={12}>
                        <h1>Autori na sajtu </h1>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <Button href="/admin/autori/create" variant="primary">
                            <FontAwesomeIcon icon={faUserPlus} /> Dodaj autora
                        </Button>
                    </Col>
                </Row>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Ime i prezime autora </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {autori.map((autor) => (
                            <tr key={autor.autorid}>
                                <td>{autor.ime_autora}</td>
                                <td>
                                    <Button
                                        as={Link}
                                        variant="outline-secondary"
                                        href={`/admin/autori/edit?autorid=${autor.autorid}`}
                                    >
                                        <FontAwesomeIcon icon={faUserPen} />{" "}
                                        Izmeni
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}
