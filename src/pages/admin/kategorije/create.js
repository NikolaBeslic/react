import { useRouter } from "next/router";
import KategorijaCreate from "../../../components/admin/kategorije/KategorijaCreate";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();
    const { kategorijaid } = router.query;

    return (
        <>
            <AdminHeader metaTitle="Dodaj kategoriju" />
            <h1>Dodaj Kategoriju</h1>
            <KategorijaCreate kategorijaid={kategorijaid} />
        </>
    );
}
