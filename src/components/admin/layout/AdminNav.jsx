import { Container, Navbar, Nav, Spinner, Offcanvas } from "react-bootstrap";
import Link from "next/link";
import { useAdmin } from "../../../contexts/AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function AdminNav() {
    const { admin, adminLogout, adminLogoutLoading } = useAdmin();

    return (
        <>
            <Navbar
                bg="dark"
                variant="dark"
                expand="lg"
                className="w-100 d-flex justify-content-between"
            >
                <Container>
                    <Navbar.Toggle
                        aria-controls="admin-offcanvas"
                        className="ms-auto"
                    />

                    <Navbar.Offcanvas
                        id="admin-offcanvas"
                        aria-labelledby="admin-offcanvas-label"
                        placement="end"
                    >
                        <Offcanvas.Header
                            closeButton
                            className="admin-offcanvas-header"
                        >
                            <Offcanvas.Title id="admin-offcanvas-label">
                                Admin Panel
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body className="p-0">
                            <Nav className="admin-mobile-nav w-100">
                                <Nav.Link as={Link} href="/admin">
                                    Početna
                                </Nav.Link>

                                <Nav.Link as={Link} href="/admin/tekstovi">
                                    Tekstovi
                                </Nav.Link>

                                <Nav.Link as={Link} href="/admin/repertoari">
                                    Repertoari
                                </Nav.Link>

                                <Nav.Link as={Link} href="/admin/predstave">
                                    Predstave
                                </Nav.Link>

                                <Nav.Link as={Link} href="/admin/autori">
                                    Autori
                                </Nav.Link>

                                <Nav.Link as={Link} href="/admin/festivali">
                                    Festivali
                                </Nav.Link>

                                <Nav.Link as={Link} href="/admin/pozorista">
                                    Pozorišta
                                </Nav.Link>

                                {admin && (
                                    <Nav.Link
                                        title="Logout"
                                        onClick={adminLogout}
                                        disabled={adminLogoutLoading}
                                    >
                                        {admin?.username}{" "}
                                        {adminLogoutLoading ? (
                                            <Spinner
                                                animation="border"
                                                role="status"
                                                variant="secondary"
                                                size="sm"
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faRightFromBracket}
                                            />
                                        )}
                                    </Nav.Link>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminNav;
