import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";
import HeadMeta from "../elements/HeadMeta";
import HeaderTwo from "../header/HeaderTwo";
import SliderOne from "../slider/SliderOne";
import HuPSlider from "../slider/HupSlider";
import PostSectionThree from "../post/PostSectionThree";
import PostSectionSeven from "../post/PostSectionSeven";
import PostSectionFive from "../post/PostSectionFive";
import PostSectionSix from "../post/PostSectionSix";
import FooterOne from "../footer/FooterOne";
import { getAllPosts } from "../../../lib/api";

const HupHome = ({ posts }) => {

    return (
        <>
            <HuPSlider slidePost={posts} />
            <PostSectionThree postData={posts} />
        </>
    )
}

export default HupHome;