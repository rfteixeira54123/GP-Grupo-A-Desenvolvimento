import { Outlet, Link } from "react-router-dom";

const Layout = () => {

    function formatName(user){
    return user.firstName + ' ' + user.lastName ;
    }  

    const user = {firstName: 'Karine', lastName: 'Florencio'};

    return (
        <>
        <h1> Hello, {formatName(user)}! </h1>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/ex2">Menu</Link></li>
            </ul>
        </nav>
        <Outlet />
        </>
    )
};
export default Layout;