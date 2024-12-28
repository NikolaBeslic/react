import { useRouter } from "next/router";
import PredstaveCreate from "../../../components/admin/PredstaveCreate/PredstaveCreate";

export default function Page() {
    const router = useRouter();
    const { predstavaid } = router.query;
    return (
        <>
            <h1>Dodaj predstave</h1>
            <PredstaveCreate predstavaid={predstavaid} />
        </>
    );
}
