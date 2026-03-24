import HeadMeta from "../../../../elements/HeadMeta";

const CategoryHeader = ({ categoryData }) => {
    return (
        <>
            <HeadMeta
                metaTitle={categoryData.seo_title}
                metaDescription={
                    categoryData.seo_description ||
                    "Čitaj tekstove o savremenom pozorištu – vesti, intervjue, recenzije, analize i druge priče sa domaće i regionalne scene."
                }
                metaUrl={categoryData.seo_url}
                metaImage={categoryData.seo_image || "/slike/hup-vizitke.jpg"}
            />
            {/* Banner Start here  */}
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">
                                    {categoryData.display_naziv_kategorije}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryHeader;
