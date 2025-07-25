import Image from "next/legacy/image";

const HuPkastIndexLayout = ({ hupkastData }) => {
    return (
        <div
            className="hupkast-naslovna-wrapper post-block__mid"
            key={hupkastData.tekstid}
        >
            <div className="hupkast-naslovna-photo">
                <a href={`hupkast/${hupkastData.slug}`}>
                    <Image
                        src={hupkastData.tekst_photo}
                        alt="hupkast"
                        width={180}
                        height={180}
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                        objectFit="cover"
                    />
                    <span className="video-play-btn video-play-big" />
                </a>
            </div>
            <div className="hupkast-naslovna-info">
                <div className="hupkast-naslovna-title">
                    <h3 className="axil-post-title hover-line hover-line">
                        <a href={`hupkast/${hupkastData.slug}`}>
                            {hupkastData.naslov}
                        </a>
                    </h3>
                </div>
                <div
                    className="hupkast-naslovna-desc"
                    dangerouslySetInnerHTML={{ __html: hupkastData.uvod }}
                ></div>
            </div>
        </div>
    );
};

export default HuPkastIndexLayout;
