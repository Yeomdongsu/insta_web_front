import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../css/Header.css";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function Header(){

    const nav = useNavigate();

    return (
        <header>
            <div className="wrap">
                <div className="search">
                    <div>
                        <FontAwesomeIcon icon={faInstagram} style={{fontSize:"35px", cursor:"pointer"}} onClick={() => nav("/")}/>
                        <span style={{fontSize:"23px", fontWeight:"400", padding:"10px"}} onClick={() => nav("/main")}>Dongsutagram</span>
                    </div>
                </div>
                <nav className="gnb">
                    <ul>
                        <FontAwesomeIcon icon={faHeart} style={{fontSize:"25px", paddingRight:"20px", cursor:"pointer"}}/>
                        <FontAwesomeIcon icon={faUser} style={{fontSize:"25px", paddingRight:"20px", cursor:"pointer"}} onClick={() => nav("/myPage")}/>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;