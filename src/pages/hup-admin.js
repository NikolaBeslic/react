import AdminLogin from "../components/admin/AdminLogin";
import AdminNav from "../components/admin/header/adminnav";
import AdminLayout from "../layouts/AdminLayout";

const HuPAdminPage = () => {

    return <>
        <AdminLayout>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <p>HuP Admin</p>
                    <AdminLogin></AdminLogin>
                </div>
                <div className="col-md-1"></div>
            </div>
        </AdminLayout>
    </>
}

export default HuPAdminPage;