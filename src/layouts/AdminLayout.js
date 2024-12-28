import React from "react";
import AdminNav from "../components/admin/header/AdminNav";
import { Toaster } from "react-hot-toast";
import { Container } from "@mui/material";

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-root-div">
            {/* Admin specific header */}
            <AdminNav />
            <Container sx={{ pt: 10 }}>{children}</Container>
            <Toaster position="bottom-center" reverseOrder={false} />
            <footer>Admin Footer</footer>
        </div>
    );
};

export default AdminLayout;
