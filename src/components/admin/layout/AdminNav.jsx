import { useState } from "react";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";

function AdminNav() {
    return (
        <>
            <Navbar
                bg="dark"
                variant="dark"
                expand="lg"
                className="w-100 d-flex justify-content-between"
            >
                <Container>
                    {/*{" "}
                    <Navbar.Brand href="/admin" className="mr-2">
                        Admin Panel
                    </Navbar.Brand>{" "}
                    */}
                    <Nav className="w-100 d-flex justify-content-between">
                        <Nav.Link
                            color="inherit"
                            as={Link}
                            href="/admin"
                            key={101}
                        >
                            Početna
                        </Nav.Link>
                        <Nav.Link
                            color="inherit"
                            as={Link}
                            href="/admin/tekstovi"
                            key={102}
                        >
                            Tekstovi
                        </Nav.Link>
                        <Nav.Link
                            color="inherit"
                            as={Link}
                            href="/admin/repertoari"
                            key={107}
                        >
                            Repertoari
                        </Nav.Link>

                        <Nav.Link
                            color="inherit"
                            as={Link}
                            href="/admin/predstave"
                            key={103}
                        >
                            Predstave
                        </Nav.Link>
                        <Nav.Link
                            color="inherit"
                            as={Link}
                            href="/admin/autori"
                            key={104}
                        >
                            Autori
                        </Nav.Link>
                        <Nav.Link
                            color="inherit"
                            as={Link}
                            href="/admin/festivali"
                            key={105}
                        >
                            Festivali
                        </Nav.Link>
                        <Nav.Link
                            color="inherit"
                            as={Link}
                            href="/admin/pozorista"
                            key={106}
                        >
                            Pozorišta
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminNav;
