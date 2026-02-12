import SectionTitle from "../elements/SectionTitle";
import PostLayoutTwo from "../post/layout/PostLayoutTwo";
import Izvodjenje from "./Izvodjenje";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { useState } from "react";
import PredstavaRecenzija from "./PredstavaRecenzija";
import { useStateContext } from "../../contexts/StateContext";
import axiosClient from "../../utils/axios";
import { csrf, getCookieValue } from "../../utils";

const Predstava = ({ data, updateData }) => {
    const recenzije = data.tekstovi?.filter(
        (tekst) => tekst.kategorija.kategorijaid == 4,
    );
    const povezaniTekstovi = data.tekstovi?.filter(
        (tekst) => tekst.kategorija.kategorijaid != 4,
    );
    console.log(povezaniTekstovi);
    const izvodjenja = data.igranja;

    const [showFullDescription, setFullDescription] = useState(false);

    const showFullDescriptionHandler = () => {
        setFullDescription(!showFullDescription);
    };

    let description = "";
    if (data.opis) {
        description = showFullDescription
            ? data.opis
            : data.opis?.slice(0, 1000) + "...";
    }

    const [showAllComments, setShowAllComments] = useState(false);

    const toggleCommentsSection = () => {
        setShowAllComments(!showAllComments);
    };

    const updatePostRating = (updatedPredstava) => {
        updateData(updatedPredstava);
    };
    const { currentUser } = useStateContext();
    const [komentarFormData, setKomentarFormData] = useState({
        tekst_komentara: "",
        predstavaid: data.predstavaid,
        korisnikid: currentUser?.id,
    });
    const [errors, setErrors] = useState({});
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting comment:", komentarFormData);

        if (!currentUser) {
            alert("Ulogujte se da biste mogli da komentarišete predstavu.");
            return;
        }
        await csrf();
        axiosClient
            .post("/predstava/dodaj-komentar", komentarFormData, {
                withCredentials: true,
                headers: {
                    "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
                setErrors(
                    err.response.data.errors || {
                        general:
                            "An error occurred while submitting the comment.",
                    },
                );
            });
    };

    return (
        <>
            <main className="site-main">
                <div className="single-blog-wrapper">
                    {!showAllComments && (
                        <div
                            className="grid-wrapper predstava-single-section-wrapper"
                            key="predsingl000001"
                        >
                            <div className="row" key="predrow0001">
                                <SectionTitle
                                    title="Opis predstave"
                                    key="pred-opis-predstave"
                                />
                                {description?.length > 0 && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    ></div>
                                )}

                                {description?.length > 1000 && (
                                    <div className="m-t-xs-20">
                                        <button
                                            className="btn btn-primary btn-small"
                                            onClick={showFullDescriptionHandler}
                                        >
                                            Read{" "}
                                            {showFullDescription
                                                ? "Less"
                                                : "More"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {recenzije?.length > 0 && !showAllComments && (
                        <>
                            <div
                                className="grid-wrapper predstava-single-section-wrapper"
                                key="predsingl000002"
                            >
                                <div className="row" key="predrow0002">
                                    <SectionTitle
                                        title="Iz našeg ugla"
                                        key="pred-iz-naseg-ugla"
                                    />
                                    {recenzije.map((tekst) => (
                                        <div key={`recdiv-${tekst.tekstid}`}>
                                            <PredstavaRecenzija
                                                data={tekst}
                                                key={`rec-${tekst.tekstid}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    {!showAllComments && (
                        <div
                            className="grid-wrapper predstava-single-section-wrapper"
                            key="predsingl000003"
                        >
                            <div className="row" key="predrow0003">
                                <SectionTitle title="Uloge" key="pred-uloge" />
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.uloge,
                                    }}
                                ></div>
                            </div>
                        </div>
                    )}
                    <div
                        className="grid-wrapper predstava-single-section-wrapper"
                        key="predsingl000004"
                    >
                        <div className="row" key="predrow0004">
                            <SectionTitle
                                title={`Komentari (${data.komentari?.length})`}
                                key="pred-komentari"
                            />
                            {showAllComments
                                ? data.komentari?.map((komentar) => (
                                      <>
                                          <div
                                              className="predstava-komentar-wrapper m-b-xs-20"
                                              key={`allkom-${komentar.komentarid}`}
                                          >
                                              <div className="predstava-komentar-info">
                                                  <strong>
                                                      {
                                                          komentar.korisnik
                                                              .korisnicko_ime
                                                      }
                                                  </strong>{" "}
                                                  |{" "}
                                                  <span className="text-muted">
                                                      {moment(
                                                          komentar.created_at,
                                                      ).fromNow()}
                                                  </span>
                                              </div>
                                              <div className="predstava-komentar-tekst">
                                                  {komentar.tekst_komentara}
                                              </div>
                                          </div>
                                      </>
                                  ))
                                : data.komentari
                                      ?.slice(0, 3)
                                      .map((komentar) => (
                                          <>
                                              <div
                                                  className="predstava-komentar-wrapper m-b-xs-20"
                                                  key={komentar.komentarid}
                                              >
                                                  <div className="predstava-komentar-info">
                                                      <strong>
                                                          {
                                                              komentar.korisnik
                                                                  .korisnicko_ime
                                                          }
                                                      </strong>{" "}
                                                      |{" "}
                                                      <span className="text-muted">
                                                          {moment(
                                                              komentar.created_at,
                                                          ).fromNow()}
                                                      </span>
                                                  </div>
                                                  <div className="predstava-komentar-tekst">
                                                      {komentar.tekst_komentara}
                                                  </div>
                                              </div>
                                          </>
                                      ))}
                            {data.komentari?.length > 3 && (
                                <button onClick={toggleCommentsSection}>
                                    {showAllComments
                                        ? "Nazad"
                                        : "Prikazi sve komentare"}
                                </button>
                            )}
                            <div className="predstava-komentar-form-wrapper">
                                <h3>Dodaj komentar</h3>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        // Handle comment submission logic here
                                    }}
                                >
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Unesite svoj komentar"
                                        onChange={(e) =>
                                            setKomentarFormData({
                                                ...komentarFormData,
                                                tekst_komentara: e.target.value,
                                            })
                                        }
                                    />
                                    {errors && (
                                        <p className="text-danger">
                                            {errors.tekst_komentara}
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-small m-t-xs-20"
                                        onClick={handleCommentSubmit}
                                    >
                                        Pošalji komentar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div
                        className="grid-wrapper predstava-single-section-wrapper"
                        key="predsingl000005"
                    >
                        <div className="row" key="predrow0005">
                            {!showAllComments && (
                                <>
                                    <SectionTitle
                                        title="Izvodjenja"
                                        key="pred-izvodjenja"
                                    />

                                    {izvodjenja?.length > 0 ? (
                                        izvodjenja
                                            ?.slice(0, 9)
                                            .map((item) => (
                                                <Izvodjenje
                                                    izvodjenjeData={item}
                                                    showPredstava={false}
                                                    showPozoriste={true}
                                                    key={item.seigraid}
                                                />
                                            ))
                                    ) : (
                                        <p>
                                            Predstava trenutno nije na
                                            repertoaru.
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div
                        className="grid-wrapper predstava-single-section-wrapper"
                        key="predsingl000006"
                    >
                        <div className="row" key="predrow0006">
                            {povezaniTekstovi?.length > 0 &&
                                !showAllComments && (
                                    <>
                                        <SectionTitle
                                            title="Povezani tekstovi"
                                            key="pred-povezani-tekstovi"
                                        />
                                        {povezaniTekstovi.map((tekst) => (
                                            <PostLayoutTwo
                                                data={tekst}
                                                postSizeMd={false}
                                                key={`pt-${tekst.tekstid}`}
                                            />
                                        ))}
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Predstava;
