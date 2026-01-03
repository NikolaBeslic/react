import { useRouter } from "next/router";
import AutoriCreateUpdate from "../../../components/admin/autori/AutoriCreateUpdate";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();
    const { autorid } = router.query;

    return (
        <>
            <AdminHeader metaTitle="Izmeni autora" />
            <h1>Izmeni autora</h1>
            <AutoriCreateUpdate autorid={autorid} />
        </>
    );
}
