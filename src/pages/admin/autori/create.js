import { useRouter } from "next/router";
import AutoriCreate from "../../../components/admin/autori/AutoriCreate";

export default function Page() {
    const router = useRouter();
    const { autorid } = router.query;
    return (
        <>
            <h1>Dodaj Autora</h1>
            <AutoriCreate autorid={autorid} />
        </>
    );
}
