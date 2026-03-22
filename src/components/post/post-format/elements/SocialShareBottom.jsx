const SocialShareBottom = ({ url, title }) => {
    return (
        <div className="post-shares m-t-xs-60">
            <div className="title">Podeli:</div>
            <ul className="social-share social-share__rectangular">
                <li>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                        className="btn btn-nofill"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        title="Podeli na Fejsu"
                        aria-label="Podeli na Fejsu"
                    >
                        <i className="fab fa-facebook-f" />
                    </a>
                </li>
                <li>
                    <a
                        href={`https://wa.me/?text=${title}%20${url}`}
                        className="btn btn-nofill"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        title="Pošalji preko Whatsapp-a"
                        aria-label="Pošalji preko Whatsapp-a"
                    >
                        <i className="fab fa-whatsapp" />
                    </a>
                </li>

                <li>
                    <a
                        href={`https://twitter.com/intent/tweet?url=${url}&text=${title}&via=`}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="btn btn-nofill"
                        title="Podeli na Tviteru (X)"
                        aria-label="Podeli na Tviteru (X)"
                    >
                        <i className="fa-brands fa-x-twitter" />
                    </a>
                </li>

                <li>
                    <a
                        href={`viber://forward?text=${url} `}
                        className="btn btn-nofill"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        title="Pošalji preko Viber-a"
                        aria-label="Pošalji preko Viber-a"
                    >
                        <i className="fab fa-viber" />
                    </a>
                </li>

                <li>
                    <a
                        href={`mailto:?subject=${title}&body=${url}`}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="btn btn-nofill"
                        title="Pošalji preko emaila"
                        aria-label="Pošalji preko emaila"
                    >
                        <i className="fa-regular fa-envelope"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SocialShareBottom;
