import KategorijaCreateUpdate from "../../../components/admin/kategorije/KategorijaCreateUpdate";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    return (
        <>
            <AdminHeader metaTitle="Dodaj kategoriju" />
            <div className="container">
                <h1>Dodaj kategoriju</h1>
                <KategorijaCreateUpdate />
            </div>
        </>
    );
}
