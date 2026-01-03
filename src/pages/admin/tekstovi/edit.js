import { useRouter } from "next/router";
import TekstCreateNew from "../../../components/admin/tekstovi/TekstCreateNew";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();
    const { tekstid, kategorijaid } = router.query;

    return (
        <>
            <AdminHeader metaTitle="Izmeni tekst" />
            <div className="container">
                <h1>Izmeni tekst</h1>
                <TekstCreateNew tekstid={tekstid} kategorijaid={kategorijaid} />
            </div>
        </>
    );
}
