import Image from 'next/image';
import Instagram from '../../data/social/Instagram.json';
import PostVideoTwo from './layout/PostVideoTwo';
import PostLayoutTwo from './layout/PostLayoutTwo';


const RelatedPosts = ({ relatedPosts }) => {
    return (
        <div className="instagram-widget m-b-xs-40">
            <div className="widget-title">
                <h3>Povezani tekstovi</h3>
            </div>
            <div className="axil-content">
                {relatedPosts?.slice(0, 4).map((data) => (
                    <PostLayoutTwo data={data} postSizeMd={false} key={data.slug} />
                ))}
            </div>
            {/* End of .content */}
        </div>
    );
}

export default RelatedPosts;