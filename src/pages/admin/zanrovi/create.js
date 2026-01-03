import AdminHeader from "../../../components/admin/layout/AdminHeader";
import ZanrCreateUpdate from "../../../components/admin/zanrovi/ZanrCreateUpdate";

export default function Page() {
    return (
        <>
            <AdminHeader metaTitle="Dodaj žanr" />
            <h1>Novi zanr </h1>
            <ZanrCreateUpdate />
        </>
    );
}
