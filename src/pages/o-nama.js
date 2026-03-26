import Image from "next/image";
import AboutHeader from "../components/post/post-format/elements/meta/AboutHeader";

const AboutPage = () => {
    return (
        <>
            <div className="axil-our-team section-gap">
                <div className="container">
                    <p>
                        Sajt Hoću u pozori&scaron;te nastao nastao je kao
                        diplomski rad na Fakultetu organizacionih nauka, a sa
                        radom je počeo 27. marta 2017. godine, tačno na Svetski
                        dan pozori&scaron;ta.
                    </p>
                    <p>
                        Oko njega su se okupili mladi ljudi koje povezuje ista,
                        pomalo opsesivna ljubav prema pozori&scaron;tu, ona zbog
                        koje se repertoari znaju napamet i zbog koje se u jednom
                        mesecu pogleda i po desetine predstava. Ta ljubav se kod
                        nas ne zadržava u gledali&scaron;tu, već se pretače u
                        tekstove, intervjue i recenzije. Nemamo stalno
                        sedi&scaron;te. Na&scaron;a kuća je put između
                        poziri&scaron;nih scena ifestivala. Ponekad nas taj put
                        odvede i dalje, u region, gde rado zavirimo u njihive
                        pozori&scaron;ne svetove i priče.
                    </p>
                    <p>
                        Radimo volonterski, pa zato i pi&scaron;emo slobodno. Ne
                        kao strogi kritičari, ali ni samo kao posmatrači.
                        Pi&scaron;emo kao oni koji pozori&scaron;te ve&scaron;to
                        posmatraju, proživljavaju i cene, pa se nekad zanesemo i
                        nazovemo ga drugom kućom.
                    </p>

                    <p>
                        <Image
                            src="/slike/vizitke-cover.jpg"
                            alt="O nama"
                            layout="responsive"
                            width={700}
                            height={475}
                        />
                    </p>
                    <p>
                        Na na&scaron;em sajtu možete pratiti repertoare i
                        premijere, a registracijom dobijati obave&scaron;tenja o
                        predstavama koje volite. Kada ih odgledate, ostavite
                        ocenu i komentar, jer tako zajedno stvaramo prostor u
                        kome publika razgovara, razmenjuje utiske i pomaže jedni
                        drugima da izaberu sledeću predstavu.
                    </p>
                    <p>
                        A ako nam se putevi ukrste, u Beogradu ili nekom drugom
                        gradu, priđite. Razgovori o pozori&scaron;tu su nam
                        prirodno stanje. A ako osetite potrebu da pi&scaron;ete
                        i da pozori&scaron;te ne posmatrate samo kao publika,
                        po&scaron;aljite nam mejl i pridružite nam se. Mi smo
                        već na putu ka nekoj novoj predstavi.
                    </p>
                    <h2>Impressum</h2>
                    <p>
                        Internet portal Hoću u pozori&scaron;te
                        <br />
                        Upisan u registar medija Agencije za privredne registre
                        pod brojem: IN000744
                    </p>
                    <p>
                        Izdavač: Udruženje građana: Hoću u pozori&scaron;te
                        <br />
                        Zagorska 38/19, 11080 Beograd - Zemun
                        <br />
                        Matični broj: 28257112
                        <br />
                        PIB: 110778653
                    </p>
                    <p>
                        Glavni i odgovorni urednik: Nikola Be&scaron;lić
                        <br />
                        Redakcija:&nbsp;
                        <a href="https://hocupozoriste.rs/redakcija">
                            https://hocupozoriste.rs/redakcija
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default AboutPage;

AboutPage.getLayoutProps = (pageProps) => ({
    header: <AboutHeader />,
});
