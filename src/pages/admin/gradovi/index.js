import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import toast from "react-hot-toast";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import { Button, Table, Form, Row, Col } from "react-bootstrap";

export default function GradoviPage() {
    const [gradovi, setGradovi] = useState([]);
    const [errors, setErrors] = useState({});
    const [nazivGrada, setNazivGrada] = useState("");

    useEffect(() => {
        axiosClient
            .get("/admin/get-gradovi")
            .then((res) => setGradovi(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleGradSave = () => {
        axiosClient
            .post("/admin/store-grad", { naziv_grada: nazivGrada })
            .then((res) => {
                console.log(res.data);
                setGradovi(res.data);
                setNazivGrada("");
                setErrors({});
                toast.success("Uspesno dodat grad");
            })
            .catch((err) => {
                console.error(err);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <>
            <AdminHeader metaTitle="Gradovi" />
            <div className="container">
                <h1>Gradovi </h1>

                <Form.Group className="mb-3">
                    <Form.Label>Ime grada</Form.Label>
                    <Form.Control
                        type="text"
                        name="naziv_grada"
                        value={nazivGrada}
                        style={{ width: "300px" }}
                        onChange={(e) => setNazivGrada(e.target.value)}
                    />
                    {errors?.naziv_grada && (
                        <span className="text-danger">
                            {errors.naziv_grada}
                        </span>
                    )}
                </Form.Group>

                <Button onClick={handleGradSave} sx={{ mb: 5 }}>
                    Dodaj grad
                </Button>

                <Table striped className="mt-3">
                    <thead>
                        <tr>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {gradovi.map((grad) => (
                            <tr key={grad.gradid}>
                                <td>{grad.naziv_grada}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}
