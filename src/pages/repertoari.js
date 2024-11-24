import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import momentPlugin from "@fullcalendar/moment";
import listPlugin from "@fullcalendar/list";
import srLocale from "@fullcalendar/core/locales/sr";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";
// import repertoari from "../../public/data/repertoari.json"
import { useState, useEffect, useCallback, useMemo } from "react";
import Form from 'react-bootstrap/Form';
import axiosClient from "../utils/axios";


const RepertoariPage = () => {

    const [events, setEvents] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const headerToolbar = {
        center: "dayGridMonth,dayGridWeek"
    }
    const views = {
        timeGrid: {
            dayMaxEventRows: 6
        }
    }
    const handleGradoviChange = useCallback((e) => {

        const { id, checked } = e.target;
        const value = parseInt(id);
        setSelectedValues(prevSelectedValues => checked
            ? [...prevSelectedValues, value]
            : prevSelectedValues.filter(selectedValue => selectedValue !== value)
        );

        // filterEvents(newSelectedValues);
    })
    useEffect(() => {
        axiosClient.get(`/get-repertoari`)
            .then((res) => {
                console.log(res.data);
                setEvents(res.data);
            })
            .catch((err) => {
                // setLoading(false);
                console.error(err.message);
            });
    }, []);


    // const filterEvents = (selectedGradovi) => {
    //     //setEvents(repertoari);
    //     console.log(selectedGradovi);
    //     const filtered = events.filter(value => selectedGradovi.includes(value.pozoriste.gradid));
    //     setEvents(filtered)
    //     console.log(filtered);
    // }

    const filteredData = selectedValues.length === 0
        ? events
        : events.filter(item =>
            selectedValues.includes(item.pozoriste.gradid)
        );

    return <>
        <HeadMeta metaTitle="Repertoari" />
        <HeaderOne />
        <div className="axil-about-us section-gap-top p-b-xs-20">
            <div className="container">
                <h1>Repertoari</h1>
                <div className="row">
                    <Form name="gradovi">
                        <div key="default-gradovi" id="gradovi-checkboxgroup" className=" mb-3">
                            <Form.Check inline type="checkbox" id="1" label="Beograd" onChange={handleGradoviChange} />
                            <Form.Check inline type="checkbox" id="2" label="Novi Sad" onChange={handleGradoviChange} />
                            <Form.Check inline type="checkbox" id="3" label="Kragujevac" onChange={handleGradoviChange} />
                            <Form.Check inline type="checkbox" id="5" label="Subotica" onChange={handleGradoviChange} />
                        </div>
                    </Form>
                    <Form name="zanrovi" >
                        <Form.Check type="checkbox" id="z1" label="Komedije" />
                        <Form.Check type="checkbox" id="2z" label="Drame" />
                        <Form.Check type="checkbox" id="z3" label="Predstave za decu" />
                    </Form>
                </div>

                <div>
                    <h3>Selected Values:</h3>
                    <ul>
                        {selectedValues.map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>

                {filteredData && <FullCalendar plugins={[momentPlugin, dayGridPlugin, listPlugin]}
                    headerToolbar={headerToolbar}
                    initialView="dayGridMonth"
                    events={filteredData}
                    eventLimit={5}
                    eventTimeFormat="H:mm"
                    dayMaxEvents={true}
                    locale={srLocale}
                    initialDate="2020-03-01"
                />}
            </div>
        </div>
        <FooterOne />

    </>
}

export default RepertoariPage;