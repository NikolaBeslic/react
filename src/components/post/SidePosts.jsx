import Image from 'next/image';
import Instagram from '../../data/social/Instagram.json';
import PostVideoTwo from './layout/PostVideoTwo';


const SidePosts = ({ sidePosts }) => {
    return (
        <div className="instagram-widget m-b-xs-40">
            <div className="widget-title">
                <h3>Povezani tekstovi</h3>
            </div>
            <div className="axil-content">
                {sidePosts?.map((data) => (
                    <PostVideoTwo data={data} pClass="" key={data.slug} />
                ))}
            </div>
            {/* End of .content */}
        </div>
    );
}

export default SidePosts;