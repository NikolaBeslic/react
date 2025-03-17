import Image from "next/legacy/image";

const HupikonIndexLayout = ({ data, index }) => {
    return (
        <div className="axil-img-container m-b-xs-15 m-b-sm-30">
            <a href={`/hupikon/${data.slug}`} className="d-block">
                <Image
                    src={data.tekst_photo}
                    alt={data.slug}
                    width={528}
                    height={index % 2 == 1 ? 782 : 586}
                />
                <div className="grad-overlay grad-overlay__transparent" />
            </a>
            <div className="media post-block grad-overlay position-absolute">
                <div className="media-body justify-content-end">
                    <div className="post-cat-group m-b-xs-10"></div>
                    <div className="axil-media-bottom hupikon-index-title">
                        <h3 className="axil-post-title hover-line m-b-xs-0">
                            <a
                                href={`/hupikon/${data.slug}`}
                                title={data.naslov}
                            >
                                {data.hupikon?.sagovornik}: {data.naslov}
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
            {/* End of .post-block */}
        </div>
    );
};

export default HupikonIndexLayout;
