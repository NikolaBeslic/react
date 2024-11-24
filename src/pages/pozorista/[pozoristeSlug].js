import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Breadcrumb from "../../components/common/Breadcrumb"
import HeadMeta from '../../components/elements/HeadMeta';
import HeaderOne from '../../components/header/HeaderOne';
import FooterOne from '../../components/footer/FooterOne';
import axiosClient from '../../utils/axios';
import Pozoriste from '../../components/pozorista/Pozoriste';
import { useStateContext } from '../../contexts/StateContext';
import { Spinner } from 'react-bootstrap';

export default function PozoristePage() {
    const router = useRouter();
    const { pozoristeSlug } = router.query;
    const { isLoading, showLoading, hideLoading } = useStateContext();
    const [pozoriste, setPozoriste] = useState([]);
    const [sidePosts, setSidePosts] = useState([]);
    const [premijere, setPremijere] = useState([]);

    useEffect(() => {
        showLoading();
        const fetchSinglePozoriste = async () => {
            axiosClient.get(`/pozoriste-single/${router.query.pozoristeSlug}`).then((res) => {
                console.log(res.data);
                setPozoriste(res.data);
                fetchSidePosts();
                fetchPremijere();
                hideLoading();
            }).catch(error => console.error(error));
        }
        if (pozoristeSlug) {
            fetchSinglePozoriste();
        }
    }, [pozoristeSlug]);

    const fetchSidePosts = () => {
        axiosClient.get(`/get-trending-posts`)
            .then((res) => {
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
            <HeadMeta metaTitle={pozoriste.naziv_pozorista} />
            <HeaderOne />
            <Breadcrumb bCat="Pozorista" aPage={pozoriste.naziv_pozorista} />
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
            {!isLoading && <Pozoriste data={pozoriste} sidePosts={sidePosts} premijere={premijere} />}

            <FooterOne />
        </>
    );

}