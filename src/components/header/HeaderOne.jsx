import { forwardRef, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SocialLink from "../../data/social/SocialLink.json";
import OffcanvasMenu from "./OffcanvasMenu";
import AuthModal from "../auth/AuthModal";
import { useUser } from "../../contexts/UserContext";
import axiosClient from "../../utils/axios";
import { Spinner, Dropdown } from "react-bootstrap";
import SearchResult from "../elements/SearchResult";
import { toast } from "react-hot-toast";
import { csrf, getCookieValue } from "../../utils";
import UserAvatar from "../common/UserAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";

const HeaderOne = () => {
    // Main Menu Toggle
    var menuRef = useRef();
    const searchWrapperRef = useRef(null);
    const searchInputRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResultsActive, setSearchResultsActive] = useState(false);
    let timer,
        timeoutVal = 500;

    const toggleDropdownMenu = () => {
        const dropdownSelect = menuRef.current?.childNodes;
        let dropdownList = [];
        let handlers = [];

        if (!dropdownSelect) return () => {};

        for (let i = 0; i < dropdownSelect.length; i++) {
            const element = dropdownSelect[i];
            if (element.classList?.contains("has-dropdown")) {
                dropdownList.push(element);
            }
        }

        dropdownList.forEach((element) => {
            const handler = () => {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                    element.childNodes[1].classList.remove("opened");
                } else {
                    dropdownList.forEach((submenu) => {
                        if (element !== submenu) {
                            submenu.classList.remove("active");
                            submenu.childNodes[1].classList.remove("opened");
                        } else {
                            submenu.classList.add("active");
                            submenu.childNodes[1].classList.add("opened");
                        }
                    });
                }
            };

            element.children[0].addEventListener("click", handler);
            handlers.push({
                target: element.children[0],
                handler,
            });
        });

        return () => {
            handlers.forEach(({ target, handler }) => {
                target.removeEventListener("click", handler);
            });
        };
    };

    useEffect(() => {
        const cleanup = toggleDropdownMenu();
        return cleanup;
    }, []);

    // Offcanvas Menu
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Header Search
    const [searchshow, setSearchShow] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const headerSearchShow = () => {
        setSearchShow(true);
        searchInputRef.current.focus();
        searchInputRef.current.setAttribute("autofocus", "");
    };
    const headerSearchClose = () => {
        setSearchShow(false);
        setSearchResultsActive(false);
        searchInputRef.current.value = "";
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchWrapperRef.current &&
                !searchWrapperRef.current.contains(event.target)
            ) {
                setSearchResultsActive(false);
                headerSearchClose?.();
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSearchResultsActive(false);
                headerSearchClose?.();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [headerSearchClose]);

    const handleSearchNavigate = () => {
        headerSearchClose?.();
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            const query = searchInputRef.current?.value?.trim();

            if (!query) return;

            headerSearchClose?.();
            router.push(`/pretraga?query=${encodeURIComponent(query)}`);
        }
    };

    // Mobile Menu Toggle
    const [mobileToggle, setMobileToggle] = useState(false);

    const MobileMenuToggler = () => {
        setMobileToggle(!mobileToggle);
        const HtmlTag = document.querySelector("html");
        const menuSelect = document.querySelectorAll(".main-navigation li");

        if (HtmlTag.classList.contains("main-menu-opened")) {
            HtmlTag.classList.remove("main-menu-opened");
        } else {
            setTimeout(() => {
                HtmlTag.classList.add("main-menu-opened");
            }, 800);
        }

        menuSelect.forEach((element) => {
            element.addEventListener("click", function () {
                if (!element.classList.contains("has-dropdown")) {
                    HtmlTag.classList.remove("main-menu-opened");
                    setMobileToggle(false);
                }
            });
        });
    };

    // Modal
    //const [isModalOpen, setIsModalOpen] = useState(false);
    const { isModalOpen, setModalOpen, user, refreshUser } = useUser();

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const router = useRouter();
    const handleForgotPasswordClick = () => {
        closeModal();
        router.push("/zaboravljena-lozinka");
    };

    const [logoutLoading, setLogoutLoading] = useState(false);

    const handleLogout = async () => {
        setLogoutLoading(true);
        try {
            await csrf();
            const res = await axiosClient.post("/logout", user, {
                withCredentials: true,
                headers: {
                    "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                },
            });

            console.log(res.data);
            toast.success("Uspešno ste se izlogovali");
            router.push("/");
            await refreshUser();
        } catch (err) {
            console.error(err);
            toast.error("Greška prilikom logout-а");
        } finally {
            setLogoutLoading(false);
        }
    };

    const AvatarToggle = forwardRef(({ children, onClick }, ref) => (
        <a
            href="#"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="d-flex align-items-center text-decoration-none"
            style={{ cursor: "pointer" }}
        >
            {children}
        </a>
    ));

    AvatarToggle.displayName = "AvatarToggle";

    /* search functions */
    function handleKeyUp(e) {
        window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
        timer = window.setTimeout(() => {
            setSearchInput(e.target.value);
            performSearch(e.target.value + "*");
        }, timeoutVal);
    }

    function handleKeyPress(e) {
        window.clearTimeout(timer);
    }

    const performSearch = (searchInput) => {
        //const searchInput = e.target.value + "*";
        // TO DO: Fix loading layout
        // setSearchLoading(true);
        console.log(searchInput);
        if (searchInput.length >= 3) {
            setSearchLoading(true);
            axiosClient
                .get("/search", { params: { inputSearch: searchInput } })
                .then((res) => {
                    console.log(res.data);
                    setSearchResultsActive(true);
                    setSearchResults(res.data);
                    setSearchLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setSearchLoading(false);
                });
        } else {
            if (searchInput.length < 2) {
                setSearchLoading(false);
                return;
            }
        }
    };

    return (
        <>
            <AuthModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                handleForgotPasswordClick={handleForgotPasswordClick}
            />
            <OffcanvasMenu
                ofcshow={show}
                setOfcShow={setShow}
                ofcHandleClose={handleClose}
            />
            <header className="page-header">
                <div className="header-top bg-grey-dark-one">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md">
                                <ul className="header-top-nav list-inline justify-content-center justify-content-md-start">
                                    <li>
                                        <Link href="/o-nama">O nama</Link>
                                    </li>
                                    <li>
                                        <Link href="/kontakt">Kontakt</Link>
                                    </li>
                                    <li>
                                        <Link href="/redakcija">Redakcija</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-auto">
                                <ul className="ml-auto social-share header-top__social-share">
                                    <li>
                                        <a
                                            href={SocialLink.fb.url}
                                            title="Hoću u pozorište na Facebooku"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <i className={SocialLink.fb.icon} />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={SocialLink.instagram.url}
                                            title="hocupozoriste na Instagramu"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <i
                                                className={
                                                    SocialLink.instagram.icon
                                                }
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={SocialLink.yt.url}
                                            title="YouTube kanal Hoću u pozorište"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <i className={SocialLink.yt.icon} />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={SocialLink.spotify.url}
                                            title="HuPkast na Spotify-u"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <i
                                                className={
                                                    SocialLink.spotify.icon
                                                }
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar bg-white">
                    <div className="container">
                        <div className="navbar-inner">
                            <div className="brand-logo-container">
                                <Link href="/">
                                    <Image
                                        src="/images/hup-logo.png"
                                        alt="brand-logo"
                                        width={123}
                                        height={34}
                                    />
                                </Link>
                            </div>
                            <div className="main-nav-wrapper">
                                <ul
                                    className="main-navigation list-inline"
                                    ref={menuRef}
                                >
                                    <li key="100">
                                        <Link href="/vesti" legacyBehavior>
                                            Vesti
                                        </Link>
                                    </li>
                                    <li
                                        key="101"
                                        className="has-dropdown intervju-navbar-li"
                                    >
                                        <Link href="#" legacyBehavior>
                                            Intervjui
                                        </Link>
                                        <ul className="submenu intervju-submenu">
                                            <li key={1011}>
                                                <Link href="/hupikon">
                                                    HuPikon
                                                </Link>
                                            </li>
                                            <li key={1012}>
                                                <Link href="/na-kafi-sa">
                                                    Na kafi sa
                                                </Link>
                                            </li>
                                            <li key={1014}>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li key={1013}>
                                                <Link href="/intervjui">
                                                    Svi intervjui
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li key="102">
                                        <Link href="/recenzije" legacyBehavior>
                                            Recenzije
                                        </Link>
                                    </li>
                                    <li key="106">
                                        <Link href="/hupkast" legacyBehavior>
                                            HuPkast
                                        </Link>
                                    </li>

                                    <li key="111">
                                        <Link href="/blog" legacyBehavior>
                                            Blog
                                        </Link>
                                    </li>
                                    <li key="103">
                                        <Link href="/festivali" legacyBehavior>
                                            Festivali
                                        </Link>
                                    </li>
                                    <li key="109">
                                        <Link href="/repertoari" legacyBehavior>
                                            Repertoari
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="navbar-extra-features ml-auto">
                                <form
                                    action="#"
                                    className={`navbar-search ${
                                        searchshow ? "show-nav-search" : ""
                                    }`}
                                    ref={searchWrapperRef}
                                >
                                    <div className="search-field">
                                        <input
                                            type="text"
                                            className="navbar-search-field"
                                            placeholder="Unesi pojam za pretragu..."
                                            ref={searchInputRef}
                                            onKeyUp={handleKeyUp}
                                            onKeyDown={handleInputKeyDown}
                                        />
                                        {searchLoading && (
                                            <Spinner
                                                animation="border"
                                                role="status"
                                                className="hup-spinner"
                                            />
                                        )}
                                        <button
                                            className="navbar-search-btn"
                                            type="button"
                                            aria-label="Pretraga"
                                        >
                                            <i className="fal fa-search" />
                                        </button>
                                        <div
                                            className={`search-navbar-result${
                                                searchResultsActive
                                                    ? "-active"
                                                    : ""
                                            }`}
                                        >
                                            {searchResults && (
                                                <>
                                                    <ul className="ul">
                                                        {searchResults
                                                            .slice(0, 4)
                                                            .map((item) => (
                                                                <SearchResult
                                                                    data={item}
                                                                    onNavigate={
                                                                        handleSearchNavigate
                                                                    }
                                                                    key={
                                                                        item.id
                                                                    }
                                                                />
                                                            ))}
                                                    </ul>
                                                    <Link
                                                        href={`/pretraga?query=${encodeURIComponent(searchInput)}`}
                                                        onClick={
                                                            headerSearchClose
                                                        }
                                                    >
                                                        <div className="search-results-footer">
                                                            <span className="search-results-footer-text">
                                                                Prikaži sve
                                                                rezultate za:{" "}
                                                                <strong>
                                                                    „
                                                                    {
                                                                        searchInput
                                                                    }
                                                                    ”
                                                                </strong>
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <span
                                        className="navbar-search-close"
                                        onClick={headerSearchClose}
                                    >
                                        <i className="fal fa-times" />
                                    </span>
                                </form>

                                <button
                                    className="nav-search-field-toggler"
                                    onClick={headerSearchShow}
                                    aria-label="Otvori pretragu"
                                >
                                    <i className="fal fa-magnifying-glass"></i>
                                </button>
                                <button
                                    className="side-nav-toggler m-r-xs-10"
                                    onClick={handleShow}
                                    aria-label="Glavni meni"
                                >
                                    <span />
                                    <span />
                                    <span />
                                </button>

                                {user ? (
                                    logoutLoading ? (
                                        <Spinner
                                            animation="border"
                                            role="status"
                                            size="sm"
                                        />
                                    ) : (
                                        <>
                                            <Dropdown
                                                align="end"
                                                className="user-dropdown"
                                                aria-label="Korisnički meni"
                                            >
                                                <Dropdown.Toggle
                                                    as={AvatarToggle}
                                                    id="user-menu-toggle"
                                                >
                                                    <UserAvatar
                                                        name={
                                                            user?.korisnicko_ime
                                                        }
                                                        size={28}
                                                    />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        as={Link}
                                                        href="/korisnicki-profil"
                                                    >
                                                        Korisnički profil
                                                    </Dropdown.Item>

                                                    <Dropdown.Item
                                                        onClick={handleLogout}
                                                    >
                                                        Logout
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </>
                                    )
                                ) : (
                                    <button
                                        className="m-l-xs-10 nav-search-field-toggler"
                                        onClick={openModal}
                                        aria-label="Forma za logovanje i registraciju"
                                    >
                                        <i className="fa-regular fa-user"></i>
                                    </button>
                                )}
                            </div>
                            {/* <div
              className={`main-nav-toggler d-block d-lg-none ${mobileToggle ? "expanded" : ""
                }`}
            >
              <div className="toggler-inner" onClick={MobileMenuToggler}>
                <span />
                <span />
                <span />
              </div>
            </div> */}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default HeaderOne;
