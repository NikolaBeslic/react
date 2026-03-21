import SectionTitle from "../elements/SectionTitle";
import PostLayoutTwo from "../post/layout/PostLayoutTwo";
import Izvodjenje from "./Izvodjenje";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { useState } from "react";
import PredstavaRecenzija from "./PredstavaRecenzija";
import axiosClient from "../../utils/axios";
import { addParagraphIfNotExists, csrf, getCookieValue } from "../../utils";
import SectionSubtitle from "../elements/SectionSubtitle";
import { useUser } from "../../contexts/UserContext";
import { Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";

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
        description = addParagraphIfNotExists(data.opis);
        description = showFullDescription
            ? description
            : description?.slice(0, 1000) + "...";
    }

    const [showAllComments, setShowAllComments] = useState(false);

    const toggleCommentsSection = () => {
        setShowAllComments(!showAllComments);
    };

    const updatePostRating = (updatedPredstava) => {
        updateData(updatedPredstava);
    };
    const { user } = useUser();

    const [komentarFormData, setKomentarFormData] = useState({
        tekst_komentara: "",
        predstavaid: data.predstavaid,
        korisnikid: user?.id,
    });
    const [komentarLoading, setKomentarLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setKomentarLoading(true);
        console.log("Submitting comment:", komentarFormData);

        if (!user) {
            alert("Ulogujte se da biste mogli da komentarišete predstavu.");
            return;
        }

        try {
            await csrf();
            const res = await axiosClient.post(
                "/predstava/dodaj-komentar",
                komentarFormData,
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                        "Content-Type": "application/json",
                    },
                },
            );
        } catch (err) {
            console.error(err);
            setErrors(
                err.response.data.errors || {
                    general: "An error occurred while submitting the comment.",
                },
            );
        }
        setKomentarFormData({
            tekst_komentara: "",
            predstavaid: data.predstavaid,
            korisnikid: user?.id,
        });
        setKomentarLoading(false);
        toast.success("Uspešno dodat komentar. Biće vidljiv nakon odobrenja.");
    };

    return (
        <>
            <main className="site-main">
                <div className="single-blog-wrapper">
                    {!showAllComments && (
                        <div
                            id="opis"
                            className="grid-wrapper predstava-single-section-wrapper"
                            key="predsingl000001"
                        >
                            <div className="container">
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
                                                onClick={
                                                    showFullDescriptionHandler
                                                }
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
                        </div>
                    )}

                    {data.tekstovi?.length > 0 && !showAllComments && (
                        <>
                            <div
                                className="grid-wrapper section-gap-top__with-text predstava-single-section-wrapper bg-grey-light-three"
                                key="predsingl000002"
                                id="tekstovi"
                            >
                                {recenzije.length > 0 && (
                                    <div className="container">
                                        <div className="row" key="predrow0002">
                                            <SectionTitle
                                                title="Iz našeg ugla"
                                                key="pred-iz-naseg-ugla"
                                            />
                                            {recenzije.map((tekst) => (
                                                <div
                                                    className="predstava-recenzija-wrapper"
                                                    key={`recdiv-${tekst.tekstid}`}
                                                >
                                                    <PredstavaRecenzija
                                                        data={tekst}
                                                        key={`rec-${tekst.tekstid}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {!showAllComments &&
                                    povezaniTekstovi?.length > 0 && (
                                        <div className="container">
                                            <div
                                                className="row"
                                                key="predrow0006"
                                            >
                                                {povezaniTekstovi?.length > 0 &&
                                                    !showAllComments && (
                                                        <>
                                                            {recenzije.length >
                                                            0 ? (
                                                                <SectionSubtitle
                                                                    title="Povezani tekstovi"
                                                                    btnText="Svi tekstovi"
                                                                    key="pred-povezani-tekstovi"
                                                                />
                                                            ) : (
                                                                <SectionTitle
                                                                    title="Povezani tekstovi"
                                                                    key="pred-ipovezani-tekstovi2"
                                                                />
                                                            )}
                                                            {povezaniTekstovi.map(
                                                                (tekst) => (
                                                                    <div
                                                                        className="col-lg-6 predstava-povezani-tekst-single-wrapper"
                                                                        key={`pred-pt-
                                                                            ${tekst.tekstid}`}
                                                                    >
                                                                        <PostLayoutTwo
                                                                            data={
                                                                                tekst
                                                                            }
                                                                            postSizeMd={
                                                                                false
                                                                            }
                                                                            key={`pt-${tekst.tekstid}`}
                                                                        />
                                                                    </div>
                                                                ),
                                                            )}
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </>
                    )}

                    {!showAllComments && (
                        <div
                            className="grid-wrapper section-gap-top__with-text predstava-single-section-wrapper"
                            key="predsingl000003"
                            id="uloge"
                        >
                            <div className="container">
                                <div className="row" key="predrow0003">
                                    <SectionTitle
                                        title="Uloge"
                                        key="pred-uloge"
                                    />
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: addParagraphIfNotExists(
                                                data.uloge,
                                            ),
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div
                        className="grid-wrapper section-gap-top__with-text predstava-single-section-wrapper bg-grey-light-three"
                        key="predsingl000004"
                        id="komentari"
                    >
                        <div className="container">
                            <div className="row" key="predrow0004">
                                <SectionTitle
                                    title={`Komentari (${data.komentari?.length})`}
                                    key="pred-komentari"
                                />
                                {showAllComments
                                    ? data.komentari?.map((komentar) => (
                                          <>
                                              <div
                                                  className="predstava-komentar-wrapper m-b-xs-40"
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
                                                  <div
                                                      className="predstava-komentar-tekst"
                                                      dangerouslySetInnerHTML={{
                                                          __html: addParagraphIfNotExists(
                                                              komentar.tekst_komentara,
                                                          ),
                                                      }}
                                                  ></div>
                                              </div>
                                          </>
                                      ))
                                    : data.komentari
                                          ?.slice(0, 3)
                                          .map((komentar) => (
                                              <>
                                                  <div
                                                      className="predstava-komentar-wrapper m-b-xs-40"
                                                      key={komentar.komentarid}
                                                  >
                                                      <div className="predstava-komentar-info">
                                                          <strong>
                                                              {
                                                                  komentar
                                                                      .korisnik
                                                                      .korisnicko_ime
                                                              }
                                                          </strong>
                                                          <br />
                                                          <span className="text-muted">
                                                              {moment(
                                                                  komentar.created_at,
                                                              ).fromNow()}
                                                          </span>
                                                      </div>
                                                      <div
                                                          className="predstava-komentar-tekst"
                                                          dangerouslySetInnerHTML={{
                                                              __html: addParagraphIfNotExists(
                                                                  komentar.tekst_komentara,
                                                              ),
                                                          }}
                                                      ></div>
                                                  </div>
                                              </>
                                          ))}
                                {data.komentari?.length > 3 && (
                                    <button
                                        className="btn btn-primary btn-small btn-load-more d-block mx-auto my-4"
                                        onClick={toggleCommentsSection}
                                    >
                                        {showAllComments
                                            ? "Nazad"
                                            : "Prikazi sve komentare"}
                                    </button>
                                )}
                                <div className="predstava-komentar-form-wrapper">
                                    <h3>Dodaj komentar</h3>
                                    <Form>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Unesite vaš komentar"
                                            disabled={komentarLoading}
                                            value={
                                                komentarFormData.tekst_komentara
                                            }
                                            onChange={(e) =>
                                                setKomentarFormData({
                                                    ...komentarFormData,
                                                    tekst_komentara:
                                                        e.target.value,
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
                                            disabled={komentarLoading}
                                        >
                                            Pošalji komentar
                                            {komentarLoading && (
                                                <Spinner animation="border" />
                                            )}
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="grid-wrapper section-gap-top__with-text predstava-single-section-wrapper"
                        key="predsingl000005"
                        id="izvodjenja"
                    >
                        <div className="container">
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
                    </div>
                </div>
            </main>
        </>
    );
};

export default Predstava;
