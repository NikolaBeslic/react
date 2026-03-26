import axiosClient from "../../utils/axios";
import PozoristaLayout from "../../components/post/layout/PozoristaLayout";
import PozoristaHeader from "../../components/post/post-format/elements/meta/PozoristaHeader";
import { withSSRHandler } from "../../utils/withSSRHandler";
import { Form, InputGroup } from "react-bootstrap";
import { useState } from "react";

export default function PozoristaPage({ pozorista }) {
    const [pozorja, setPozorja] = useState(pozorista);
    const [searchInput, setSearchInput] = useState("");
    const handleSearch = (event) => {
        setSearchInput(event.target.value);
        setPozorja(
            pozorista.filter((item) =>
                item.naziv_pozorista
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase()),
            ),
        );
    };

    return (
        <>
            <div className="random-posts section-gap">
                <div className="axil-content">
                    <InputGroup className="mb-5 pozorista-search-input-group">
                        <InputGroup.Text id="basic-addon1">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Pretraži pozorišta"
                            aria-label="seacrh"
                            aria-describedby="basic-addon1"
                            value={searchInput}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                    <div className="pozorista-grid">
                        {pozorja?.map((pozoriste) => (
                            <PozoristaLayout
                                pozoriste={pozoriste}
                                key={pozoriste.pozoristeid}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    const response = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/get-all-pozorista`,
    );
    const pozorista = response.data;

    return {
        props: {
            pozorista,
        },
    };
});

PozoristaPage.getLayoutProps = (pageProps) => ({
    header: <PozoristaHeader />,
});
