import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faSackDollar} from "@fortawesome/free-solid-svg-icons"
import "./Header.css"

const Header = () =>{
    return(
        <header className="header_container">
            <FontAwesomeIcon icon={faSackDollar} size="2x" color="#7af1a7"/>
            <h2>My Finances</h2>
        </header>
    )
}

export default Header