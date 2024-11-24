import { useContext, useState, createContext, useEffect } from "react";
import axiosClient from "../utils/axios";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    isAdmin: false,
    toast: {
        message: null,
        show: false,
    },
    isLoading: false,
    setCurrentUser: () => { },
    setUserToken: () => { },
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    // const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [toast, setToast] = useState({ message: '', show: false });
    const [isAdmin, setIsAdmin] = useState([false]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAdmin(false);
        axiosClient.get('/user',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if (res.status == 200) {
                    setCurrentUser(res.data);
                }
                console.log(res);
            }).catch((error) => {
                console.log(error);
            })

    }, []);

    const showToast = (message) => {
        setToast({ message, show: true })
        setTimeout(() => {
            setToast({ message: '', show: false })
        }, 5000)
    }
    const showLoading = () => { setIsLoading(true) }
    const hideLoading = () => { setIsLoading(false) }
    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                toast,
                showToast,
                isAdmin,
                isLoading,
                showLoading,
                hideLoading
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);