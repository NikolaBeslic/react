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
                        <Button
                            color="inherit"
                            component={Link}
                            href="/admin"
                            prefetch
                        >
                            Početna
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            href="/admin/tekstovi"
                            prefetch
                        >
                            Tekstovi
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            href="/admin/repertoari"
                            prefetch
                        >
                            Repertoari
                        </Button>

                        <Button
                            color="inherit"
                            component={Link}
                            href="/admin/predstave"
                            prefetch
                        >
                            Predstave
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            href="/admin/autori"
                            prefetch
                        >
                            Autori
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            href="/admin/festivali"
                            prefetch
                        >
                            Festivali
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            href="/admin/pozorista"
                            prefetch
                        >
                            Pozorišta
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default AdminNav;
