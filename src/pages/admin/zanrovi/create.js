import { useRouter } from "next/router";
import ZanrCreate from "../../../components/admin/zanrovi/ZanrCreate";

export default function Page() {
    const router = useRouter();
    const { zanrid } = router.query;
    return (
        <>
            <h1>Novi zanr </h1>
            <ZanrCreate zanrid={zanrid} />
        </>
    );
}