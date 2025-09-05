import Image from "next/image";
import AboutHeader from "../components/post/post-format/elements/meta/AboutHeader";

const AboutPage = () => {
    return (
        <>
            <div className="axil-our-team section-gap">
                <div className="container">
                    <p>
                        Da li vam se ikad desilo da želite da pogledate neku
                        predstavu, a ne možete da se organizujete sa vremenom,
                        novcem, društvom, kupovinom karata? Hoću (u) pozorište
                        ima za cilj da vam omogući da se to više nikad ne desi.
                        Registrujte se u samo nekoliko klikova, pronađiite
                        željene predstave i dodajte ih na svoju listu želja. Na
                        vašem profilu možete pratiti kada se te predstave
                        igraju, a mi ćemo vas na početku svakog meseca
                        obaveštavati da li se ta predstava nalazi na repertoaru
                        za taj mesec. Kada pogledate neku predstavu prebacite je
                        u odgledane, ocenite i/ili komentarišite kako bi
                        zainteresovali ostale korisnike.
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
                        Sajt Hoću (u) pozori&scaron;te je započet tokom 2016.
                        godine kao diplomski rad na Fakultetu organizacionih
                        nauka, uobličen je početkom 2017. kako bi počeo sa radom
                        na Svetski dan pozori&scaron;ta 27. marta iste godine.
                        Sajt uređuju mladi ljudi i studenti zainteresovani za
                        pozori&scaron;nu kulturu. Ukoliko ste zainteresovani za
                        novinarstvo, marketing ili informacione tehnologije,
                        volite pozori&scaron;te, i želite da pi&scaron;ete,
                        uređujete, sprovodite nove ideje javite nam se na&nbsp;
                        <a href="mailto:kontakt@hocupozoriste.rs">
                            kontakt@hocupozoriste.rs
                        </a>
                    </p>
                    <p>
                        Ukoliko smo va&scaron;e pozori&scaron;te preskočili ili
                        želite da va&scaron;e pozori&scaron;te predstavimo
                        drugačije, raspoloženi ste za bilo kakav vid saradnje
                        slobodno nam se javite na&nbsp;
                        <a href="mailto:kontakt@hocupozoriste.rs">
                            kontakt@hocupozoriste.rs
                        </a>
                    </p>
                    <p>
                        Pratite nas na&nbsp;
                        <a
                            href="https://www.facebook.com/hocupozoriste/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            fejsbuku
                        </a>
                        &nbsp;i&nbsp;
                        <a
                            href="https://twitter.com/hocupozoriste"
                            target="_blank"
                            rel="noreferrer"
                        >
                            tviteru
                        </a>
                        .
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
