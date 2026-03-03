import Link from "next/link";
import SectionTitle from "../elements/SectionTitle";
import Image from "next/legacy/image";

const HuPkastNaslovnaSection = ({ postData }) => {
    const hupkastiNaslovna = postData.filter((post) => post.kategorijaid == 11);
    console.log(hupkastiNaslovna);
    return (
        <div className="section-gap section-gap-top__with-text top-stories bg-grey-light-three">
            <div className="container">
                <SectionTitle
                    title="HuPkast"
                    btnText="Sve epizode"
                    btnUrl="/hupkast"
                />

                {hupkastiNaslovna.map((hupkastData) => (
                    <div
                        className="hupkast-naslovna-wrapper"
                        key={hupkastData.tekstid}
                    >
                        <div className="hupkast-naslovna-photo">
                            <Link href={`/hupkast/${hupkastData.slug}`}>
                                <Image
                                    src={hupkastData.tekst_photo}
                                    alt="hupkast"
                                    width={250}
                                    height={250}
                                    placeholder="blur"
                                    blurDataURL="/images/placeholder.png"
                                    objectFit="cover"
                                    layout="responsive"
                                />
                                <span className="video-play-btn video-play-big" />
                            </Link>
                        </div>
                        <div className="hupkast-naslovna-info">
                            <div className="hupkast-naslovna-title">
                                <h3>
                                    <Link href={`/hupkast/${hupkastData.slug}`}>
                                        {hupkastData.naslov}
                                    </Link>
                                </h3>
                            </div>
                            <div
                                className="hupkast-naslovna-desc mid"
                                dangerouslySetInnerHTML={{
                                    __html: hupkastData.uvod
                                        ? hupkastData.uvod
                                        : hupkastData.sadrzaj?.slice(0, 500),
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HuPkastNaslovnaSection;
