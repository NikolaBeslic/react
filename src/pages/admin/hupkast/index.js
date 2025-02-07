import { Button } from "@mui/material";
import axiosClient from "../../../utils/axios";

export default function HuPkastPage() {
    const handleCheckRSSClick = () => {
        axiosClient
            .get("/admin/check-hupkast-rss")
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                }
            })
            .catch((err) => console.error(err));
    };

    const handleInsertHuPkastFromRSS = () => {
        axiosClient
            .get("/admin/hupkast/insert-new-episodes")
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };

    return (
        <>
            <h1>HuPkast</h1>
            <div className="container">
                <Button variant="contained" onClick={handleCheckRSSClick}>
                    Check RSS
                </Button>

                <Button variant="outlined" onClick={handleInsertHuPkastFromRSS}>
                    Dodaj nove epizode
                </Button>
            </div>
        </>
    );
}
