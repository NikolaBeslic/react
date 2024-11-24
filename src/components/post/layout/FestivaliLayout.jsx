import Image from "next/legacy/image";
import moment from 'moment';

const FestivaliLayout = ({ data, pClass, videoIcon }) => {
  const formatDateRange = (date1, date2) => {
    const d1 = moment(date1);
    const d2 = moment(date2);
    if (d1.isSame(d2, 'month') && d1.isSame(d2, 'year')) {
      return `${d1.format("DD")} - ${d2.format("DD")}. ${d1.format("MMMM YYYY")}`;
    } else {
      return `${d1.format("DD. MM")} - ${d2.format("DD. MM. YYYY")}`;
    }
  }

  return (
    <div className={`media post-block post-block__small festival-index-wrapper ${pClass ?? "post-block__on-dark-bg m-b-xs-30"}`}>
      <a href={`/festivali/${data.festival_slug}`} className="align-self-center">
        {data.festival_slika && (
          <>
            <Image
              src={data.festival_slika}
              alt={data.festival_slug}
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
          {data.grad.naziv_grada}
        </div>
        <h3 className="axil-post-title hover-line hover-line predstava-index-title">
          <a href={`/festivali/${data.festival_slug}`}>
            {data.naziv_festivala}
          </a>
        </h3>
        <div className="post-metas">
          <ul className="list-inline">
            <li>
              <i className="fa-light fa-calendar-range"></i> {formatDateRange(data.datumod, data.datumdo)}
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
};

export default FestivaliLayout;
