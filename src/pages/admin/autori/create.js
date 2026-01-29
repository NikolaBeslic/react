import { useRouter } from "next/router";
import AutoriCreateUpdate from "../../../components/admin/autori/AutoriCreateUpdate";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

export default function Page() {
    const router = useRouter();

    return (
        <>
            <AdminHeader metaTitle="Dodaj autora" />
            <div className="container">
                <h1 className="text-center">Dodaj autora</h1>
                <AutoriCreateUpdate />
            </div>
        </>
    );
}
