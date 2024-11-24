import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { dateFormate } from "../../utils";
import SocialLink from "../../data/social/SocialLink.json";
import MenuData from "../../data/menu/HeaderMenu.json";
import OffcanvasMenu from "./OffcanvasMenu";
import AuthModal from "../auth/AuthModal";
import { useStateContext } from "../../contexts/StateContext";
import axiosClient from "../../utils/axios";


const HeaderOne = () => {
  // Main Menu Toggle
  var menuRef = useRef();
  const [searchResults, setSearchResults] = useState([]);

  const toggleDropdownMenu = () => {
    const dropdownSelect = menuRef.current.childNodes;
    let dropdownList = [];

    for (let i = 0; i < dropdownSelect.length; i++) {
      const element = dropdownSelect[i];
      if (element.classList.contains("has-dropdown")) {
        dropdownList.push(element);
      }
    }

    dropdownList.forEach((element) => {
      element.children[0].addEventListener("click", () => {
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
      });
    });
  };

  useEffect(() => {
    toggleDropdownMenu();
  }, []);

  // Offcanvas Menu
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Header Search
  const [searchshow, setSearchShow] = useState(false);

  const headerSearchShow = () => {
    setSearchShow(true);
  };
  const headerSearchClose = () => {
    setSearchShow(false);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { currentUser, setCurrentUser } =
    useStateContext();

  const performSearch = (e) => {
    const searchInput = e.target.value + '*';
    console.log(searchInput);
    if (searchInput.length > 3) {
      axiosClient.get('/search', { params: { "inputSearch": searchInput } })
        .then((res) => {
          console.log(res.data);
          setSearchResults(res.data)
        })
        .catch((err) => { console.error(err) });
    }
  }

  return <>
    <AuthModal isOpen={isModalOpen} closeModal={closeModal} />
    <OffcanvasMenu ofcshow={show} ofcHandleClose={handleClose} />
    <header className="page-header">
      <div className="header-top bg-grey-dark-one">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md">
              <ul className="header-top-nav list-inline justify-content-center justify-content-md-start">
                <li>
                  <Link href="/o-nama">
                    O nama
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link href="/redakcija">
                    Redakcija
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-auto">
              <ul className="ml-auto social-share header-top__social-share">
                <li>
                  <a href={SocialLink.fb.url}>
                    <i className={SocialLink.fb.icon} />
                  </a>
                </li>
                <li>
                  <a href={SocialLink.twitter.url}>
                    <i className={SocialLink.twitter.icon} />
                  </a>
                </li>
                <li>
                  <a href={SocialLink.instagram.url}>
                    <i className={SocialLink.instagram.icon} />
                  </a>
                </li>
                <li>
                  <a href={SocialLink.linked.url}>
                    <i className={SocialLink.linked.icon} />
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
                  onChange={performSearch}
                />

              </Link>
            </div>
            <div className="main-nav-wrapper">
              <ul className="main-navigation list-inline" ref={menuRef}>
                <li key="100">
                  <Link href="/vesti" legacyBehavior>
                    Vesti
                  </Link>
                </li>
                <li key="101">
                  <Link href="/intervjui" legacyBehavior>
                    Intervjui
                  </Link>
                </li>
                <li key="102">
                  <Link href="/recenzije" legacyBehavior>
                    Recenzije
                  </Link>
                </li>
                <li key="103">
                  <Link href="/festivali" legacyBehavior>
                    Festivali
                  </Link>
                </li>
                <li key="109">
                  <Link href="/repertoari-v2" legacyBehavior>
                    Repertoari v2
                  </Link>
                </li>
                <li key="106">
                  <Link href="/hupkast" legacyBehavior>
                    HuPkast
                  </Link>
                </li>
                <li key="104">
                  <Link href="/predstave" legacyBehavior>
                    Predstave
                  </Link>
                </li>
                {/* <li key="105">
                  <Link href="/pozorista" legacyBehavior>
                    Pozorista
                  </Link>
                </li> */}
              </ul>
            </div>
            <div className="navbar-extra-features ml-auto">
              <form
                action="#"
                className={`navbar-search ${searchshow ? "show-nav-search" : ""
                  }`}
              >
                <div className="search-field">
                  <input
                    type="text"
                    className="navbar-search-field"
                    placeholder="Search Here..."
                    onChange={performSearch}
                  />
                  <button className="navbar-search-btn" type="button">
                    <i className="fal fa-search" />
                  </button>
                </div>
                <span
                  className="navbar-search-close"
                  onClick={headerSearchClose}
                >
                  <i className="fal fa-times" />
                </span>
              </form>
              <div className="search-navbar-result">
                {searchResults && <ul className="ul">
                  {searchResults.slice(0, 5).map(item => <li key={item.tekstid}>{item.naslov}</li>)}
                </ul>}
              </div>

              <button
                className="nav-search-field-toggler"
                onClick={headerSearchShow}
              >
                <i className="far fa-search" />
              </button>
              <button className="side-nav-toggler m-r-xs-10" onClick={handleShow}>
                <span />
                <span />
                <span />
              </button>
              {currentUser ? currentUser.korisnicko_ime : ''}
              <button className="m-l-xs-10" onClick={openModal}>
                <i className="fa-regular fa-user"></i>
              </button>
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
  </>;
};

export default HeaderOne;
