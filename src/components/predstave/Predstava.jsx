import SectionTitle from "../elements/SectionTitle";
import PredstavaTitle from "../post/post-format/elements/meta/PredstavaTitle";
import WidgetAd from "../widget/WidgetAd";
import WidgetInstagram from "../widget/WidgetInstagram";
import WidgetNewsletter from "../widget/WidgetNewsletter";
import WidgetSocialShare from "../widget/WidgetSocialShare";
import PostLayoutTwo from "../post/layout/PostLayoutTwo";
import Izvodjenje from "./Izvodjenje";
import moment from "moment";
import { useState } from "react";
import PredstavaRecenzija from "./PredstavaRecenzija";
import WidgetPremijere from "../widget/WidgetPremijere";
import WidgetPost from "../widget/WidgetPost";

const Predstava = ({
    data,
    premijere,
    sidePosts,
    updateData,
    handleUpdateDodajNaListuZelja,
    handleUpdateListaOdgledanih,
}) => {
    const recenzije = data.tekstovi?.filter(
        (tekst) => tekst.kategorija.kategorijaid == 4
    );
    const povezaniTekstovi = data.tekstovi?.filter(
        (tekst) => tekst.kategorija.kategorijaid != 4
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

    return (
        <>
            <PredstavaTitle
                metaData={data}
                handleUpdatePostRating={updatePostRating}
                handleUpdateDodajNaListuZelja={handleUpdateDodajNaListuZelja}
                handleUpdateListaOdgledanih={handleUpdateListaOdgledanih}
            />
            <div className="post-single-wrapper p-t-xs-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <main className="site-main">
                                <div className="single-blog-wrapper">
                                    {!showAllComments && (
                                        <div className="grid-wrapper predstava-single-section-wrapper">
                                            <div className="row">
                                                <SectionTitle title="Opis predstave" />
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
                                    )}

                                    {recenzije?.length > 0 &&
                                        !showAllComments && (
                                            <>
                                                <div className="grid-wrapper predstava-single-section-wrapper">
                                                    <div className="row">
                                                        <SectionTitle title="Iz našeg ugla" />
                                                        {recenzije.map(
                                                            (tekst) => (
                                                                <div
                                                                    key={
                                                                        tekst.tekstid
                                                                    }
                                                                >
                                                                    <PredstavaRecenzija
                                                                        data={
                                                                            tekst
                                                                        }
                                                                        key={
                                                                            tekst.slug
                                                                        }
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    {!showAllComments && (
                                        <div className="grid-wrapper predstava-single-section-wrapper">
                                            <div className="row">
                                                <SectionTitle title="Uloge" />
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: data.uloge,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="grid-wrapper predstava-single-section-wrapper">
                                        <div className="row">
                                            <SectionTitle
                                                title={`Komentari (${data.komentari?.length})`}
                                            />
                                            {showAllComments
                                                ? data.komentari?.map(
                                                      (komentar) => (
                                                          <>
                                                              <div
                                                                  className="predstava-komentar-wrapper m-b-xs-20"
                                                                  key={
                                                                      komentar.komentarid
                                                                  }
                                                              >
                                                                  <div className="predstava-komentar-info">
                                                                      <strong>
                                                                          {
                                                                              komentar
                                                                                  .korisnik
                                                                                  .korisnicko_ime
                                                                          }
                                                                      </strong>{" "}
                                                                      |{" "}
                                                                      <span className="text-muted">
                                                                          {moment(
                                                                              komentar.created_at
                                                                          ).fromNow()}
                                                                      </span>
                                                                  </div>
                                                                  <div className="predstava-komentar-tekst">
                                                                      {
                                                                          komentar.tekst_komentara
                                                                      }
                                                                  </div>
                                                              </div>
                                                          </>
                                                      )
                                                  )
                                                : data.komentari
                                                      ?.slice(0, 3)
                                                      .map((komentar) => (
                                                          <>
                                                              <div
                                                                  className="predstava-komentar-wrapper m-b-xs-20"
                                                                  key={
                                                                      komentar.komentarid
                                                                  }
                                                              >
                                                                  <div className="predstava-komentar-info">
                                                                      <strong>
                                                                          {
                                                                              komentar
                                                                                  .korisnik
                                                                                  .korisnicko_ime
                                                                          }
                                                                      </strong>{" "}
                                                                      |{" "}
                                                                      <span className="text-muted">
                                                                          {moment(
                                                                              komentar.created_at
                                                                          ).fromNow()}
                                                                      </span>
                                                                  </div>
                                                                  <div className="predstava-komentar-tekst">
                                                                      {
                                                                          komentar.tekst_komentara
                                                                      }
                                                                  </div>
                                                              </div>
                                                          </>
                                                      ))}
                                            {data.komentari?.length > 3 && (
                                                <button
                                                    onClick={
                                                        toggleCommentsSection
                                                    }
                                                >
                                                    {showAllComments
                                                        ? "Nazad"
                                                        : "Prikazi sve komentare"}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid-wrapper predstava-single-section-wrapper">
                                        <div className="row">
                                            {!showAllComments && (
                                                <>
                                                    <SectionTitle title="Izvodjenja" />

                                                    {izvodjenja?.length > 0 ? (
                                                        izvodjenja
                                                            ?.slice(0, 9)
                                                            .map((item) => (
                                                                <Izvodjenje
                                                                    izvodjenjeData={
                                                                        item
                                                                    }
                                                                    showPredstava={
                                                                        false
                                                                    }
                                                                    showPozoriste={
                                                                        true
                                                                    }
                                                                    key={
                                                                        item.seigraid
                                                                    }
                                                                />
                                                            ))
                                                    ) : (
                                                        <p>
                                                            Predstava trenutno
                                                            nije na repertoaru.
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid-wrapper predstava-single-section-wrapper">
                                        <div className="row">
                                            {povezaniTekstovi?.length > 0 &&
                                                !showAllComments && (
                                                    <>
                                                        <SectionTitle title="Povezani tekstovi" />
                                                        {povezaniTekstovi.map(
                                                            (tekst) => (
                                                                <PostLayoutTwo
                                                                    data={tekst}
                                                                    postSizeMd={
                                                                        false
                                                                    }
                                                                    key={
                                                                        tekst.slug
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetAd />
                                <WidgetPost posts={sidePosts} />
                                <WidgetNewsletter />
                                <WidgetPremijere premijere={premijere} />
                                <WidgetSocialShare />
                                <WidgetInstagram />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Predstava;
