import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../css/Header.css";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header(){

    const nav = useNavigate();
    const jwtToken = localStorage.getItem("jwtToken");
    let myNickname = localStorage.getItem("nickname");
    let userId = localStorage.getItem("id");

    return (
        <header>
            <div className="wrap">
                <div className="search">
                    <div>
                        <FontAwesomeIcon icon={faInstagram} style={{fontSize:"35px", cursor:"pointer"}} onClick={() => nav("/main")}/>
                        <span style={{fontSize:"23px", fontWeight:"400", padding:"10px"}}>Dongsutagram</span>
                    </div>
                </div>
                <nav className="gnb">
                    <ul>
                        <FontAwesomeIcon icon={faHeart} style={{fontSize:"25px", paddingRight:"20px", cursor:"pointer"}}/>
                        <FontAwesomeIcon icon={faUser} style={{fontSize:"25px", paddingRight:"20px", cursor:"pointer"}} onClick={() => nav(`/myPage/${userId}`)}/>
                    </ul>
                </nav>

                <div style={{marginLeft:"3px"}}>
                    <span style={{color:"blue"}}>{myNickname}</span>님 환영합니다.
                    <div style={{color : "red", textAlign:"center"}} onClick={() => {
                        let confirm = window.confirm("로그아웃 하시겠습니까?");
                        if (confirm == true){
                            axios.delete("https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/user/logout",
                            { headers: { Authorization: `Bearer ${jwtToken}`}})
                            .then((res) => {
                                localStorage.clear();
                                alert("로그아웃 되셨습니다.");
                                nav("/");
                            })
                            .catch((e) => console.log(e));
                        }
                    }}>로그아웃</div>
                </div>
            </div>
        </header>
    );
}

export default Header;