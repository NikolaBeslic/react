import { useCallback, useEffect, useState } from "react";
import { useStateContext } from "../../contexts/StateContext";
import HeadMeta from "../../components/elements/HeadMeta";
import axiosClient from "../../utils/axios";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Spinner } from "react-bootstrap";
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import PredstaveLayout from "../../components/post/layout/PredstaveLayout";
import Select from "react-select";
import WidgetPost from "../../components/widget/WidgetPost";
import WidgetPremijere from "../../components/widget/WidgetPremijere";
import { useRouter } from "next/router";

export default function PredstavePage() {
    const [predstave, setPredstave] = useState([]);
    const [dbGradovi, setDbGradovi] = useState([]);
    const [dbZanrovi, setDbZanrovi] = useState([]);
    const { isLoading, showLoading, hideLoading } = useStateContext();
    const router = useRouter();
    const { zanr } = router.query;
    const [isDbZanroviLoaded, setIsDbZanroviLoaded] = useState(false);
    const [filteredPredstave, setFilteredPredstave] = useState(predstave);
    const [selectedZanrovi, setSelectedZanrovi] = useState([]);
    const [selectedGradovi, setSelectedGradovi] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const [visibleCount, setVisibleCount] = useState(12);
    const visiblePredstave = filteredPredstave.slice(0, visibleCount);

    const [sidePosts, setSidePosts] = useState([]);
    const [premijere, setPremijere] = useState([]);

    const handleLoadMorePredstave = () => {
        setVisibleCount(visibleCount + 6);
    };

    const sortOptions = [
        { value: "naziv", label: "Nazivu" },
        { value: "premijera", label: "Datumu premijere" },
    ];

    useEffect(() => {
        debugger;
        showLoading();
        axiosClient
            .get("/get-predstave")
            .then((res) => {
                console.log(res.data);
                setPredstave(res.data);
                setFilteredPredstave(res.data);
                fetchSidePosts();
                fetchPremijere();
                hideLoading();
            })
            .catch((error) => console.error(error));
        axiosClient
            .get("/get-gradovi")
            .then((res) => {
                console.log(res.data);
                setDbGradovi(
                    res.data.map((grad) => ({
                        value: grad.gradid,
                        label: grad.naziv_grada,
                    }))
                );
            })
            .catch((error) => console.error(error));
        axiosClient
            .get("/get-zanrovi")
            .then((res) => {
                console.log(res.data);
                setDbZanrovi(
                    res.data.map((zanr) => ({
                        value: zanr.zanrid,
                        label: zanr.naziv_zanra,
                    }))
                );
                setIsDbZanroviLoaded(true);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        debugger;
        if (zanr) {
            console.log("Zanr " + zanr);
            const matched = dbZanrovi.find(
                (opt) => opt.label.toLowerCase() == zanr.toLowerCase()
            );
            if (matched) {
                setSelectedZanrovi([matched]);
            }
        }
    }, [zanr, isDbZanroviLoaded]);

    useEffect(() => {
        showLoading();
        debugger;
        let filteredPredstave = predstave;
        console.log("checking sel zanr after useEffect being triggred");
        console.log(selectedZanrovi);
        if (selectedZanrovi.length > 0) {
            console.log("FIlter by zanr..");
            const selectedZanroviValues = selectedZanrovi.map((sz) => sz.value);
            filteredPredstave = filteredPredstave.filter((predstava) =>
                predstava.zanrovi.some((z) =>
                    selectedZanroviValues.includes(z.zanrid)
                )
            );
        }

        if (selectedGradovi.length > 0) {
            console.log("Filter by grad");
            console.log(selectedGradovi);
            filteredPredstave = filteredPredstave.filter((predstava) =>
                predstava.pozorista.some((poz) =>
                    selectedGradovi.includes(poz.grad.gradid)
                )
            );
        }

        if (sortBy === "premijera") {
            filteredPredstave = [...filteredPredstave].sort(
                (a, b) => a.premijera - b.premijera
            );
        } else if (sortBy === "naziv") {
            console.log("sorting by naziv");
            filteredPredstave = [...filteredPredstave].sort((a, b) => {
                const nameA = a.naziv_predstave.toUpperCase();
                const nameB = b.naziv_predstave.toUpperCase();

                if (nameA < nameB) return -1;
                if (nameB > nameA) return 1;
                return 0;
            });
        }

        console.log("FP");
        console.log(filteredPredstave);
        setFilteredPredstave(filteredPredstave);
        hideLoading();
    }, [selectedZanrovi, selectedGradovi, sortBy]);

    const handleZanroviChange = useCallback((e) => {
        debugger;
        const sz = e.map((obj) => obj.value);
        setSelectedZanrovi(sz);
    });

    const handleGradoviChange = useCallback((e) => {
        const sg = e.map((obj) => obj.value);
        setSelectedGradovi(sg);
    });

    const handleSort = useCallback((e) => {
        setSortBy(e.value);
    });

    const fetchSidePosts = () => {
        axiosClient
            .get(`/get-trending-posts`)
            .then((res) => {
                setSidePosts(res.data);
            })
            .catch((error) => console.error(error));
    };

    const fetchPremijere = () => {
        axiosClient
            .get(`/get-premijere`)
            .then((res) => {
                setPremijere(res.data);
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <HeadMeta metaTitle="Predstave" />
            {/* <PredstaveSlider slidePost={predstave} /> */}
            <Breadcrumb aPage="Predstave" />
            {/* Banner Start here  */}
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">
                                    Predstave
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End here  */}
            <div className="random-posts section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {isLoading && (
                                <Spinner
                                    animation="border"
                                    role="status"
                                    className="hup-spinner"
                                />
                            )}
                            <div className="m-b-xs-20">
                                <Select
                                    instanceId="znr"
                                    name="zanrovi"
                                    placeholder="Izaberi zanrove"
                                    options={dbZanrovi}
                                    value={selectedZanrovi}
                                    isMulti={true}
                                    // onChange={(e) => handleZanroviChange(e)}
                                    onChange={setSelectedZanrovi}
                                />
                            </div>

                            <div className="m-b-xs-20">
                                <Select
                                    instanceId="grd"
                                    name="gradovi"
                                    placeholder="Izaberi gradove"
                                    options={dbGradovi}
                                    isMulti={true}
                                    onChange={(e) => handleGradoviChange(e)}
                                />
                            </div>

                            <div className="m-b-xs-20">
                                <Select
                                    instanceId="srt"
                                    name="sortBy"
                                    placeholder="Sortiraj po"
                                    options={sortOptions}
                                    onChange={(e) => handleSort(e)}
                                />
                            </div>

                            <div className="axil-content row">
                                {visiblePredstave.map((pred) => (
                                    <div
                                        className="col-lg-6"
                                        key={pred.predstavaid}
                                    >
                                        <PredstaveLayout
                                            data={pred}
                                            pClass=""
                                            key={`pred${pred.predstavaid}`}
                                            showPozoriste={true}
                                        />
                                    </div>
                                ))}
                                {visibleCount < filteredPredstave?.length && (
                                    <button onClick={handleLoadMorePredstave}>
                                        Load More
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetAd />
                                <WidgetPost posts={sidePosts} />
                                <WidgetSocialShare />
                                <WidgetPremijere premijere={premijere} />
                                {/* <WidgetCategory cateData={allPosts} />
                                <WidgetPost dataPost={allPosts} /> */}
                                <WidgetAd
                                    img="/images/clientbanner/clientbanner3.jpg"
                                    height={492}
                                    width={320}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
