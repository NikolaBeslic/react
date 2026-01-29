import { useRouter } from "next/router";
import KategorijaCreateUpdate from "../../../components/admin/kategorije/KategorijaCreateUpdate";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();
    const { kategorijaid } = router.query;

    return (
        <>
            <AdminHeader metaTitle="Izmeni kategoriju" />
            <div className="container">
                <h1>Izmeni kategoriju</h1>
                <KategorijaCreateUpdate kategorijaid={kategorijaid} />
            </div>
        </>
    );
}
