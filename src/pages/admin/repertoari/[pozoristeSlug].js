import { useRouter } from "next/router";

const RepertoarPozoristaPage = () => {
    const router = useRouter();
    const { pozoristeSlug } = router.query;
};

export default RepertoarPozoristaPage;
