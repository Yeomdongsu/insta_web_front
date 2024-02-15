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
    const image = localStorage.getItem("image");

    // 카카오로그인 시
    const access_token = localStorage.getItem("access_token");

    return (
        <header>
            <div className="wrap">
                <div className="search">
                    <div>
                        <FontAwesomeIcon icon={faInstagram} style={{fontSize:"35px", cursor:"pointer"}} onClick={() => nav("/main")}/>
                        <span style={{fontSize:"23px", fontWeight:"400", padding:"10px", cursor:"pointer"}} onClick={() => nav("/main")}>Dongsutagram</span>
                    </div>
                </div>
                <nav className="gnb">
                    <ul>
                        {/* <FontAwesomeIcon icon={faHeart} style={{fontSize:"25px", paddingRight:"20px", cursor:"pointer"}}/> */}
                        <FontAwesomeIcon icon={faUser} style={{fontSize:"25px", paddingRight:"20px", cursor:"pointer"}} onClick={() => nav(`/myPage/${userId}`)}/>
                    </ul>
                </nav>

                {access_token == null ? (
                    <div style={{marginLeft:"3px"}}>
                        <span style={{color:"blue", cursor:"pointer"}} onClick={() => nav(`/myPage/${userId}`)}>{myNickname}</span>님 환영합니다.
                        <div style={{color : "red", textAlign:"center", cursor:"pointer"}} onClick={() => {
                            let confirm = window.confirm("로그아웃 하시겠습니까?");
                            if (confirm == true){
                                axios.delete(`${process.env.REACT_APP_URL}/user/logout`,
                                { headers: { Authorization: `Bearer ${jwtToken}`}})
                                .then((res) => {
                                    localStorage.clear();
                                    // alert("로그아웃 되셨습니다.");
                                    nav("/");
                                })
                                .catch((e) => console.log(e));
                            }
                        }}>로그아웃</div>
                    </div>
                ) : (
                    <div style={{marginLeft:"3px"}}>
                        <img src={image} style={{width:"30px", paddingRight:"4px", paddingBottom:"3px", cursor:"pointer"}} onClick={() => window.alert("카카오톡 프로필 사진입니다.")}/>
                        {/* <img src={process.env.PUBLIC_URL + '/kakao.png'} style={{width:"30px", paddingRight:"4px", paddingBottom:"3px"}}/> */}
                        <span style={{color:"blue", cursor:"pointer"}} onClick={() => nav(`/myPage/${userId}`)}>{myNickname}</span>님 환영합니다.
                        <div style={{color : "red", textAlign:"center", cursor:"pointer"}} onClick={() => {
                            let confirm = window.confirm("로그아웃 하시겠습니까?");
                            if (confirm == true){
                                axios.post(`https://kapi.kakao.com/v1/user/unlink`, {}, { headers: {Authorization: `Bearer ${access_token}`}})
                                .then((res) => {
                                    // console.log(res);
                                    localStorage.clear();
                                    // alert("로그아웃 되셨습니다.");
                                    nav("/");
                                })
                                .catch((e) => console.log(e));
                            }
                        }}>로그아웃</div>
                    </div>
                )}
                
            </div>
        </header>
    );
}

export default Header;