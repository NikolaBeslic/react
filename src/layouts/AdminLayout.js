import AdminNav from "../components/admin/layout/AdminNav";
import { Toaster } from "react-hot-toast";
import AdminSidebar from "../components/admin/layout/AdminSidebar";
import AdminHeader from "../components/admin/layout/AdminHeader";
import { Col, Row } from "react-bootstrap";

import { AdminProvider, useAdmin } from "../contexts/AdminContext";
import { useEffect } from "react";

export const AdminLayoutInner = ({ children }) => {
    const { loading, admin } = useAdmin();

    if (loading) return <div className="p-3">Loading admin...</div>;
    if (!admin) return <div className="p-3">Not logged in as admin.</div>; // later redirect

    return (
        <>
            <AdminHeader metaTitle="Početna" />
            <div className="admin-root-div">
                {/* Admin specific header */}

                <AdminNav />
                <Row className="flex-grow-1 no-gutters" style={{ margin: 0 }}>
                    <AdminSidebar />
                    {/* Main content area */}
                    {/* <Col xs={sidebarOpen ? 10 : 12} className="p-3"></Col> */}
                    <div className="main-content">{children}</div>
                </Row>

                <Toaster position="bottom-center" reverseOrder={false} />
                <footer>Admin Footer</footer>
            </div>
        </>
    );
};

export default function AdminLayout({ children }) {
    return (
        <AdminProvider>
            <AdminLayoutInner>{children}</AdminLayoutInner>
        </AdminProvider>
    );
}
