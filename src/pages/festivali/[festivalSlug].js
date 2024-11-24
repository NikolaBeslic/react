import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FooterOne from "../../components/footer/FooterOne";
import HeadMeta from "../../components/elements/HeadMeta";
import HeaderOne from "../../components/header/HeaderOne";
import { Breadcrumb } from "react-bootstrap";
import AdBanner from "../../components/common/AdBanner";
import axiosClient from "../../utils/axios";
import PostFormatFestival from "../../components/post/post-format/PostFormatFestival";

export default function FestivaliPage() {
    const router = useRouter();

    const { festivalSlug } = router.query;

    const [festival, setFestival] = useState([]);
    useEffect(() => {
        const fetchSingleFestival = async () => {
            axiosClient.get(`/festival-single/${router.query.festivalSlug}`)
                .then((res) => {
                    console.log(res.data);
                    setFestival(res.data);
                }).catch(error => console.error(error));
        }
        if (festivalSlug) {
            fetchSingleFestival();
        }
    }, [festivalSlug]);

    return (
        <>
            <HeadMeta metaTitle={festival.naziv_festivala} />
            <HeaderOne />
            <Breadcrumb bCat="Festivali" aPage={festival.naziv_festivala} />
            <PostFormatFestival postData={festival} />
            {/* Banner Start here  */}

            <FooterOne />
        </>
    );

}