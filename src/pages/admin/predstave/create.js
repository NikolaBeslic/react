import PredstaveCreateUpdate from "../../../components/admin/predstave/PredstaveCreateUpdate";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    return (
        <>
            <AdminHeader metaTitle="Dodaj predstavu" />
            <div className="container">
                <h1>Dodaj predstavu</h1>
                <PredstaveCreateUpdate />
            </div>
        </>
    );
}
