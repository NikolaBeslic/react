import FestivaliCreateUpdate from "../../../components/admin/festivali/FestivaliCreateUpdate";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    return (
        <>
            <AdminHeader metaTitle="Dodaj festival" />
            <h1>Dodaj festival</h1>
            <FestivaliCreateUpdate />
        </>
    );
}
