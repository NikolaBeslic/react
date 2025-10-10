import { useRouter } from "next/router";
import TekstCreateNew from "../../../components/admin/tekstovi/TekstCreateNew";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();
    const { tekstid, kategorijaid } = router.query;
    const title = tekstid ? "Izmeni tekst" : "Dodaj tekst";

    return (
        <>
            <AdminHeader metaTitle={title} />
            <div className="container">
                <h1>{title}</h1>
                <TekstCreateNew tekstid={tekstid} kategorijaid={kategorijaid} />
            </div>
        </>
    );
}
