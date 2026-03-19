import SocialLink from "../../data/social/SocialLink.json";

const ContactInfo = () => {
    return (
        <div className="axil-contact-info-wrapper p-l-md-45">
            <div className="axil-contact-info-inner">
                <div className="contact-social-share m-t-xs-30">
                    <div className="axil-social-title h5">
                        Naše društvene mreže
                    </div>
                    <ul className="social-share social-share__with-bg">
                        <li>
                            <a
                                href={SocialLink.fb.url}
                                title="Hoću u pozorište na Facebooku"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className={SocialLink.fb.icon} />
                            </a>
                        </li>
                        <li>
                            <a
                                href={SocialLink.instagram.url}
                                title="hocupozoriste na Instagramu"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className={SocialLink.instagram.icon} />
                            </a>
                        </li>
                        <li>
                            <a
                                href={SocialLink.yt.url}
                                title="YouTube kanal Hoću u pozorište"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className={SocialLink.yt.icon} />
                            </a>
                        </li>
                        <li>
                            <a
                                href={SocialLink.spotify.url}
                                title="HuPkast na Spotify-u"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className={SocialLink.spotify.icon} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
