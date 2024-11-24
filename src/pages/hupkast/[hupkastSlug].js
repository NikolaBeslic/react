import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FooterOne from "../../components/footer/FooterOne";
import HeadMeta from "../../components/elements/HeadMeta";
import HeaderOne from "../../components/header/HeaderOne";
import { Breadcrumb } from "react-bootstrap";
import axiosClient from "../../utils/axios";
import PostFormatHupkast from "../../components/post/post-format/PostFormatHupkast";

export default function SingleHupkast() {
    const router = useRouter();

    const { hupkastSlug } = router.query;

    const [hupkast, setHupkast] = useState([]);
    useEffect(() => {
        const fetchSingleHupkast = async () => {
            axiosClient.get(`/hupkast-single/${router.query.hupkastSlug}`)
                .then((res) => {
                    console.log(res.data);
                    setHupkast(res.data);
                }).catch(error => console.error(error));
        }
        if (hupkastSlug) {
            fetchSingleHupkast();
        }
    }, [hupkastSlug]);

    return (
        <>
            <HeadMeta metaTitle={hupkast.naslov} />
            <HeaderOne />
            <Breadcrumb bCat="Festivali" aPage={hupkast.naslov} />
            <PostFormatHupkast postData={hupkast} />
            {/* Banner Start here  */}

            <FooterOne />
        </>
    );

}