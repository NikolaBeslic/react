import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../../../utils";
import moment from "moment";

const MetaDataFestival = ({ metaData }) => {


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
    <div className="banner banner__default bg-grey-light-three">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="post-date perfect-square" style={{ height: "160px" }}>
              <Image src={metaData.festival_slika} alt={metaData.naziv_festivala} width={160} height={200} />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="post-title-wrapper">
              <div className="btn-group">
                {metaData.grad?.naziv_grada}
              </div>
              <h2 className="m-b-xs-0 m-t-xs-10 axil-title hover-line">
                {metaData.naziv_festivala}
              </h2>
              <div className="post-metas banner-post-metas m-t-xs-20">
                <ul className="list-inline">
                  <li>
                    <i className="fa-light fa-calendar-range"></i> {formatDateRange(metaData.datumod, metaData.datumdo)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaDataFestival;
