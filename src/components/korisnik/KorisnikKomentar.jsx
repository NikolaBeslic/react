import moment from "moment";

const KorisnikKomentar = ({ data }) => {
    return (
        <div className="korisnik-komentar-wrapper">
            <div className="korisnik-komentar-header">
                <h6>{data.predstava?.naziv_predstave}</h6>{" "}
                <a
                    href={`/predstave/${data.predstava.predstava_slug}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
            <div className="korisnik-komentar-body">
                <p>{data.tekst_komentara}</p>
            </div>
            <div className="korisnik-komentar-footer post-metas text-muted">
                <p>{moment(data.created_at).format("DD.MMM yyyy.")}</p>
            </div>
        </div>
    );
};

export default KorisnikKomentar;
