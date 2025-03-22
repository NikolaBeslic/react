import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";

import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import TypeSpecimenOutlinedIcon from "@mui/icons-material/TypeSpecimenOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PodcastsOutlinedIcon from "@mui/icons-material/PodcastsOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import GrainOutlinedIcon from "@mui/icons-material/GrainOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { useState } from "react";
import Link from "next/link";

function AdminSidebar() {
    const drawerWidth = 240; // Full width
    const miniDrawerWidth = 60; // Collapsed width

    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [listOpen, setListOpen] = useState(true);

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: open ? drawerWidth : miniDrawerWidth,
                transition: "width 0.3s ease",
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: open ? drawerWidth : miniDrawerWidth,
                    transition: "width 0.3s ease",
                    boxSizing: "border-box",
                    overflowX: "hidden",
                },
            }}
        >
            <Toolbar />

            <List>
                <ListItem
                    component={Link}
                    href="/admin/hupkast"
                    key={991}
                    disablePadding
                >
                    <ListItemButton title="HuPkast">
                        <ListItemIcon>
                            <PodcastsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="HuPkast" />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    component={Link}
                    href="/admin/hupikon"
                    key={992}
                    disablePadding
                >
                    <ListItemButton title="HuPikon">
                        <ListItemIcon>
                            <SaveAsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="HuPikon" />
                    </ListItemButton>
                </ListItem>

                <ListItem
                    component={Link}
                    href="/admin/tekstovi"
                    key={993}
                    disablePadding
                >
                    <ListItemButton title="Ostali tekstovi">
                        <ListItemIcon>
                            <GrainOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ostali tekstovi" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem
                    component={Link}
                    href="/admin/statistika"
                    key={993}
                    disablePadding
                >
                    <ListItemButton title="Statistika">
                        <ListItemIcon>
                            <BarChartOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Statistika" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem
                    key={996}
                    disablePadding
                    component={Link}
                    href="/admin/tagovi"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <StyleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tagovi" />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    key={997}
                    disablePadding
                    component={Link}
                    href="/admin/zanrovi"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <TypeSpecimenOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Žanrovi" />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    key={998}
                    disablePadding
                    component={Link}
                    href="/admin/kategorije"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <CategoryOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Kategorije" />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    key={999}
                    disablePadding
                    component={Link}
                    href="/admin/gradovi"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <LocationCityOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gradovi" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={toggleDrawer}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Toolbar>
        </Drawer>
    );
}
export default AdminSidebar;
