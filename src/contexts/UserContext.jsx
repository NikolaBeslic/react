import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    useCallback,
} from "react";
import axiosClient from "../utils/axios";
import { useAuth } from "./StateContext";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const { setAuth } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);

    const [userState, setUserState] = useState({
        loading: true,
        user: null,
        error: null,
        // later: wishlistCount, watchedCount, etc.
    });

    const fetchUser = useCallback(async () => {
        setUserState((s) => ({ ...s, loading: true, error: null }));

        try {
            const res = await axiosClient.get("/user");

            setAuth({
                status: "authenticated",
                actorType: "user",
                user: res.data,
                admin: null,
            });

            setUserState({
                loading: false,
                user: res.data,
                error: null,
            });

            return res.data;
        } catch (err) {
            setAuth({
                status: "guest",
                actorType: null,
                user: null,
                admin: null,
            });

            setUserState({
                loading: false,
                user: null,
                error: err,
            });

            return null;
        }
    }, [setAuth]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const value = useMemo(
        () => ({
            ...userState,
            refreshUser: fetchUser,
            isModalOpen,
            setModalOpen,
        }),
        [userState, fetchUser, isModalOpen],
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
}
