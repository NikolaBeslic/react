import Image from "next/legacy/image";
import Link from "next/link";
import moment from 'moment';
import { CategoryColor } from "../../../utils/enums";

const PostLayoutTwo = ({ data, postSizeMd, postBgDark }) => {
  return (
    <div className={`media post-block m-b-xs-30 ${postSizeMd === true ? "post-block__mid" : ""} ${postBgDark === true ? "post-block__on-dark-bg" : ""}`}>
      <a href={`${data.kategorija?.kategorija_slug}/${data.slug}`} className="align-self-center">

        <Image
          src={data.tekst_photo}
          alt={data.naslov}
          width={postSizeMd === true ? 285 : 150}
          height={postSizeMd === true ? 285 : 150}
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />
      </a>
      <div className="media-body">
        <div className="post-cat-group m-b-xs-10">
          <a
            href={`/${data.kategorija?.kategorija_slug}`}
            className={`post-cat cat-btn ${data.kategorija?.naziv_kategorije}-tag-bg-color`}
            style={{ backgroundColor: data.kategorija.kategorija_boja }}
          >
            {data.kategorija?.naziv_kategorije}
          </a>
        </div>
        <h3 className="axil-post-title hover-line hover-line">
          <Link href={`/${data.kategorija?.kategorija_slug}/${data.slug}`} title={data.naslov}>
            {data.naslov}
          </Link>
        </h3>
        {postSizeMd === true ?
          <p className="mid" dangerouslySetInnerHTML={{ __html: (data.uvod) ? data.uvod : data.sadrzaj?.slice(0, 250) + "..." }}></p>

          : ""
        }
        <div className="post-metas">
          <ul className="list-inline">
            <li>
              <span><i className="fa-regular fa-clock"></i></span>
              <a href={`/author/${data.slug}`} className="post-author">
                {moment(data.created_at).fromNow()}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostLayoutTwo;
