import Image from "next/legacy/image";
import Link from "next/link";

const TeamOne = ({ data }) => {
    return (
        <div className="axil-team-block m-b-xs-30">
            <a
                href={`/autori/${data.autor_slug}`}
                className="d-block img-container"
                legacybehavior
            >
                <Image
                    src={data.url_slike}
                    alt={data.autor_slug}
                    width={350}
                    height={350}
                    objectFit="cover"
                />
            </a>
            <div className="axil-team-inner-content text-center">
                <h3 className="axil-member-title hover-line">
                    <Link href={`/autori/${data.autor_slug}`} legacyBehavior>
                        {data.ime_autora}
                    </Link>
                </h3>
                <div className="axil-designation">{data.pozicija}</div>
            </div>
            {/* <div className="axil-team-share-wrapper">
                <ul className="social-share social-share__with-bg social-share__with-bg-white social-share__vertical">
                    {data.author_social.map((social) => (
                        <li key={social.url}>
                            <a href={social.url}><i className={social.icon} /></a>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default TeamOne;
