import moment from "moment";
import Link from "next/link";
import { Card, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function PredstavaListaZelja({ data, onPrebaci, onRemove }) {
    const [loading, setLoading] = useState(false);

    const handlePrebaci = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await onPrebaci(data.predstavaid);
        } finally {
            setLoading(false);
        }
    };

    const handleOdgledano = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await onRemove(data.predstavaid);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            key={`card-${data.predstavaid}`}
            className="predstave-listazelja-card"
        >
            {loading && (
                <div className="card-loading-overlay">
                    <Spinner animation="border" />
                </div>
            )}
            <Link
                href={`/predstave/${data.predstava_slug}`}
                title={data.naziv_predstave}
                key={`lnk-${data.predstavaid}`}
            >
                <Card.Img
                    className="predstave-listazelja-card-img"
                    variant="cover"
                    src={data.plakat || "/slike/vizitke-cover.jpg"}
                    alt={data.naziv_predstave}
                    key={`cimg-${data.predstavaid}`}
                />
            </Link>
            <Card.Body
                key={`cb-${data.predstavaid}`}
                className="predstave-listazelja-card-body"
            >
                <Card.Title
                    key={`ct-${data.predstavaid}`}
                    className="predstave-listazelja-card-title"
                >
                    <h5>
                        <Link
                            href={`/predstave/${data.predstava_slug}`}
                            title={data.naziv_predstave}
                            key={`cl-${data.predstavaid}`}
                        >
                            {data.naziv_predstave}
                        </Link>
                    </h5>
                </Card.Title>
                <Card.Text
                    key={`ctxt-${data.predstavaid}`}
                    className="predstave-listazelja-card-text"
                >
                    {data.pozorista.length > 0 && (
                        <>
                            <i className="fa-solid fa-building-columns"></i>{" "}
                            {data.pozorista?.map((poz) => (
                                <span key={poz.pozoristeid}>
                                    {poz.naziv_pozorista}
                                </span>
                            ))}
                        </>
                    )}
                    <br />
                    {data.naredno_igranje && (
                        <>
                            <i
                                className="fa-regular fa-calendar-days"
                                title="Naredno igranje"
                            ></i>{" "}
                            {moment(data.naredno_igranje.datum).format(
                                "DD.MMM yyyy.",
                            )}{" "}
                            u{" "}
                            {moment(
                                `2020-01-01 ${data.naredno_igranje.vreme}`,
                            ).format("HH:mm")}
                        </>
                    )}
                </Card.Text>

                <div className="d-flex justify-content-between p-b-xs-10">
                    <Card.Link
                        onClick={() => handlePrebaci()}
                        className="text-primary"
                        variant="outline"
                    >
                        <FontAwesomeIcon icon={faListCheck} />
                        Odgledano
                    </Card.Link>
                    <Card.Link
                        onClick={() => handleOdgledano()}
                        className="text-danger"
                    >
                        <i className="fa-solid fa-delete-left"></i> Ukloni
                    </Card.Link>
                </div>
            </Card.Body>
        </Card>
    );
}

export default PredstavaListaZelja;
