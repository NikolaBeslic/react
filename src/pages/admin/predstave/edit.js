import { useRouter } from "next/router";
import PredstaveCreateUpdate from "../../../components/admin/predstave/PredstaveCreateUpdate";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();
    const { predstavaid } = router.query;
    return (
        <>
            <AdminHeader metaTitle="Izmeni predstavu" />
            <h1>Izmeni predstavu</h1>
            <PredstaveCreateUpdate predstavaid={predstavaid} />
        </>
    );
}
