import { useRouter } from "next/router";
import TekstCreateNew from "../../../components/admin/tekstovi/TekstCreateNew";

export default function Page() {
    const router = useRouter();
    const { tekstid, kategorijaid } = router.query;
    return (
        <>
            <h1>{tekstid ? "Izmeni tekst" : "Dodaj tekst"}</h1>
            <TekstCreateNew tekstid={tekstid} kategorijaid={kategorijaid} />
        </>
    );
}
