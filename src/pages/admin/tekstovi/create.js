import AdminNav from "../../../components/admin/header/AdminNav";
import AdminLayout from "../../../layouts/AdminLayout";
import TekstCreate from "../../../components/admin/tekstovi/TekstCreate"
import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();
    const { tekstid } = router.query;
    return <>
        <AdminLayout>
            <AdminNav></AdminNav>
            <h1>Dodaj tekst + {tekstid}</h1>
            <TekstCreate tekstid={tekstid} />
        </AdminLayout>
    </>
}