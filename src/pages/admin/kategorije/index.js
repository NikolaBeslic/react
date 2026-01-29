import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import { Button } from "react-bootstrap";
import { faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import AdminHeader from "../../../components/admin/layout/AdminHeader";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function KategorijePage() {
    const [kategorije, setKategorije] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axiosClient
            .get("/admin/kategorije")
            .then((res) => {
                console.log(res.data);
                setKategorije(res.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleEditClick = (kategorijaid) => {
        console.log(kategorijaid);
        router.push(`/admin/kategorije/edit?kategorijaid=${kategorijaid}`);
    };

    return (
        <>
            <AdminHeader metaTitle="Kategorije" />
            <h1>Kategorije</h1>
            <Button as={Link} href="/admin/kategorije/create" variant="primary">
                <FontAwesomeIcon icon={faPlus} /> Dodaj kategoriju
            </Button>

            {kategorije.map((kategorija) => (
                <div key={kategorija.kategorijaid} className="kategorije-list">
                    {kategorija.naziv_kategorije}
                    <Button
                        variant="link"
                        className="p-0 text-danger m-2"
                        onClick={() => handleEditClick(kategorija.kategorijaid)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>

                    {kategorija.subkategorije.length > 0
                        ? kategorija.subkategorije.map((sk) => (
                              <>
                                  <br />
                                  |--
                                  <span key={sk.kategorijaid}>
                                      {" "}
                                      {sk.naziv_kategorije}
                                      <Button
                                          variant="link"
                                          className="p-0 text-danger m-2"
                                          title="Edit"
                                          onClick={() =>
                                              handleEditClick(sk.kategorijaid)
                                          }
                                      >
                                          <FontAwesomeIcon
                                              icon={faPenToSquare}
                                          />
                                      </Button>
                                  </span>
                              </>
                          ))
                        : ""}
                </div>
            ))}
        </>
    );
}
