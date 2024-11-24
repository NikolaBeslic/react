import SectionTitle from "../elements/SectionTitle";
import Image from "next/legacy/image";

const HuPkastNaslovnaSection = ({ postData }) => {

    const hupkastiNaslovna = postData.filter(post => post.kategorijaid == 11);
    console.log(hupkastiNaslovna);
    return (
        <div className="section-gap section-gap-top__with-text top-stories bg-grey-light-three">
            <div className="container">
                <SectionTitle title="HuPkast" btnText="Sve epizode" btnUrl="/hupkast" />

                {hupkastiNaslovna.map((hupkastData) => (
                    <div className="hupkast-naslovna-wrapper" key={hupkastData.tekstid}>
                        <div className="hupkast-naslovna-photo">
                            <a href={`hupkast/${hupkastData.slug}`}>
                                <Image
                                    src={hupkastData.tekst_photo}
                                    alt="hupkast"
                                    width={180}
                                    height={180}
                                    placeholder="blur"
                                    blurDataURL="/images/placeholder.png"
                                    fill={true}
                                    objectFit="cover"
                                    layout="responsive"
                                />
                                <span className="video-play-btn video-play-big" />
                            </a>
                        </div>
                        <div className="hupkast-naslovna-info">
                            <div className="hupkast-naslovna-title">
                                <h3><a href={`hupkast/${hupkastData.slug}`}>{hupkastData.naslov}</a></h3>
                            </div>
                            <div className="hupkast-naslovna-desc">
                                {hupkastData.uvod}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default HuPkastNaslovnaSection;