import { useRouter } from "next/router";
import PozoristaCreate from "../../../components/admin/pozorista/PozoristaCreate";

export default function Page() {
    const router = useRouter();
    const { pozoristeid } = router.query;
    return (
        <>
            <h1>Dodaj Pozoriste</h1>
            <PozoristaCreate pozoristeid={pozoristeid} />
        </>
    );
}
