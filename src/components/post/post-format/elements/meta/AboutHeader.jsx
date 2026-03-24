import HeadMeta from "../../../../elements/HeadMeta";

const AboutHeader = () => {
    return (
        <>
            <HeadMeta
                metaTitle="O nama"
                metaDescription="Saznajte više o portalu Hoću u pozorište – mediju posvećenom predstavama, pozorištima, festivalima i savremenom teatarskom životu u Srbiji."
                metaUrl="/o-nama"
                metaImage="/slike/hup-vizitke.jpg"
            />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">
                                    O nama
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AboutHeader;
