import { AppBar, Button, Container, Toolbar } from "@mui/material";
import Link from "next/link";

function AdminNav() {
    return (
        <div className="admin-root-div">
            <AppBar>
                <Container maxWidth="lg">
                    <Toolbar disableGutters className="admin-toolbar">
                        <Button color="inherit">
                            <Link href="/admin">Pocetna</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/admin/tekstovi">Tekstovi</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/admin/repertoari">Repertoari</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/admin/predstave">Predstave</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/admin/zanrovi">Zanrovi</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/admin/tagovi">Tagovi</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/admin/autori">Autori</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/admin/festivali">Festivali</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/admin/pozorista">Pozorista</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/admin/kategorije">Kategorije</Link>
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default AdminNav;
