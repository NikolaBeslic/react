import SectionTitle from "../elements/SectionTitle";
import PostLayoutTwo from "./layout/PostLayoutTwo";

const PostSectionThree = ({ postData }) => {
    const najnovijiTekstovi = postData.najnoviji;

    return (
        <div className="section-gap section-gap-top__with-text trending-stories">
            <div className="container">
                <SectionTitle
                    title="Najnoviji tekstovi"
                    btnText="Svi tekstovi"
                />
                <div className="row">
                    {najnovijiTekstovi?.map((item) => (
                        <div className="col-lg-6" key={item.slug}>
                            <PostLayoutTwo data={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostSectionThree;
