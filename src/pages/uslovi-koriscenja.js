import StaticPageHeader from "../components/post/post-format/elements/meta/StaticPageHeader";

const UsloviKoriscenjaPage = () => {
    return (
        <>
            <div className="axil-our-team section-gap">
                <div className="container">
                    <p>
                        Dobrodo&scaron;li na sajt{" "}
                        <strong>Hoću u pozori&scaron;te</strong>.
                        Kori&scaron;ćenjem ovog sajta prihvatate niže navedene
                        uslove kori&scaron;ćenja.
                    </p>
                    <h3>1. Op&scaron;te odredbe</h3>
                    <p>
                        Sajt <strong>Hoću u pozori&scaron;te</strong> namenjen
                        je informisanju korisnika o pozori&scaron;nim
                        predstavama, festivalima, intervjuima i drugim
                        sadržajima iz oblasti pozori&scaron;ne umetnosti.
                    </p>
                    <p>
                        Kori&scaron;ćenje sajta dozvoljeno je isključivo u
                        skladu sa važećim zakonima i ovim uslovima
                        kori&scaron;ćenja.
                    </p>
                    <h3>2. Korisnički nalozi</h3>
                    <p>
                        Za kori&scaron;ćenje pojedinih funkcionalnosti sajta
                        (komentarisanje, ocenjivanje, liste želja i druge
                        korisničke opcije) korisnik može otvoriti nalog.
                    </p>
                    <p>
                        Korisnik je odgovoran za tačnost unetih podataka i za
                        čuvanje pristupnih podataka svog naloga.
                    </p>
                    <p>
                        Administrator sajta zadržava pravo da suspenduje ili
                        obri&scaron;e nalog u slučaju zloupotrebe ili
                        kr&scaron;enja pravila kori&scaron;ćenja.
                    </p>
                    <h3>3. Komentari i korisnički sadržaj</h3>
                    <p>
                        Korisnik snosi punu odgovornost za sadržaj koji
                        objavljuje putem komentara ili drugih interakcija na
                        sajtu.
                    </p>
                    <p>Nije dozvoljeno objavljivanje sadržaja koji:</p>
                    <ul>
                        <li>
                            <p>vređa ili diskrimini&scaron;e druge korisnike</p>
                        </li>
                        <li>
                            <p>sadrži govor mržnje</p>
                        </li>
                        <li>
                            <p>promovi&scaron;e nezakonite aktivnosti</p>
                        </li>
                        <li>
                            <p>sadrži netačne ili obmanjujuće informacije</p>
                        </li>
                        <li>
                            <p>naru&scaron;ava prava trećih lica</p>
                        </li>
                    </ul>
                    <p>
                        Administrator zadržava pravo da ukloni sadržaj koji nije
                        u skladu sa ovim pravilima bez prethodnog upozorenja.
                    </p>
                    <h3>4. Autorska prava</h3>
                    <p>
                        Sav sadržaj objavljen na sajtu, uključujući tekstove,
                        fotografije, grafičke elemente i bazu podataka,
                        za&scaron;tićen je autorskim pravima, osim ako nije
                        drugačije naznačeno.
                    </p>
                    <p>
                        Nije dozvoljeno preuzimanje, umnožavanje ili
                        distribucija sadržaja bez prethodne saglasnosti.
                    </p>
                    <h3>5. Tačnost informacija</h3>
                    <p>
                        Trudimo se da informacije na sajtu budu tačne i ažurne,
                        ali ne garantujemo potpunu tačnost svih podataka,
                        posebno kada su u pitanju termini izvođenja, cene
                        ulaznica ili informacije preuzete od trećih strana.
                    </p>
                    <h3>6. Linkovi ka spoljnim sajtovima</h3>
                    <p>
                        Sajt može sadržati linkove ka drugim internet
                        stranicama. Ne odgovaramo za sadržaj, dostupnost niti
                        politiku privatnosti tih sajtova.
                    </p>
                    <h3>7. Ograničenje odgovornosti</h3>
                    <p>
                        Sajt nije odgovoran za eventualnu &scaron;tetu nastalu
                        kori&scaron;ćenjem informacija objavljenih na sajtu ili
                        privremenom nedostupno&scaron;ću servisa.
                    </p>
                    <h3>8. Izmene sadržaja i uslova</h3>
                    <p>
                        Zadržavamo pravo izmene sadržaja sajta, funkcionalnosti
                        i ovih uslova kori&scaron;ćenja u bilo kom trenutku.
                    </p>
                    <p>Sve izmene biće objavljene na ovoj stranici.</p>
                    <h3>9. Kontakt</h3>
                    <p>
                        Za sva pitanja u vezi sa kori&scaron;ćenjem sajta možete
                        nas kontaktirati putem email adrese:
                    </p>
                    <p>kontakt@hocupozoriste.rs</p>
                </div>
            </div>
        </>
    );
};

export default UsloviKoriscenjaPage;

UsloviKoriscenjaPage.getLayoutProps = (pageProps) => ({
    header: <StaticPageHeader title="Uslovi korišćenja" />,
});
