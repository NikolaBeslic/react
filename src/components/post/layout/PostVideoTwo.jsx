import Image from "next/legacy/image";
import moment from 'moment';

const PostVideoTwo = ({ data, pClass, videoIcon }) => {
  return (
    <div className={`media post-block post-block__small ${pClass ?? "post-block__on-dark-bg m-b-xs-30"}`}>
      <a href={`/${data.kategorija.kategorija_slug}/${data.slug}`} className="align-self-center">

        <Image
          src={data.tekst_photo}
          alt={data.slug}
          width={100}
          height={100}
          objectFit="cover"
        />
        {videoIcon === true ? <span className="video-play-btn video-play-btn__small" /> : ""}

      </a>

      <div className="media-body">
        <div className="post-cat-group">
          <a
            href={`/category/${data.kategorija?.kategorija_slug}`}
            className={`post-cat ${data.cate_bg ?? "bg-color-blue-one"}`}
            legacyBehavior>
            {data.kategorija.naziv_kategorije}
          </a>
        </div>
        <h3 className="axil-post-title hover-line hover-line">
          <a href={`/${data.kategorija?.kategorija_slug}/${data.slug}`} title={data.naslov} legacyBehavior>
            {data.naslov}
          </a>
        </h3>
        <div className="post-metas">
          <ul className="list-inline">
            <li>
              {moment(data.created_at).fromNow()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostVideoTwo;
