import PostLayoutTwo from "./layout/PostLayoutTwo";

const RelatedPosts = ({ relatedPosts }) => {
    return (
        <div className="instagram-widget m-b-xs-40">
            <div className="widget-title m-b-xs-50">
                <h3>Povezani tekstovi</h3>
            </div>
            <div className="axil-content">
                {relatedPosts?.slice(0, 4).map((data) => (
                    <PostLayoutTwo
                        data={data}
                        postSizeMd={false}
                        key={data.slug}
                    />
                ))}
            </div>
            {/* End of .content */}
        </div>
    );
};

export default RelatedPosts;
