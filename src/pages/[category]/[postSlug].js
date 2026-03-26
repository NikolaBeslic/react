import PostFormatStandard from "../../components/post/post-format/PostFormatStandard";
import HeadMeta from "../../components/elements/HeadMeta";
import axiosClient from "../../utils/axios";
import { withSSRHandler } from "../../utils/withSSRHandler";
import PostFormatHupikon from "../../components/post/post-format/PostFormatHupikon";
import MetaDataOne from "../../components/post/post-format/elements/meta/MetaDataOne";

export default function Page({ post, relatedPosts }) {
    return (
        <>
            <HeadMeta
                metaTitle={post.seo_title}
                metaDescription={post.seo_description}
                metaUrl={post.seo_url}
                metaImage={post.seo_image}
            />

            {post.kategorijaid == 5 ? (
                <PostFormatHupikon
                    postData={post}
                    relatedPosts={relatedPosts}
                />
            ) : (
                <PostFormatStandard
                    postData={post}
                    relatedPosts={relatedPosts}
                />
            )}
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    const { category, postSlug } = context.params;
    const response = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/get-single-text/${category}/${postSlug}`,
    );

    const post = response.data;

    const releatedResponse = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/get-related-posts/${post.tekstid}`,
    );
    const relatedPosts = releatedResponse.data;

    return {
        props: {
            post,
            relatedPosts,
        },
    };
});

Page.getLayoutProps = (pageProps) => ({
    header: <MetaDataOne metaData={pageProps.post} />,
    noSidebar: true,
});
