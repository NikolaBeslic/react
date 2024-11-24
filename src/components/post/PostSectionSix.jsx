import { slugify } from "../../utils";
import SectionTitle from "../elements/SectionTitle";
import PostLayoutFour from "./layout/PostLayoutFour";

const PostSectionSix = ({ postData }) => {

    const recenzijeNaslovna = postData.filter(post => post.kategorija.naziv_kategorije == "intervju");

    return (
        <div className="section-gap section-gap-top__with-text top-stories bg-grey-light-three">
            <div className="container">
                <SectionTitle title="Intervjui" btnText="Svi intervjui" btnUrl="/intervjui" />
                <div className="grid-wrapper">
                    <div className="row">
                        {recenzijeNaslovna.slice(0, 3).map((data) => (
                            <div className="col-lg-4 col-md-4" key={data.slug}>
                                <PostLayoutFour data={data} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PostSectionSix;