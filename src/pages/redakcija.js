import axiosClient from "../utils/axios";
import TeamOne from "../components/team/TeamOne";
import RedakcijaHeader from "../components/post/post-format/elements/meta/RedakcijaHeader";
import { withSSRHandler } from "../utils/withSSRHandler";

export default function RedakcijaPage({ autori }) {
    return (
        <>
            <div className="axil-our-team section-gap">
                <div className="container">
                    <p className="m-b-xs-30 big">
                        Redakciju portala Hoću (u) pozorište čine ljudi koji
                        vole pozorište i spremni su da volontiraju ne bi li
                        omogućili većem broju ljudi da čuje glas sa pozorišnih
                        dasaka. Naš tim pretežno čine studenti, i to raznih
                        oblasti (novinarstva, jezika, prava..), ali imamo i
                        starije kolege odavno svršene, a i mlađe koji će tek
                        krenuti akademskim putem. Geografski se nalazimo na
                        raznim stranama Srbije, u nekim trenucima i sveta, tako
                        da funkcionišemo pre svega online komunikacijom. Bez
                        obzira na to verujemo da bez drugarstva nema ni dobrog
                        rada, trudimo se da se sretnemo što češće, odemo u
                        pozorište ili na pivo.
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
    const response = await axiosClient.get("/get-autori");

    const autori = response.data;
    console.log("Fetched autor data:", autori);

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
