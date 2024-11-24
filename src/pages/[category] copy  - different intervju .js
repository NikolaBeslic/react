import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import axiosClient from '../utils/axios';
import HeadMeta from '../components/elements/HeadMeta';
import HeaderOne from '../components/header/HeaderOne';
import { Breadcrumb, Spinner } from 'react-bootstrap';
import PostLayoutTwo from '../components/post/layout/PostLayoutTwo';
import WidgetAd from '../components/widget/WidgetAd';
import WidgetSocialShare from '../components/widget/WidgetSocialShare';
import FooterOne from '../components/footer/FooterOne';
import PostLayoutThree from '../components/post/layout/PostLayoutThree';
import PaginationComponent from '../components/elements/Pagination';
import { useStateContext } from '../contexts/StateContext';
import WidgetPost from '../components/widget/WidgetPost';
import WidgetPremijere from '../components/widget/WidgetPremijere';

export default function Page() {
    const router = useRouter();
    const kategorija_slug = router.query.category;

    const [category, setCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [intervjuiPosts, setIntervjuiPosts] = useState([]);
    const elementRef = useRef(null);
    const { isLoading, showLoading, hideLoading } = useStateContext();
    const [sidePosts, setSidePosts] = useState([]);
    const [premijere, setPremijere] = useState([]);

    useEffect(() => {
        fetchSidePosts();
        fetchPremijere();
        console.log("KATE");
        console.log(kategorija_slug);
        console.log(category.kategorija_slug);
        // debugger;
        if (kategorija_slug != category.kategorija_slug) {
            if (kategorija_slug == "intervjui") {
                fetchIntervjuiPosts(kategorija_slug, 1)

            } else {
                fetchCategoryPosts(kategorija_slug, 1)

            }
        } else {
            if (kategorija_slug == "intervjui") {
                fetchIntervjuiPosts(kategorija_slug, currentPage)
            } else {
                fetchCategoryPosts(kategorija_slug, currentPage)
            }
        }
        // if (kategorija_slug != category.kategorija_slug) {
        //     if (kategorija_slug == "intervjui" && currentPage) {
        //         fetchIntervjuiPosts(kategorija_slug, 1)
        //     } else if (kategorija_slug != "intervjui" || currentPage)
        //         fetchCategoryPosts(kategorija_slug, 1)

        // } else {
        //     if (kategorija_slug == "intervjui" && currentPage) {
        //         fetchIntervjuiPosts(kategorija_slug, currentPage)
        //     } else if (kategorija_slug != "intervjui" || currentPage)
        //         fetchCategoryPosts(kategorija_slug, currentPage)
        // }



    }, [kategorija_slug, currentPage]);

    const fetchCategoryPosts = async (kategorija_slug, page) => {
        showLoading();
        axiosClient.get(`/get-category-posts/${kategorija_slug}?page=${page}`)
            .then((res) => {
                console.log(res.data);
                setCategory(res.data.data);
                setCurrentPage(res.data.data.tekstovi?.current_page);
                setTotalPages(res.data.data.tekstovi?.last_page);
                console.log(currentPage + ' cp');
                console.log(totalPages + ' tp');
                hideLoading();
            }).catch(error => console.error(error));
    }

    const fetchIntervjuiPosts = async (kategorija_slug, page) => {
        showLoading();
        axiosClient.get(`/get-category-posts/${kategorija_slug}?page=${page}`)
            .then((res) => {
                console.log(res.data);
                setCategory(res.data.data);
                setIntervjuiPosts(prevIntervjuiPosts => [...prevIntervjuiPosts, ...res.data.data.tekstovi.data]);
                setCurrentPage(res.data.data.tekstovi?.current_page);
                setTotalPages(res.data.data.tekstovi?.last_page);
                console.log(currentPage + ' cp');
                console.log(totalPages + ' tp');
                hideLoading();
            }).catch(error => console.error(error));
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        elementRef.current.scrollIntoView({
            behavior: 'smooth', // 'smooth' for animated scrolling, 'auto' for immediate
            block: 'start' // Aligns the top of the element to the top of the viewport
        });
    };

    const fetchSidePosts = () => {
        axiosClient.get(`/get-trending-posts`)
            .then((res) => {
                console.log("SIDE POSTS: ");

                console.log(res.data);
                setSidePosts(res.data)
            }).catch(error => console.error(error));
    }

    const fetchPremijere = () => {
        axiosClient.get(`/get-premijere`)
            .then((res) => {
                setPremijere(res.data)
            }).catch(error => console.error(error));
    }



    return (
        <>
            <HeadMeta metaTitle={category.naziv_kategorije} />
            <HeaderOne />
            <Breadcrumb aPage={category.naziv_kategorije} />
            {/* Banner Start here  */}
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">{category.naziv_kategorije}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End here  */}
            <div className="random-posts section-gap">
                <div className="container">
                    {isLoading && <Spinner animation="border" role="status" className='hup-spinner' />}
                    {(category?.naziv_kategorije == "intervju")
                        ?
                        <>
                            <div className="row">
                                <div className="col-lg-8">
                                    {intervjuiPosts.slice(0, 1).map((tekst) => (
                                        <PostLayoutThree data={tekst} postSizeLg={true} key={tekst.slug} />
                                    ))}
                                </div>
                                <div className="col-lg-4">
                                    {intervjuiPosts.slice(1, 3).map((tekst) => (
                                        <PostLayoutThree data={tekst} key={tekst.slug} />
                                    ))}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="axil-content" ref={elementRef}>
                                        {intervjuiPosts?.slice(3,).map((data) => (
                                            <PostLayoutTwo data={data} postSizeMd={true} key={data.slug} />
                                        ))}
                                        {/* <PaginationComponent
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        /> */}
                                        <button onClick={() => setCurrentPage(currentPage + 1)}>Ucitaj jos</button>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="post-sidebar">
                                        <WidgetAd />
                                        <WidgetPost posts={sidePosts} />
                                        <WidgetSocialShare />
                                        {/* <WidgetCategory cateData={allPosts} /> */}
                                        <WidgetPremijere premijere={premijere} />
                                        <WidgetAd img="/images/clientbanner/clientbanner3.jpg" height={492} width={320} />

                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="axil-content" ref={elementRef}>
                                        {category.tekstovi?.data.map((data) => (
                                            <PostLayoutTwo data={data} postSizeMd={true} key={data.slug} />
                                        ))}
                                        <PaginationComponent
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="post-sidebar">
                                        <WidgetAd />
                                        <WidgetPost posts={sidePosts} />
                                        <WidgetSocialShare />
                                        {/* <WidgetCategory cateData={allPosts} /> */}
                                        <WidgetPremijere premijere={premijere} />
                                        <WidgetAd img="/images/clientbanner/clientbanner3.jpg" height={492} width={320} />
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <FooterOne />
        </>
    );

}