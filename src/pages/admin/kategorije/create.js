import { useRouter } from "next/router";
import KategorijaCreate from "../../../components/admin/kategorije/KategorijaCreate";

export default function Page() {
    const router = useRouter();
    const { kategorijaid } = router.query;

    return (
        <>
            <h1>Dodaj Kategoriju</h1>
            <KategorijaCreate kategorijaid={kategorijaid} />
        </>
    );
}