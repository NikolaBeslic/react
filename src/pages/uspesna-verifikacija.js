import Button from "react-bootstrap/Button";
import UspesnaVerifikacijaHeader from "../components/post/post-format/elements/meta/UspesnaVerifikacija";
import { useUser } from "../contexts/UserContext";

const UspesnaVerifikacijaPage = () => {
    const { setModalOpen } = useUser();

    return (
        <>
            <div className="axil-our-team section-gap">
                <div className="container">
                    <p>Vaš nalog je aktivan, sada možete da se ulogujete.</p>
                    <Button
                        variant="primary"
                        onClick={() => setModalOpen(true)}
                    >
                        Uloguj se
                    </Button>
                </div>
            </div>
        </>
    );
};

export default UspesnaVerifikacijaPage;

UspesnaVerifikacijaPage.getLayoutProps = (pageProps) => ({
    header: <UspesnaVerifikacijaHeader />,
});
