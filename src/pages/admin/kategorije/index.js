import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import { Button, IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import AdminHeader from "../../../components/admin/layout/AdminHeader";

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
        router.push(`/admin/kategorije/create?kategorijaid=${kategorijaid}`);
    };

    return (
        <>
            <AdminHeader metaTitle="Kategorije" />
            <h1>Kategorije</h1>
            <Button
                href="/admin/kategorije/create"
                variant="contained"
                sx={{ mb: 5 }}
                startIcon={<AddIcon />}
            >
                Dodaj kategoriju
            </Button>

            {kategorije.map((kategorija) => (
                <div key={kategorija.kategorijaid} className="kategorije-list">
                    {kategorija.naziv_kategorije}
                    <IconButton
                        variant="outline"
                        color="secondary"
                        onClick={() => handleEditClick(kategorija.kategorijaid)}
                        title="Izmeni"
                    >
                        <EditNoteIcon />
                    </IconButton>

                    {kategorija.subkategorije.length > 0
                        ? kategorija.subkategorije.map((sk) => (
                              <>
                                  <br />
                                  |--
                                  <span key={sk.kategorijaid}>
                                      {" "}
                                      {sk.naziv_kategorije}
                                      <IconButton
                                          variant="outline"
                                          color="secondary"
                                          title="Izmeni"
                                          onClick={() =>
                                              handleEditClick(sk.kategorijaid)
                                          }
                                      >
                                          <EditNoteIcon />
                                      </IconButton>
                                  </span>
                              </>
                          ))
                        : ""}
                </div>
            ))}
        </>
    );
}
