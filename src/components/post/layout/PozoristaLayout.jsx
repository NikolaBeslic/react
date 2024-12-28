import Image from "next/legacy/image";

const PozoristaLayout = ({ pozoriste }) => {
    return (
        <div className="pozorista-layout-wrapper col-lg-3 col-md-4 col-xs-6">
            <div className="pozorista-layout-logo">
                <a href={`/pozorista/${pozoriste.pozoriste_slug}`}>
                    {pozoriste.logo && (
                        <Image
                            src={pozoriste.logo}
                            alt={pozoriste.naziv_pozorista}
                            height={100}
                            width={120}
                            objectFit="contain"
                        />
                    )}
                </a>
            </div>
            <div className="pozorista-layout-info">
                <a href={`/pozorista/${pozoriste.pozoriste_slug}`}>
                    {pozoriste.naziv_pozorista}
                </a>
            </div>
        </div>
    );
};

export default PozoristaLayout;
