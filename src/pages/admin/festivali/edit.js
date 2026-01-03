import { useRouter } from "next/router";
import FestivaliCreateUpdate from "../../../components/admin/festivali/FestivaliCreateUpdate";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();
    const { festivalid } = router.query;

    return (
        <>
            <AdminHeader metaTitle="Izmeni festival" />
            <h1>Izmeni festival</h1>
            <FestivaliCreateUpdate festivalid={festivalid} />
        </>
    );
}
