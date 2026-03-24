import { useMediaQuery } from "react-responsive";
import HeadMeta from "../../../../elements/HeadMeta";

const PredstaveHeader = () => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    return (
        <>
            <HeadMeta
                metaTitle="Predstave"
                metaDescription="Pregled aktuelnih predstava u Srbiji – termini izvođenja, opisi, ocene publike i povezani tekstovi o predstavama."
                metaUrl="/predstave"
                metaImage="/slike/hup-vizitke.jpg"
                noIndex={true}
            />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">
                                    Predstave
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default PredstaveHeader;
