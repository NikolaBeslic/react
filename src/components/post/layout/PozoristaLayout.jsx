import Image from "next/legacy/image";
import Link from "next/link";

const PozoristaLayout = ({ pozoriste }) => {
    return (
        <div className="pozorista-layout-wrapper col-lg-3 col-md-4 col-xs-6">
            <div className="pozorista-layout-logo">
                <Link href={`/pozorista/${pozoriste.pozoriste_slug}`}>
                    {pozoriste.logo && (
                        <Image
                            src={pozoriste.logo}
                            alt={pozoriste.naziv_pozorista}
                            height={100}
                            width={120}
                            objectFit="contain"
                        />
                    )}
                </Link>
            </div>
            <div className="pozorista-layout-info">
                <Link href={`/pozorista/${pozoriste.pozoriste_slug}`}>
                    {pozoriste.naziv_pozorista}
                </Link>
            </div>
        </div>
    );
};

export default PozoristaLayout;
