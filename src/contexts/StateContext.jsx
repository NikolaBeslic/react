import { useContext, useState, createContext, useEffect } from "react";
import axiosClient from "../utils/axios";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    isAdmin: false,

    isLoading: false,
    setCurrentUser: () => {},
    setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    // const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [isAdmin, setIsAdmin] = useState([false]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const [unnaprovedCommentsCount, setUnnapprovedCommentsCount] = useState(0);

    useEffect(() => {
        console.log("STATE Context");

        axiosClient
            .get("/user", {
                withCredentials: true,
            })
            .then((res) => {
                if (res.status == 200) {
                    setCurrentUser(res.data);
                }
                console.log(res);
            })
            .catch((error) => {
                setCurrentUser(null);
                console.log(error);
            });

        fetchUnapprovedCommentsCount();
    }, []);

    const showLoading = () => {
        setIsLoading(true);
    };
    const hideLoading = () => {
        setIsLoading(false);
    };

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

    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                isAdmin,
                setIsAdmin,
                isLoading,
                showLoading,
                hideLoading,
                isModalOpen,
                setModalOpen,
                unnaprovedCommentsCount,
                setUnnapprovedCommentsCount,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
