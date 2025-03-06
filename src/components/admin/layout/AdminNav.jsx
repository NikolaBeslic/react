import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    Toolbar,
} from "@mui/material";
import Link from "next/link";

function AdminNav() {
    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
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
                            <Link href="/admin/autori">Autori</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/admin/festivali">Festivali</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/admin/pozorista">Pozorista</Link>
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default AdminNav;
