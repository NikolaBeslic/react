import HeadMeta from "../../../../elements/HeadMeta";

const PozoristaHeader = () => {
    return (
        <>
            <HeadMeta metaTitle="Pozorišta" />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">
                                    Pozorišta
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PozoristaHeader;
