import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Breadcrumb from "../../components/common/Breadcrumb"
import HeadMeta from '../../components/elements/HeadMeta';
import HeaderOne from '../../components/header/HeaderOne';
import FooterOne from '../../components/footer/FooterOne';
import axiosClient from '../../utils/axios';
import Predstava from '../../components/predstave/Predstava';
import { useStateContext } from '../../contexts/StateContext';
import { Spinner } from 'react-bootstrap';

export default function PredstavaPage() {

    const router = useRouter();
    const { slug } = router.query;
    const [predstava, setPredstava] = useState([]);
    const [premijere, setPremijere] = useState([]);
    const [sidePosts, setSidePosts] = useState([]);
    const { isLoading, showLoading, hideLoading } = useStateContext();


    useEffect(() => {
        const fetchSinglePredstava = async () => {
            showLoading();
            axiosClient.get(`/predstava-single/${slug}`)
                .then((res) => {
                    console.log(res.data);
                    setPredstava(res.data.data);
                    hideLoading();
                }).catch(error => console.error(error));
            axiosClient.get(`/get-trending-posts`)
                .then((res) => {
                    setSidePosts(res.data)
                }).catch(error => console.error(error));
            axiosClient.get(`/get-premijere`)
                .then((res) => {
                    setPremijere(res.data)
                }).catch(error => console.error(error));

        }

        if (slug) {
            fetchSinglePredstava();
        }
    }, [slug]);

    return (
        <>
            <HeadMeta metaTitle={predstava.naziv_predstave} />
            <HeaderOne />
            <Breadcrumb bCat="Predstave" aPage={predstava.naziv_predstave} />
            {/* Banner Start here  */}
            {/* <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">{category.naziv_kategorije}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* Banner End here  */}
            {isLoading && <Spinner animation="border" role="status" className='hup-spinner' />}
            <Predstava data={predstava} premijere={premijere} sidePosts={sidePosts} />
            <FooterOne />
        </>
    );

}