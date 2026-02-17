import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axiosClient from "../../utils/axios";
import { useUser } from "../../contexts/UserContext";

const Page = () => {
    const router = useRouter();
    const { user, refreshUser } = useUser();

    useEffect(() => {
        const { userFromUri, redirect_url, error } = router.query;

        if (error) {
            console.error("Login error:", error);
            router.push("/login"); // Redirect to login page on error
            return;
        }

        if (userFromUri) {
            try {
                // Save token and userFromUri data
                /*  Cookies.set("token", token, {
                    path: "/",
                    secure: true,
                    sameSite: "lax",
                });
                axiosClient.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                console.log("userFromUri"); */

                console.log("userFromUri");
                console.log(decodeURIComponent(userFromUri));
                //const json = atob(decodeURIComponent(userFromUri));
                const loggedUser = JSON.parse(decodeURIComponent(userFromUri));
                //setCurrentUser(loggedUser);
                refreshUser();

                // Redirect to the original page or fallback to home
                const redirectTo = redirect_url
                    ? decodeURIComponent(redirect_url)
                    : "/";
                router.push(redirectTo);
            } catch (err) {
                console.error("Error processing userFromUri data:", err);
                router.push("/login"); // Redirect to login page on failure
            }
        }
    }, [router]);
};
export default Page;
