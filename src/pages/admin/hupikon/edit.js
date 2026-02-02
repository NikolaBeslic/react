import { useRouter } from "next/router";
import TekstCreateNew from "../../../components/admin/tekstovi/TekstCreateNew";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();
    const { tekstid } = router.query;
    return (
        <>
            <AdminHeader metaTitle="Izmeni HuPikon" />
            <div className="container">
                <h1>Izmeni HuPikon</h1>
                <TekstCreateNew
                    tekstid={tekstid}
                    addHuPkast={false}
                    addHuPikon={true}
                />
            </div>
        </>
    );
}
