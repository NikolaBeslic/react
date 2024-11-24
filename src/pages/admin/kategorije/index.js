import { useEffect, useState } from "react";
import AdminNav from "../../../components/admin/header/adminnav";
import AdminLayout from "../../../layouts/AdminLayout";
import axiosClient from "../../../utils/axios";

export default function TekstoviPage() {
    const [kategorije, setKategorije] = useState([]);

    useEffect(() => {
        axiosClient.get('/admin/kategorije').then((res) => {
            console.log(res.data);
            setKategorije(res.data);
        }).catch(error => console.error(error));

    }, []);


    return <>
        <AdminLayout>
            <AdminNav></AdminNav>
            {kategorije.map((kat) => <p key={kat.kategorijaid}>{kat.naziv_kategorije}
                {kat.subkategorije.length > 0 ? kat.subkategorije.map((sk) => <><br />&emsp;<span> {sk.naziv_kategorije} </span></>) : ''}
            </p>)}
        </AdminLayout>
    </>
}