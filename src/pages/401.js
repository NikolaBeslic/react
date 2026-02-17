import Link from "next/link";
import React from "react";
import { useUser } from "../contexts/UserContext";

const ErrorPage = () => {
    const { setModalOpen } = useUser();

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    return (
        <>
            <div className="error-404-banner bg-grey-light-three">
                <div className="container">
                    <div className="error-404-content text-center">
                        <div className="txt-404 tilt-this">401</div>
                        <div className="error-inner-content">
                            <h1 className="h1 m-b-xs-20 m-b-md-40">
                                Nemate prava da vidite traženu stranicu.
                            </h1>
                            <Link
                                href="#"
                                onClick={handleOpenModal}
                                className="btn btn-primary"
                            >
                                Ulogujte se ili napravite nalog
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
