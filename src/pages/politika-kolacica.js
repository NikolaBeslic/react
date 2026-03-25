import StaticPageHeader from "../components/post/post-format/elements/meta/StaticPageHeader";

const PolitikaKolacicaPage = () => {
    return (
        <>
            <div className="axil-our-team section-gap">
                <div className="container">
                    <p>
                        Sajt <strong>Hoću u pozori&scaron;te</strong> koristi
                        kolačiće (cookies) kako bi omogućio pravilno
                        funkcionisanje sajta, unapredio korisničko iskustvo i
                        analizirao posećenost.
                    </p>
                    <h3>1. &Scaron;ta su kolačići</h3>
                    <p>
                        Kolačići su male tekstualne datoteke koje internet
                        pregledač čuva na uređaju korisnika prilikom posete
                        sajtu.
                    </p>
                    <p>
                        Oni omogućavaju sajtu da prepozna korisnika prilikom
                        narednih poseta i sačuva određena pode&scaron;avanja.
                    </p>
                    <h3>2. Koje vrste kolačića koristimo</h3>
                    <h3>Neophodni kolačići</h3>
                    <p>
                        Ovi kolačići su potrebni za osnovno funkcionisanje sajta
                        i ne mogu biti isključeni.
                    </p>
                    <p>Koriste se za:</p>
                    <ul>
                        <li>
                            <p>održavanje korisničke sesije</p>
                        </li>
                        <li>
                            <p>prijavu i autentifikaciju korisnika</p>
                        </li>
                        <li>
                            <p>bezbednost sajta</p>
                        </li>
                    </ul>
                    <h3>Funkcionalni kolačići</h3>
                    <p>
                        Koriste se za pamćenje korisničkih izbora i
                        pode&scaron;avanja radi boljeg korisničkog iskustva.
                    </p>
                    <h3>Analitički kolačići</h3>
                    <p>
                        Koriste se za prikupljanje anonimnih podataka o
                        posećenosti sajta, najposećenijim stranicama i načinu
                        kori&scaron;ćenja sadržaja, radi unapređenja rada sajta.
                    </p>
                    <p>
                        Sajt koristi analitičke servise kompanije&nbsp;
                        <span className="whitespace-normal">Google</span> radi
                        statistike posećenosti.
                    </p>
                    <h3>3. Kolačići trećih strana</h3>
                    <p>
                        Pojedini servisi trećih strana mogu postaviti sopstvene
                        kolačiće, kao &scaron;to su analitički alati ili
                        ugrađeni sadržaji sa drugih platformi.
                    </p>
                    <h3>4. Upravljanje kolačićima</h3>
                    <p>
                        Korisnik može u svakom trenutku obrisati ili blokirati
                        kolačiće kroz pode&scaron;avanja svog internet
                        pregledača.
                    </p>
                    <p>
                        Isključivanje određenih kolačića može uticati na
                        funkcionalnost sajta.
                    </p>
                    <h3>5. Izmene politike kolačića</h3>
                    <p>
                        Zadržavamo pravo izmene ove politike radi usklađivanja
                        sa tehničkim i zakonskim promenama.
                    </p>
                    <p>Sve izmene biće objavljene na ovoj stranici.</p>
                </div>
            </div>
        </>
    );
};

export default PolitikaKolacicaPage;

PolitikaKolacicaPage.getLayoutProps = (pageProps) => ({
    header: <StaticPageHeader title="Politika kolačića" />,
});
