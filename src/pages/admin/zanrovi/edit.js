import { useRouter } from "next/router";
import ZanrCreateUpdate from "../../../components/admin/zanrovi/ZanrCreateUpdate";

export default function Page() {
    const router = useRouter();
    const { zanrid } = router.query;
    return (
        <>
            <h1>Izmeni zanr </h1>
            <ZanrCreateUpdate zanrid={zanrid} />
        </>
    );
}
