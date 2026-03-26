import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";
import WidgetAd from "../widget/WidgetAd";
import WidgetInstagram from "../widget/WidgetInstagram";
import WidgetNewsletter from "../widget/WidgetNewsletter";
import WidgetPost from "../widget/WidgetPost";
import WidgetPremijere from "../widget/WidgetPremijere";
import WidgetToday from "../widget/WidgetToday";
import SidebarSkeleton from "./SidebarSkeleton";

const Sidebar = () => {
    const [sidePosts, setSidePosts] = useState([]);
    const [premijere, setPremijere] = useState([]);
    const [izvodjenja, setIzvodjenja] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);

            const results = await Promise.allSettled([
                axiosClient.get("/get-trending-posts"),
                axiosClient.get("/get-premijere"),
                axiosClient.get("/get-danas-na-repertoaru"),
            ]);

            if (!isMounted) return;

            if (results[0].status === "fulfilled") {
                setSidePosts(results[0].value.data);
            }

            if (results[1].status === "fulfilled") {
                setPremijere(results[1].value.data);
            }

            if (results[2].status === "fulfilled") {
                setIzvodjenja(results[2].value.data);
            }

            setLoading(false);
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="post-sidebar p-t-xs-60">
            {loading ? (
                <SidebarSkeleton />
            ) : (
                <>
                    <WidgetAd />
                    <WidgetToday izvodjenja={izvodjenja} />
                    {/* <RelatedPosts relatedPosts={sidePosts} /> */}
                    <WidgetPost posts={sidePosts} />
                    {/* <WidgetNewsletter />  */}
                    <WidgetPremijere premijere={premijere} />
                    {/* <WidgetInstagram /> */}
                </>
            )}
        </div>
    );
};

export default Sidebar;
