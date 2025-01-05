import SectionTitle from "../elements/SectionTitle";
import PostLayoutTwo from "./layout/PostLayoutTwo";

const PostSectionThree = ({ postData }) => {
    return (
        <div className="section-gap section-gap-top__with-text trending-stories">
            <div className="container">
                <SectionTitle
                    title="Najnoviji tekstovi"
                    btnText="Svi tekstovi"
                />
                <div className="row">
                    {postData.slice(0, 6).map((item) => (
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
