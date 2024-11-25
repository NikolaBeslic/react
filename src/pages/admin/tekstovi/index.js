import { useEffect, useState } from "react";
import AdminNav from "../../../components/admin/header/AdminNav";
import AdminLayout from "../../../layouts/AdminLayout";
import axiosClient from "../../../utils/axios";
import DataTable, { Alignment } from 'react-data-table-component';
import { useRouter } from 'next/router';


export default function TekstoviPage() {
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axiosClient.get('/admin/tekstovi').then((res) => {
            console.log(res.data);
            setPosts(res.data.data);
        }).catch(error => console.error(error));

    }, []);

    const columns = [
        {
            name: 'Naslov',
            sortable: true,
            selector: row => row.naslov,
            width: '500px'
        },
        {
            name: 'Kategorija',
            selector: row => row.kategorija.naziv_kategorije
        },
        {
            name: 'Istaknuto',
            width: '100px',
            center: 'true',
            cell: ((row) => {
                if (row.na_slajderu > 0) {
                    return (<i className="fa-solid fa-check"></i>)
                }
            })
        },
        {
            name: 'Datum objave',
            selector: row => row.published_at
        },
        // {
        //     cell: (row) => <button onClick={() => handleIstakniClick(row)}>Istakni</button>,
        //     ignoreRowClick: true,
        //     width: '100px'
        //     //button: true,
        // },
        {
            cell: (row) => <button onClick={() => handleEditClick(row)}>Edit</button>,
            ignoreRowClick: true,
            width: '100px'
            //button: true,
        },
        {
            cell: (row) => <button onClick={() => handleEditClick(row)} className="btn-danger">Delete</button>,
            ignoreRowClick: true,
            width: '100px'
        }
    ]

    const handleEditClick = (row) => {
        console.log(row);
        router.push(`/admin/tekstovi/create?tekstid=${row.tekstid}`);
    }

    const handleCreateClick = () => {
        router.push('/admin/tekstovi/create')
    }

    const handleIstakniClick = (row) => {
        let updatedData = null;

        axiosClient.put(`/admin/tekstovi/istakni?tekstid=${row.tekstid}`)
            .then((res) => {
                updatedData = res.data;
                const updatedRows = posts.map(post =>
                    post.tekstid == row.tekstid ? { ...post, ...updatedData } : post
                );

                setPosts(updatedRows);
            })
            .catch((error) => console.error(error));


    }

    return <>
        <AdminLayout>
            <AdminNav></AdminNav>
            <p>Ovde dodje lista tekstova</p>
            <button onClick={handleCreateClick}>Dodaj tekst</button>
            <DataTable columns={columns} data={posts} pagination={15} />
        </AdminLayout>
    </>
}
