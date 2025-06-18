import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../contexts/StateContext";
import axiosClient from "../../utils/axios";

const Page = () => {
    const router = useRouter();
    const { currentUser, setCurrentUser } = useStateContext();

    useEffect(() => {
        const { token, user, redirect_url, error } = router.query;

        if (error) {
            console.error("Login error:", error);
            router.push("/login"); // Redirect to login page on error
            return;
        }

        if (token && user) {
            try {
                // Save token and user data
                localStorage.setItem("token", token);
                document.cookie = `token=${token}; path=/; secure; samesite=lax`;
                axiosClient.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                console.log("USER");

                console.log(decodeURIComponent(user));
                //const json = atob(decodeURIComponent(user));
                const loggedUser = JSON.parse(decodeURIComponent(user));
                setCurrentUser(loggedUser);

                // Redirect to the original page or fallback to home
                const redirectTo = redirect_url
                    ? decodeURIComponent(redirect_url)
                    : "/";
                router.push(redirectTo);
            } catch (err) {
                console.error("Error processing user data:", err);
                router.push("/login"); // Redirect to login page on failure
            }
        }
    }, [router]);
};
export default Page;
