import { useEffect, useState } from "react";
import PostSectionThree from "../components/post/PostSectionThree";
import { useParams } from "react-router-dom";
import axiosClient from "../utils/axios";

export default function IndexIntervjuView() {
    const { posts, setPosts } = useState();
    const { slug } = useParams();
    console.log(slug);
    useEffect(() => {

        axiosClient
            .get(`/get-trending-posts`)
            .then(({ data }) => {
                setPosts(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return <PostSectionThree posts={posts} />
}