import moment from "moment";
import Link from "next/link";
import { Card } from "react-bootstrap";

const PredstavaListaZelja = ({ data }) => {
    return (
        <Card
            key={`card-${data.predstavaid}`}
            className="predstave-listazelja-card"
        >
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
                    <i className="fa-solid fa-building-columns"></i>{" "}
                    {data.pozorista?.map((poz) => (
                        <span key={poz.pozoristeid}>{poz.naziv_pozorista}</span>
                    ))}{" "}
                    <br />
                    {data.naredno_igranje && (
                        <>
                            <i
                                className="fa-regular fa-calendar-days"
                                title="Sledece igranje"
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
                <Card.Link href="#">Prebaci u odgledane</Card.Link>
                <Card.Link href="#">Obrisi sa liste</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default PredstavaListaZelja;
