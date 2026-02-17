import { useEffect, useState } from "react";
import HupHome from "../components/home/HupHome";
import axiosClient from "../utils/axios";
import { Spinner } from "react-bootstrap";

export default function HomeSix() {
    const [posts, setPosts] = useState([]);
    const [predstave, setPredstave] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/get-posts").then((res) => {
            setPosts(res.data);
            setLoading(false);
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
            {loading && (
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

HomeSix.getLayoutProps = {
    noSidebar: true,
    isNaslovna: true,
};
