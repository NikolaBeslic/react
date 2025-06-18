import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";
import WidgetAd from "../widget/WidgetAd";
import WidgetInstagram from "../widget/WidgetInstagram";
import WidgetNewsletter from "../widget/WidgetNewsletter";
import WidgetPost from "../widget/WidgetPost";
import WidgetPremijere from "../widget/WidgetPremijere";
import WidgetSocialShare from "../widget/WidgetSocialShare";

const Sidebar = () => {
    const [sidePosts, setSidePosts] = useState([]);
    const [premijere, setPremijere] = useState([]);

    useEffect(() => {
        const fetchSidePosts = () => {
            axiosClient
                .get(`/get-trending-posts`)
                .then((res) => {
                    setSidePosts(res.data);
                })
                .catch((error) => console.error(error));
        };

        const fetchPremijere = () => {
            axiosClient
                .get(`/get-premijere`)
                .then((res) => {
                    setPremijere(res.data);
                })
                .catch((error) => console.error(error));
        };

        fetchSidePosts();
        fetchPremijere();
    }, []);

    return (
        <div className="post-sidebar">
            <WidgetAd />
            {/* <RelatedPosts relatedPosts={sidePosts} /> */}
            <WidgetPost posts={sidePosts} />
            <WidgetNewsletter />
            <WidgetPremijere premijere={premijere} />
            <WidgetInstagram />
        </div>
    );
};

export default Sidebar;
