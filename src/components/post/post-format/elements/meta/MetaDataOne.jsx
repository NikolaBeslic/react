import Image from "next/legacy/image";
import moment from 'moment';
import { Badge, Stack } from "react-bootstrap";

const MetaDataOne = ({ metaData }) => {
  console.log(metaData.predstave);
  return (
    <div className="banner banner__single-post banner__standard">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">


            {/* <div className="btn-group"><Link
                  href={`/${metaData.kategorija?.kategorija_slug}`}
                  className={`cat-btn ${metaData?.cate_bg ?? "bg-color-blue-one"}`}
                  legacyBehavior>
                  {metaData.kategorija?.naziv_kategorije || "Test"}
                </Link>
                </div> */}
            <div className="post-metas banner-post-metas m-t-xs-20">
              <ul className="list-inline">
                {metaData.autori?.map((autorData) =>
                  <li key={autorData.autor_slug}>
                    <a className="post-author post-author-with-img"
                      href={`/autori/${autorData.autor_slug}`}
                    >
                      <Image
                        src={autorData.url_slike}
                        alt={autorData.autor_slug}
                        width={30}
                        height={30}
                      />
                      <span className="author-name">{autorData.ime_autora}</span>

                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div className="post-title-wrapper">
              <h2 className="m-t-xs-20 m-b-xs-0 axil-post-title hover-line">{metaData.naslov}</h2>
              <div className="post-metas banner-post-metas m-t-xs-20 m-b-xs-20">
                <ul className="list-inline">
                  <li>
                    <i className="fa-regular fa-calendar-lines-pen"></i>{moment(metaData.created_at).format("DD. MMM YYYY.")}
                  </li>
                  {metaData.predstave && <Stack direction="horizontal" gap={2}>
                    {metaData.predstave?.map((pred) =>
                      <a href={`/predstave/${pred.predstava_slug}`} key={pred.predstavaid}>
                        <Badge pill bg="light" text="dark">
                          <i className="fa-solid fa-masks-theater"></i> {pred.naziv_predstave}
                        </Badge>
                      </a>
                    )}
                  </Stack>
                  }
                </ul>

              </div>
              {/* End of .post-metas */}
            </div>
            {/* End of .post-title-wrapper */}
          </div>
          {/* End of .col-lg-6 */}
          <div className="col-lg-6">
            <div className="post-main-thumbnail">
              <Image
                src={metaData.tekst_photo}
                alt={metaData.naslov}
                width={540}
                height={540}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        {/* End of .row */}
      </div>
      {/* End of .container */}
    </div >
  );
}

export default MetaDataOne;