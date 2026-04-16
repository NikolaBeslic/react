import { useState } from "react";
import Link from "next/link";
import { Button, Col, Nav, Navbar, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPodcast,
    faFilePen,
    faList,
    faComments,
    faChartSimple,
    faTags,
    faIcons,
    faShapes,
    faCity,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAdmin } from "../../../contexts/AdminContext";
import { useMediaQuery } from "react-responsive";

function AdminSidebar({ collapsed, setCollapsed }) {
    const { unnaprovedCommentsCount } = useAdmin();
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    return (
        <>
            <aside className={`sidebar-wrapper d-none d-lg-block`}>
                <Navbar
                    className={`sidebar ${collapsed ? "collapsed" : ""}`}
                    bg="dark"
                    variant="dark"
                    hidden={isTabletOrMobile}
                >
                    <Nav className="flex-column">
                        <Nav.Link
                            href="/admin/tekstovi/vesti"
                            as={Link}
                            key={2101}
                        >
                            Vesti
                        </Nav.Link>
                        <Nav.Link
                            href="/admin/tekstovi/intervjui"
                            as={Link}
                            key={2102}
                        >
                            Intevjui
                        </Nav.Link>
                        <Nav.Link href="/admin/hupkast" as={Link} key={201}>
                            <FontAwesomeIcon
                                icon={faPodcast}
                                className="fa-icon"
                            />{" "}
                            HuPkast
                        </Nav.Link>
                        <Nav.Link href="/admin/hupikon" as={Link} key={202}>
                            <FontAwesomeIcon
                                icon={faFilePen}
                                className="fa-icon"
                            />{" "}
                            HuPikon
                        </Nav.Link>
                        <Nav.Link href="/admin/tekstovi" as={Link} key={203}>
                            <FontAwesomeIcon
                                icon={faList}
                                className="fa-icon"
                            />{" "}
                            Svi tekstovi
                        </Nav.Link>
                        <hr />
                        <Nav.Link href="/admin/komentari" as={Link} key={204}>
                            <FontAwesomeIcon
                                icon={faComments}
                                className="fa-icon"
                            />{" "}
                            Komentari
                            {unnaprovedCommentsCount > 0 && (
                                <Badge pill bg="warning" text="dark">
                                    {unnaprovedCommentsCount}
                                </Badge>
                            )}
                        </Nav.Link>
                        <Nav.Link href="/admin/statistika" as={Link} key={205}>
                            <FontAwesomeIcon
                                icon={faChartSimple}
                                className="fa-icon"
                            />{" "}
                            Statistika
                        </Nav.Link>
                        <Nav.Link href="/admin/tagovi" as={Link} key={206}>
                            <FontAwesomeIcon
                                icon={faTags}
                                className="fa-icon"
                            />{" "}
                            Tagovi
                        </Nav.Link>
                        <Nav.Link href="/admin/zanrovi" as={Link} key={207}>
                            <FontAwesomeIcon
                                icon={faIcons}
                                className="fa-icon"
                            />{" "}
                            Žanrovi
                        </Nav.Link>
                        <Nav.Link href="/admin/kategorije" as={Link} key={208}>
                            <FontAwesomeIcon
                                icon={faShapes}
                                className="fa-icon"
                            />{" "}
                            Kategorije
                        </Nav.Link>
                        <Nav.Link href="/admin/gradovi" as={Link} key={209}>
                            <FontAwesomeIcon
                                icon={faCity}
                                className="fa-icon"
                            />{" "}
                            Gradovi
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </aside>
        </>
    );
}
export default AdminSidebar;
