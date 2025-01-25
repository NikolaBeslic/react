import Link from "next/link";

const ErrorPage = () => {
    return (
        <>
            <div className="error-404-banner bg-grey-light-three">
                <div className="container">
                    <div className="error-404-content text-center">
                        <div className="txt-404 tilt-this">404</div>
                        <div className="error-inner-content">
                            <h1 className="h1 m-b-xs-20 m-b-md-40">
                                Tražena strana ne postoji.
                            </h1>
                            <Link href="/" className="btn btn-primary">
                                Povratak na početnu
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
