import AdminNav from "../components/admin/layout/AdminNav";
import { Toaster } from "react-hot-toast";
import AdminSidebar from "../components/admin/layout/AdminSidebar";
import AdminHeader from "../components/admin/layout/AdminHeader";
import { Col, Row } from "react-bootstrap";

import { AdminProvider, useAdmin } from "../contexts/AdminContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AdminLayoutInner = ({ children }) => {
    const { loading, admin } = useAdmin();
    const router = useRouter();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (!loading && !admin) {
            router.replace("/hup-admin"); //
        }
    }, [loading, admin, router]);

    if (loading) return <div className="p-3">Loading admin...</div>;
    if (!admin) return <div className="p-3">Working...</div>; // later redirect

    return (
        <div className="admin-root-div">
            <AdminNav
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
            />

            <div className="admin-layout">
                <AdminSidebar
                    collapsed={sidebarCollapsed}
                    setCollapsed={setSidebarCollapsed}
                />
                <main
                    className={`main-content ${
                        sidebarCollapsed ? "sidebar-collapsed" : ""
                    }`}
                >
                    {children}
                </main>
            </div>

            <Toaster position="bottom-center" reverseOrder={false} />
            <footer>Admin Footer</footer>
        </div>
    );
};

export default function AdminLayout({ children }) {
    return (
        <AdminProvider>
            <AdminLayoutInner>{children}</AdminLayoutInner>
        </AdminProvider>
    );
}
