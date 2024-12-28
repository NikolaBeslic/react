import { useCallback, useEffect, useState } from "react";
import axiosClient from "../utils/axios";
import HeadMeta from "../components/elements/HeadMeta";
import HeaderOne from "../components/header/HeaderOne";
import FooterOne from "../components/footer/FooterOne";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Izvodjenje from "../components/predstave/Izvodjenje";
import Select from "react-select";
import PredstaveLayout from "../components/post/layout/PredstaveLayout";
import SectionTitle from "../components/elements/SectionTitle";

const RepertoariNewPage = () => {
    const [date, setDate] = useState([new Date(), new Date()]);
    const [datumOd, setDatumOd] = useState(new Date());
    const [datumDo, setDatumDo] = useState(new Date());
    const [dbEvents, setDbEvents] = useState([]);
    const [displayEvents, setDisplayEvents] = useState([]);

    const [dbGradovi, setDbGradovi] = useState([]);
    const [selectedGradovi, setSelectedGradovi] = useState([]);

    const [predstave, setPredstave] = useState([]);

    useEffect(() => {
        axiosClient
            .get(`/get-repertoari`)
            .then((res) => {
                console.log(res.data);
                setDbEvents(res.data);
                setDisplayEvents(res.data);
                setDate(new Date("2019-09-10"));
            })
            .catch((err) => {
                // setLoading(false);
                console.error(err.message);
            });
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
            .get("/get-predstave-with-texts")
            .then((res) => {
                console.log(res.data);
                setPredstave(res.data);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        // filterEventsByDate(datumOd, datumDo);
        const mDatumOd = new moment(datumOd);
        const mDatumDo = new moment(datumDo);
        console.log("mDates in filter metod");
        let filteredEvents = dbEvents;
        console.log(mDatumOd);
        console.log(mDatumDo);
        if (datumDo) {
            filteredEvents = dbEvents.filter(
                (dbe) =>
                    new moment(dbe.datum).isSameOrAfter(mDatumOd) &&
                    new moment(dbe.datum).isBefore(mDatumDo)
            );
        } else {
            filteredEvents = dbEvents.filter((dbe) =>
                new moment(dbe.datum).isSame(mDatumOd)
            );
        }
        console.log("After filter");

        console.log(filteredEvents);

        if (selectedGradovi.length > 0) {
            console.log("Filter by grad");
            console.log(selectedGradovi);
            // filteredEvents = displayEvents;
            filteredEvents = filteredEvents.filter(
                (igranje) =>
                    selectedGradovi.includes(igranje.pozoriste.grad.gradid)
                //igranje.pozoriste.grad.gradid.includes(selectedGradovi)
                //predstava.pozorista.some(poz => selectedGradovi.includes(poz.grad.gradid))
            );
        }
        setDisplayEvents(filteredEvents);
    }, [datumOd, datumDo, selectedGradovi]);

    const handleDateClick = (value) => {
        setDatumOd(value[0]);
        console.log(value);
        if (value.length > 1) setDatumDo(value[1]);

        setDate(value);
        // console.log(datumOd);
        // console.log(datumDo);
    };

    const getTodaysEvents = () => {
        // const today = new ("2019-09-14 00:00:00.000") // TO DO change to today
        const todayA = new Date("2019-09-14 00:00:00.000");
        const todayB = new Date("2019-09-14 23:59:59.000");
        //setDate(todatA);
        const dateArr = [todayA, todayB];
        setDate(dateArr);

        //setDatumOd(todatA);
        handleDateClick(dateArr);
    };

    const getWeekEvents = () => {
        const weekA = new Date("2019-09-14 00:00:00.000");
        const weekB = new Date("2019-09-21 23:59:59.000");

        const dateArr = [weekA, weekB];
        setDate(dateArr);
        handleDateClick(dateArr);
    };

    const getMonthEvents = () => {
        const monthA = new Date("2019-09-14 00:00:00.000");
        const monthB = new Date(monthA.getFullYear(), monthA.getMonth() + 1, 0);

        const dateArr = [monthA, monthB];
        setDate(dateArr);
        handleDateClick(dateArr);
    };

    const handleGradoviChange = useCallback((e) => {
        const sg = e.map((obj) => obj.value);
        setSelectedGradovi(sg);
    });

    return (
        <>
            <HeadMeta metaTitle="Repertoari v2" />
            <div className="axil-about-us section-gap-top p-b-xs-20">
                <div className="container">
                    <h1>Repertoari</h1>
                    <p>
                        {" "}
                        {datumOd?.toDateString()} - {datumDo?.toDateString()}
                    </p>
                    <div className="row">
                        <div className="col-lg-6">
                            <Calendar
                                selectRange={true}
                                returnValue="range"
                                onChange={handleDateClick}
                                allowPartialRange={true}
                                value={date}
                                locale="SR-sr"
                            />
                            <br /> <br />
                            <p>
                                <button onClick={getTodaysEvents}>Danas</button>
                            </p>
                            <p>
                                <button onClick={getWeekEvents}>
                                    Ove nedelje
                                </button>
                            </p>
                            <p>
                                <button onClick={getMonthEvents}>
                                    Ovog meseca
                                </button>
                            </p>
                            <div>
                                <Select
                                    instanceId="grd"
                                    name="gradovi"
                                    placeholder="Izaberi gradove"
                                    options={dbGradovi}
                                    isMulti={true}
                                    onChange={(e) => handleGradoviChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="repertoari-wrapper">
                                {displayEvents.map((e, index, arr) => {
                                    const prevEvent = arr[index - 1];
                                    let printDate = "";
                                    if (prevEvent?.datum != e.datum)
                                        printDate = e.datum;
                                    return (
                                        <>
                                            <p>{printDate}</p>
                                            <Izvodjenje
                                                izvodjenjeData={e}
                                                showPozoriste={true}
                                                showPredstava={true}
                                            />
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <SectionTitle title="Predstave o kojima smo pisali" />
                            {predstave.map((pred) => (
                                <PredstaveLayout
                                    data={pred}
                                    pClass=""
                                    showPozoriste={false}
                                    key={pred.predstavaid}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RepertoariNewPage;
