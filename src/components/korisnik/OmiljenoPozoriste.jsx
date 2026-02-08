import Link from "next/link";
import { Card } from "react-bootstrap";

const OmiljenoPozoriste = ({ data }) => {
    return (
        <Card
            key={`cardpoz-${data.pozoristeid}`}
            className="omiljeno-pozoriste-card"
        >
            <Link
                href={`/predstave/${data.pozoriste_slug}`}
                title={data.naziv_pozorista}
                key={`lnk-${data.pozoristeid}`}
            >
                <Card.Img
                    className="omiljeno-pozoriste-card-img"
                    variant="cover"
                    src={data.url_logo || "/slike/vizitke-cover.jpg"}
                    alt={data.naziv_pozorista}
                    key={`cimg-${data.pozoristeid}`}
                />
            </Link>
            <Card.Body
                key={`cb-${data.pozoristeid}`}
                className="omiljeno-pozoriste-card-body"
            >
                <Card.Title
                    key={`ct-${data.pozoristeid}`}
                    className="omiljeno-pozoriste-card-title"
                >
                    <h5>
                        <Link
                            href={`/predstave/${data.pozoriste_slug}`}
                            title={data.naziv_pozorista}
                            key={`cl-${data.pozoristeid}`}
                        >
                            {data.naziv_pozorista}
                        </Link>
                    </h5>
                </Card.Title>
                <Card.Text
                    key={`ctxt-${data.pozoristeid}`}
                    className="predstave-listazelja-card-text"
                >
                    <i className="fa-solid fa-location-dot"></i>{" "}
                    {data.grad?.naziv_grada}
                </Card.Text>
                <Card.Link href="#">Pogledaj repertoar</Card.Link>
                <Card.Link href="#">Ukloni</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default OmiljenoPozoriste;
