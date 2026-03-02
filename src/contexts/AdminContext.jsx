import {
    useCallback,
    useState,
    useEffect,
    useMemo,
    useContext,
    createContext,
} from "react";
import { useAuth } from "./StateContext";
import axiosClient from "../utils/axios";
import { csrf, getCookieValue } from "../utils";
import { useRouter } from "next/router";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
    const { setAuth } = useAuth();
    const router = useRouter();
    const [adminState, setAdminState] = useState({
        loading: true,
        admin: null,
        error: null,
        unnaprovedCommentsCount: 0,
    });

    const [unnaprovedCommentsCount, setUnnapprovedCommentsCount] = useState(0);
    const fetchUnapprovedCommentsCount = () => {
        axiosClient
            .get("/admin/unapproved-comments-count")
            .then((res) => {
                setUnnapprovedCommentsCount(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchAdminUser = useCallback(async () => {
        setAdminState((s) => ({ ...s, loading: true, error: null }));

        try {
            const res = await axiosClient.get("/admin/user");

            // Update global auth
            setAuth({
                status: "authenticated",
                actorType: "admin",
                admin: res.data,
                user: null,
            });

            // Update admin-only state
            setAdminState({
                loading: false,
                admin: res.data,
                error: null,
            });
            fetchUnapprovedCommentsCount();
            return res.data;
        } catch (err) {
            // Not logged in as admin (or session expired)
            setAuth({
                status: "guest",
                actorType: null,
                admin: null,
                user: null,
            });

            setAdminState({
                loading: false,
                admin: null,
                error: err,
            });

            return null;
        }
    }, [setAuth]);

    const [adminLogoutLoading, setAdminLogoutLoading] = useState(false);
    const adminLogout = useCallback(async () => {
        setAdminLogoutLoading(true);

        try {
            await csrf();

            await axiosClient.post(`/adminlogout`, adminState.admin, {
                headers: {
                    "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                },
            });

            setAuth({
                status: "guest",
                actorType: null,
                admin: null,
                user: null,
            });

            setAdminState({
                loading: false,
                admin: null,
                error: null,
            });

            setAdminLogoutLoading(false);
        } catch (err) {
            console.error(err);
            setAdminLogoutLoading(false);
        }
    }, [adminState.admin, router, setAuth]);

    useEffect(() => {
        fetchAdminUser();
    }, [fetchAdminUser]);

    const value = useMemo(
        () => ({
            ...adminState,
            refreshAdmin: fetchAdminUser,
            fetchUnapprovedCommentsCount,
            unnaprovedCommentsCount,
            setUnnapprovedCommentsCount,
            adminLogout,
            adminLogoutLoading,
        }),
        [
            adminState,
            fetchAdminUser,
            fetchUnapprovedCommentsCount,
            unnaprovedCommentsCount,
            adminLogout,
            adminLogoutLoading,
        ],
    );

    return (
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    );
}

export function useAdmin() {
    const ctx = useContext(AdminContext);
    if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
    return ctx;
}
