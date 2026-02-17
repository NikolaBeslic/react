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

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
    const { setAuth } = useAuth();

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
        }),
        [adminState, fetchAdminUser],
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
