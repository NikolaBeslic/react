import { useRouter } from "next/router";
import TekstCreateNew from "../../../components/admin/tekstovi/TekstCreateNew";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();
    const { tekstid } = router.query;
    return (
        <>
            <AdminHeader metaTitle="Dodaj HuPikon" />
            <TekstCreateNew
                tekstid={tekstid}
                addHuPkast={false}
                addHuPikon={true}
            />
        </>
    );
}
