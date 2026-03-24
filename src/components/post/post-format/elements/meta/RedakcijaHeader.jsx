import HeadMeta from "../../../../elements/HeadMeta";
import BreadcrumbBanner from "../../../../common/BreadcrumbBanner";

const RedakcijaHeader = () => {
    return (
        <>
            <HeadMeta
                metaTitle="Redakcija"
                metaDescription="Upoznajte redakciju portala Hoću u pozorište – autore, urednike i saradnike koji prate savremenu pozorišnu scenu."
                metaUrl="/redakcija"
                metaImage="/slike/hup-vizitke.jpg"
            />
            <BreadcrumbBanner pageTitle="Redakcija" />
        </>
    );
};

export default RedakcijaHeader;
