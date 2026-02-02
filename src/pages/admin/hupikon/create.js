import TekstCreateNew from "../../../components/admin/tekstovi/TekstCreateNew";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    return (
        <>
            <AdminHeader metaTitle="Dodaj HuPikon" />
            <div className="container">
                <h1>Dodaj HuPikon</h1>
                <TekstCreateNew addHuPkast={false} addHuPikon={true} />
            </div>
        </>
    );
}
