import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Breadcrumb from "../../../components/common/Breadcrumb"
import HeadMeta from '../../../components/elements/HeadMeta';
import HeaderOne from '../../../components/header/HeaderOne';
import FooterOne from '../../../components/footer/FooterOne';
import axiosClient from '../../../utils/axios';
import PredstavaAcc from '../../../components/predstave/PredstavaAcc';

export default function PredstavaAccPage() {
    const router = useRouter();

    const { predstavaSlug } = router.query;
    console.log(router.query);
    const [predstava, setPredstava] = useState([]);
    useEffect(() => {
        const fetchSinglePredstava = async () => {
            axiosClient.get(`/predstava-single/${predstavaSlug}`).then((res) => {
                console.log(res.data);
                setPredstava(res.data.data);
            }).catch(error => console.error(error));
        }
        if (predstavaSlug) {
            fetchSinglePredstava();
        }
    }, [predstavaSlug]);

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
            <PredstavaAcc data={predstava} />

            <FooterOne />
        </>
    );

}