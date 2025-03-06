import React from "react";
import AdminNav from "../components/admin/layout/AdminNav";
import { Toaster } from "react-hot-toast";
import { Box, Toolbar } from "@mui/material";
import AdminSidebar from "../components/admin/layout/AdminSidebar";
import AdminHeader from "../components/admin/layout/AdminHeader";

const AdminLayout = ({ children }) => {
    return (
        <>
            <AdminHeader metaTitle="Početna" />
            <div className="admin-root-div">
                {/* Admin specific header */}
                <Box sx={{ display: "flex" }}>
                    <AdminNav />
                    <AdminSidebar />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Toolbar />
                        {children}
                    </Box>
                </Box>
                {/* <Container sx={{ flexGrow: 1, pt: 10 }}>{children}</Container> */}
                <Toaster position="bottom-center" reverseOrder={false} />
                <footer>Admin Footer</footer>
            </div>
        </>
    );
};

export default AdminLayout;
