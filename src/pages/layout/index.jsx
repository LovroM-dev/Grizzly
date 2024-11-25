import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div>
 
            <nav style={{ background: "#f8f8f8", padding: "10px" }}>
                <ul style={{ listStyle: "none", display: "flex", gap: "20px" }}>
                    <li>
                        <Link to="/workout-preview">Workout</Link>
                    </li>
                    <li>
                        <Link to="/user">User</Link>
                    </li>
                    <li>
                        <Link to="/user">User</Link>
                    </li>
                    <li>
                        <Link to="/exercises">Exercises</Link>
                    </li>
                </ul>
            </nav>

 
            <div style={{ padding: "20px" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
