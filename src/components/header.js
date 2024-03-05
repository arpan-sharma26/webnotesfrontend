import {Link, NavLink} from "react-router-dom";
import logo from "../../src/logo.svg";

function Header(){
    return(
        <header>

            <Link to="/" className="logo">
            <img src={logo} alt="ReactJS"/>Notes
            </Link>

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>

            
        </header>
    )
}

export default Header;