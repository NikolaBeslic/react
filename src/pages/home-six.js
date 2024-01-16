import { useEffect, useState } from "react";
import HeaderOne from "../components/header/HeaderOne"
import HupHome from "../components/home/HupHome";
import axiosClient from "../utils/axios";
import HeadMeta from "../components/elements/HeadMeta";
import SliderOne from "../components/slider/SliderOne";

export default function HomeSix() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosClient.get('/get-posts').then((res) => {
            debugger;
            //console.log(res.data);
            setPosts(res.data.data);
        });
    }, []);

    return (
        <>
            <HeadMeta metaTitle="Home Two" />
            <HeaderOne />
            <HupHome posts={posts} />
        </>
    );
}