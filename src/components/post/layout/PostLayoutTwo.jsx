import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../utils";
import { CategoryColor } from "../../../utils/enums";

const PostLayoutTwo = ({ data, postSizeMd, postBgDark }) => {
  return (
    <div className={`media post-block m-b-xs-30 ${postSizeMd === true ? "post-block__mid" : ""} ${postBgDark === true ? "post-block__on-dark-bg" : ""}`}>
      <Link href={`/post/${data.slug}`} className="align-self-center">

        <Image
          src={data.tekst_photo}
          alt={data.naslov}
          width={postSizeMd === true ? 285 : 150}
          height={postSizeMd === true ? 285 : 150}
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />

      </Link>
      <div className="media-body">
        <div className="post-cat-group m-b-xs-10">
          <Link
            href={`/category/${slugify(data.kategorija.kategorija_slug)}`}
            className={`post-cat cat-btn ${data.kategorija.naziv_kategorije}-tag-bg-color`}>
            {data.kategorija?.naziv_kategorije}
          </Link>
        </div>
        <h3 className="axil-post-title hover-line hover-line">
          <Link href={`/post/${data.slug}`}>
            {data.naslov}
          </Link>
        </h3>
        {postSizeMd === true ?
          <p className="mid">{data.uvod}</p>

          : ""
        }
        <div className="post-metas">
          <ul className="list-inline">
            <li>
              <span>By</span>
              <Link href={`/author/${data.slug}`} className="post-author">
                {data.created_at}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostLayoutTwo;
