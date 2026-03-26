import axiosClient from "../utils/axios";
import TeamOne from "../components/team/TeamOne";
import RedakcijaHeader from "../components/post/post-format/elements/meta/RedakcijaHeader";
import { withSSRHandler } from "../utils/withSSRHandler";

export default function RedakcijaPage({ autori }) {
    return (
        <>
            <div className="axil-our-team section-gap">
                <div className="container">
                    <p>
                        Redakciju portala „Hoću u pozorište“ čini mala družina
                        velikih zaljubljenika u scenu, reč i onu posebnu magiju
                        koja nastaje kada se svetla ugase, a priča krene.
                    </p>
                    <p>
                        Ne poznajemo granice osim onih geografskih, koje ionako
                        lako premostimo pa se susretnemo na mestu gde se spaja
                        radoznalost, ideja, mladost, energija i sve to uz šolju
                        ili kriglu razgovora.
                    </p>
                    <p>
                        Gledamo iskreno, pišemo otvoreno i preporučujemo od
                        srca. Ako smo vas makar jednom podstakli da odete u
                        pozorište — znamo da smo uspeli.
                    </p>
                    <div className="axil-team-grid-wrapper p-t-xs-10">
                        <div className="row">
                            {autori?.map((data, index) => (
                                <div className="col-lg-4" key={index}>
                                    <TeamOne data={data} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    const response = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/get-autori`,
    );

    const autori = response.data;

    return {
        props: {
            autori: autori,
        },
    };
});

RedakcijaPage.getLayoutProps = (pageProps) => ({
    header: <RedakcijaHeader />,
    noSidebar: true,
});
