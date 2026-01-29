import { useRouter } from "next/router";
import PozoristaCreateUpdate from "../../../components/admin/pozorista/PozoristaCreateUpdate";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();
    const { pozoristeid } = router.query;
    return (
        <>
            <AdminHeader metaTitle="Dodaj pozorište" />
            <div className="container">
                <h1>Dodaj pozorište</h1>
                <PozoristaCreateUpdate pozoristeid={pozoristeid} />
            </div>
        </>
    );
}
