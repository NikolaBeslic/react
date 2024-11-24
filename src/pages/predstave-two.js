import { useEffect, useState } from "react";
import axiosClient from "../utils/axios";
import PredstaveTwoSlider from "../components/slider/PredstaveTwoSlider";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";
import PredstaveSearch from "../components/predstave/PredstaveSearch";

export default function PredstaveTwoPage() {

    const [predstave, setPredstave] = useState([]);
    const [zanrovi, setZanrovi] = useState([]);
    const data = {};
    useEffect(() => {
        axiosClient.get('/get-predstave').then((res) => {
            console.log(res.data);
            setPredstave(res.data);
            data.predstave = predstave;
        }).catch(error => console.error(error));

    }, []);
    useEffect(() => {
        axiosClient.get('/get-zanrovi').then((res) => {
            console.log(res.data);
            setZanrovi(res.data);
            data.zanrovi = zanrovi
        })
    }, [])

    return (
        <>
            <HeadMeta metaTitle="Predstave" />
            <HeaderOne />
            <div className="axil-about-us section-gap-top p-b-xs-20">
                <div className="container">
                    <h1>Predstave</h1>
                    <div className="row">
                        <PredstaveTwoSlider slidePost={predstave} />
                        <PredstaveSearch predstave={predstave} zanrovi={zanrovi} />
                    </div>
                </div>
            </div>
            <FooterOne />
        </>
    );
}