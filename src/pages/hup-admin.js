import AdminLogin from "../components/admin/AdminLogin";

const HuPAdminPage = () => {
    return (
        <>
            <div className="row mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h1>HuP Admin</h1>
                    <AdminLogin></AdminLogin>
                </div>
                <div className="col-md-3"></div>
            </div>
        </>
    );
};

export default HuPAdminPage;
