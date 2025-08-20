import { useCallback, useEffect, useState } from "react";
import { useStateContext } from "../../contexts/StateContext";
import axiosClient from "../../utils/axios";
import { Spinner } from "react-bootstrap";
import PredstaveLayout from "../../components/post/layout/PredstaveLayout";
import Select from "react-select";
import { useRouter } from "next/router";
import PredstaveHeader from "../../components/post/post-format/elements/meta/PredstaveHeader";
import { withSSRHandler } from "../../utils/withSSRHandler";

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

    const handleLoadMorePredstave = () => {
        setVisibleCount(visibleCount + 6);
    };

    const sortOptions = [
        { value: "naziv", label: "Nazivu" },
        { value: "premijera", label: "Datumu premijere" },
    ];

    useEffect(() => {
        showLoading();
        axiosClient
            .get("/get-predstave")
            .then((res) => {
                console.log(res.data);
                setPredstave(res.data);
                setFilteredPredstave(res.data);
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

    return (
        <>
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
                {isLoading && (
                    <Spinner
                        animation="border"
                        role="status"
                        className="hup-spinner"
                    />
                )}
                {visiblePredstave.map((pred) => (
                    <div className="col-lg-6" key={pred.predstavaid}>
                        <PredstaveLayout
                            data={pred}
                            pClass=""
                            key={`pred${pred.predstavaid}`}
                            showPozoriste={true}
                        />
                    </div>
                ))}
                {visibleCount < filteredPredstave?.length && (
                    <button
                        className="btn btn-primary btn-small btn-load-more d-block mx-auto mt-4"
                        onClick={handleLoadMorePredstave}
                    >
                        Učitaj još
                    </button>
                )}
            </div>
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    return {
        props: {
            // No initial data fetching here, as we fetch data in the component
            // This allows us to use client-side fetching with axiosClient
        },
    };
});

PredstavePage.getLayoutProps = (pageProps) => ({
    header: <PredstaveHeader />,
});
