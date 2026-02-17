import { useContext, useState, createContext, useMemo } from "react";

const StateContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const [auth, setAuth] = useState({
        status: "idle",
        actorType: null,
        user: null,
        admin: null,
    });

    const value = useMemo(() => ({ auth, setAuth }), [auth]);

    return (
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(StateContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
