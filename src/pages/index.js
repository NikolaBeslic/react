import { useEffect, useState } from "react";
import HupHome from "../components/home/HupHome";
import axiosClient from "../utils/axios";
import { Spinner } from "react-bootstrap";
import { useStateContext } from "../contexts/StateContext";

export default function HomeSix() {
    const [posts, setPosts] = useState([]);
    const [predstave, setPredstave] = useState([]);
    const { isLoading, showLoading, hideLoading } = useStateContext();

    useEffect(() => {
        showLoading();
        axiosClient.get("/get-posts").then((res) => {
            setPosts(res.data);
            hideLoading();
        });
        axiosClient
            .get("/get-predstave-naslovna")
            .then((res) => {
                console.log(res.data);
                setPredstave(res.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            {isLoading && (
                <Spinner
                    animation="border"
                    role="status"
                    className="hup-spinner"
                />
            )}
            <HupHome posts={posts} predstave={predstave} />
        </>
    );
}
