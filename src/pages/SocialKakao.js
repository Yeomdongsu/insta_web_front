import axios from "axios";
import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router-dom";

const SocialKakao =()=>{

    const nav = useNavigate();

    const kakaoClientId = process.env.REACT_APP_KAKAO_API_KEY;

    const kakaoOnSuccess = async (data)=>{
        console.log(data.profile.properties);
        const access_token = data.response.access_token;  // 엑세스 토큰 백엔드로 전달
    
        localStorage.setItem("access_token", access_token);

        // let confirm = window.confirm("카카오 계정으로 회원가입 하시겠습니까?");
        // if (confirm == false) return;

        axios.post(`${process.env.REACT_APP_URL}/user/kakao/register`, {nickname:data.profile.properties.nickname})
        .then((res) => {
            console.log(res.data);
            if (res.data.nickname != null){
                // let confirm = window.confirm("이미 가입된 계정입니다. 로그인 하시겠습니까?");
                // if (confirm == false) return;

                const jwtToken = res.data.access_token;
                localStorage.setItem("jwtToken", jwtToken);
                localStorage.setItem("nickname", res.data.nickname);
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("image", data.profile.properties.thumbnail_image);
                // alert("로그인 성공!");
                nav("/main");
            } else if (res.data.nickname == null){
                // let confirm = window.confirm("카카오 계정으로 회원가입 되셨습니다. 로그인 하시겠습니까?");
                // if (confirm == false) return;

                const jwtToken = res.data.access_token;
                localStorage.setItem("jwtToken", jwtToken);
                localStorage.setItem("nickname", data.profile.properties.nickname);
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("image", data.profile.properties.thumbnail_image);
                // alert("로그인 성공!");
                nav("/main");
            }
        })
        .catch((e) => console.log(e));
    }

    const kakaoOnFailure = (error) => {
        console.log(error);
    };

    return(
        <>
            <KakaoLogin
                token={kakaoClientId}
                onSuccess={kakaoOnSuccess}
                onFail={kakaoOnFailure}
                style={{
                    backgroundColor: "#fee500",
                    border: "1px solid #fee500",
                    borderRadius: "50px",
                    color: "#3c1e1e",
                    display: "inline-block",
                    fontSize: "15px",
                    fontWeight: "900",
                    lineHeight: "40px",
                    textAlign: "center",
                    textDecoration: "none",
                    cursor: "pointer",
                    padding: "0 20px",
                    width:"360px",
                    marginTop:"10px",
                }}
            >카카오 계정으로 로그인</KakaoLogin>
        </>
    )
}

export default SocialKakao;
