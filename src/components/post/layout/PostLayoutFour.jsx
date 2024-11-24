// import Image from "next/image";
import Image from "next/legacy/image";
import moment from "moment";

const PostLayoutFour = ({ data }) => {
  return (
    <div className="content-block m-b-xs-30">
      <a href={`${data.kategorija?.kategorija_slug}/${data.slug}`}>

        <Image
          src={data.tekst_photo}
          alt={data.naslov}
          height={255}
          width={255}
          fill={true}
          className="img-fluid"
          objectFit="cover"
          layout="responsive"
        />
        <div className="grad-overlay" />

      </a>
      <div className="media-caption">
        <div className="caption-content">
          <h3 className="axil-post-title hover-line hover-line intervju-naslovna-title">
            <a href={`${data.kategorija?.kategorija_slug}/${data.slug}`} title={data.naslov}>
              {data.naslov}
            </a>
          </h3>

        </div>
        {/* End of .content-inner */}
      </div>
    </div >
  );
};

export default PostLayoutFour;
