import axiosClient from "../../utils/axios";
import PozoristaLayout from "../../components/post/layout/PozoristaLayout";
import PozoristaHeader from "../../components/post/post-format/elements/meta/PozoristaHeader";

export default function PozoristaPage({ pozorista }) {
    return (
        <>
            <div className="random-posts section-gap">
                <div className="axil-content row">
                    {pozorista.map((pozoriste) => (
                        <PozoristaLayout
                            pozoriste={pozoriste}
                            key={pozoriste.pozoristeid}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const response = await axiosClient.get("/get-all-pozorista");
    const pozorista = response.data;
    console.log("Fetched pozorista data:", pozorista);

    return {
        props: {
            pozorista,
        },
    };
}

PozoristaPage.getLayoutProps = (pageProps) => ({
    header: <PozoristaHeader />,
});
