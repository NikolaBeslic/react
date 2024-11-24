import Image from "next/legacy/image";
import moment from 'moment';

const PredstaveLayout = ({ data, pClass, videoIcon, showPozoriste }) => {
  return (
    <div className={`media post-block post-block__small predstava-index-wrapper ${pClass ?? "post-block__on-dark-bg m-b-xs-30"}`}>
      <a href={`/predstave/${data.predstava_slug}`} className="align-self-center">
        {data.plakat && (
          <>
            <Image
              src={data.plakat}
              alt={data.predstava_slug}
              width={80}
              height={120}
              objectFit="cover"
            />
            {videoIcon === true ? <span className="video-play-btn video-play-btn__small" /> : ""}
          </>
        )}

      </a>

      <div className="media-body predstava-index-info">
        <div className="post-cat-group">
          {data.zanrovi?.map(zanr => (
            <a
              href={`/category/${zanr.naziv_zanra}`}
              className="post-cat zanr-button"
              style={{ color: zanr.zanr_boja, borderColor: zanr.zanr_boja }}
              legacyBehavior
              key={zanr.zanrid}>
              {zanr.naziv_zanra}
            </a>
          ))}
        </div>
        <h3 className="axil-post-title hover-line hover-line predstava-index-title">
          <a href={`/predstave/${data.predstava_slug}`} legacyBehavior>
            {data.naziv_predstave}
          </a>
        </h3>
        <div className="post-metas">
          <ul className="list-inline">
            {showPozoriste ? data.pozorista.map((poz) => <li key={poz.pozoristeid}>{poz.naziv_pozorista}</li>) :

              data.premijera && <li> <i className="fa-light fa-calendar-day"></i>Premijera: {moment(data.premijera).format("DD.MMM.YYYY.")}</li>}
          </ul>
        </div>
      </div>
    </div >
  );
};

export default PredstaveLayout;
