import React from 'react';

const AdminLayout = ({ children }) => {
    return (
        <div>
            {/* Admin specific header */}
            <header>
                <h1>Admin Dashboard</h1>
            </header>
            <main>{children}</main>
            <footer>Admin Footer</footer>
        </div>
    );
};

export default AdminLayout;