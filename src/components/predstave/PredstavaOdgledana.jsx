import Image from "next/legacy/image";
import Link from "next/link";
import { Stack } from "react-bootstrap";

const PredstavaOdgledana = ({ data }) => {
    const pClass = "";
    return (
        <Stack direction="horizontal" gap={3}>
            <div
                className={` p-2 media post-block post-block__small festival-index-wrapper ${pClass ?? "post-block__on-dark-bg m-b-xs-30"}`}
            >
                <Link
                    href={`/predstave/${data.predstava_slug}`}
                    className="align-self-center"
                >
                    <>
                        <Image
                            src={data.plakat || "/slike/vizitke-cover.jpg"}
                            alt={data.predstava_slug}
                            width={80}
                            height={120}
                            objectFit="cover"
                        />
                    </>
                </Link>

                <div className="media-body predstava-index-info">
                    <div className="post-cat-group">Nesto</div>
                    <h3 className="axil-post-title hover-line hover-line predstava-index-title">
                        <a href={`/predstave/${data.predstava_slug}`}>
                            {data.naziv_predstave}
                        </a>
                    </h3>
                    <div className="post-metas">
                        <ul className="list-inline">
                            {data.pozorista?.map((poz) => (
                                <li key={`odgpoz-${poz.pozoristeid}`}>
                                    <span>{poz.naziv_pozorista}</span>
                                </li>
                            ))}{" "}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="p-2 ms-auto">{data.ocena_korisnika?.ocena}</div>
            <div className="p-2">Komentar</div>
        </Stack>
    );
};
export default PredstavaOdgledana;
