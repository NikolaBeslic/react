import { useRouter } from "next/router";
import ZanrCreateUpdate from "../../../components/admin/zanrovi/ZanrCreateUpdate";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();
    const { zanrid } = router.query;

    return (
        <>
            <AdminHeader metaTitle="Izmeni žanr" />
            <div className="container">
                <h1>Izmeni žanr </h1>
                <ZanrCreateUpdate zanrid={zanrid} />
            </div>
        </>
    );
}
