import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    const { tekstid } = router.query;
    return (
        <>
            <h1>Dodaj tagove</h1>
        </>
    );
}
