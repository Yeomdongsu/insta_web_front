import { useState } from "react";
import "./../css/Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(){

    const nav = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUp(!isSignUp);
    };

    // 회원가입 관련
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        password: '',
        retype_password: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };
    
    function register(){
        if (formData.nickname == "" || formData.email == "" || formData.password == "" || formData.retype_password == "") return window.alert("모두 입력하세요.");
        
        if (formData.password.length < 4 || formData.password.length > 14) return window.alert("비밀번호 길이는 4글자 이상 ~ 14글자 이하로 해주세요.");

        if (formData.password != formData.retype_password) return window.alert("입력한 비밀번호와 비밀번호 확인이 다릅니다.");

        axios.post("https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/user/register", formData)
        .then((res) => {
            alert("회원가입 성공!");
            setFormData({
                nickname: '',
                email: '',
                password: '',
                retype_password: ''
            });
            handleSignUpClick();
        })
        .catch((e) => {
            if (e.response && e.response.status === 500){
                window.alert("닉네임이나 이메일이 이미 존재합니다.");
            } else if(e.response && e.response.status === 400){
                window.alert("이메일 형식을 올바르게 적어주세요.");
            }
        })
    }

    // 로그인 관련
    const [formData2, setFormData2] = useState({
        email: '',
        password: '',
    });
    
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setFormData2((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    // 로그인
    function userLogin(){
        if (formData2.email == "" || formData2.password == "") return window.alert("모두 입력하세요.");

        axios.post("https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/user/login", formData2, { headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
            const jwtToken = res.data.access_token;
            localStorage.setItem("jwtToken", jwtToken);
            localStorage.setItem("nickname", res.data.nickname);
            localStorage.setItem("id", res.data.id);
            alert("로그인 성공!");
            nav("/main");
        })
        .catch((e) => {
            alert(e.response.data.error);
        })
    }
    
    return (
        <div className="formContainer">
            <div className={`signin ${isSignUp ? 'moveup' : ''}`}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    userLogin();
                }}>
                    <div className="logo">
                        <FontAwesomeIcon icon={faCircleUser}/>
                    </div>
                    <div className="input-group">
                        <input type="email" placeholder="Email" name="email" value={formData2.email} onChange={handleChange2} />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" name="password" value={formData2.password} onChange={handleChange2} />
                    </div>
                    <button type="submit">로그인</button>
                </form>
                <a href="#" id={`${isSignUp ? 'signup' : 'signin'}`} onClick={handleSignUpClick}>
                    {isSignUp ? '로그인' : '회원가입'}
                </a>
            </div>

            <div className={`signup ${isSignUp ? 'moveup' : ''}`}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    register();
                }}>
                    <div className="logo">
                        <FontAwesomeIcon icon={faCircleUser} />
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="Nickname" name="nickname" value={formData.nickname} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Retype-Password" name="retype_password" value={formData.retype_password} onChange={handleChange} />
                    </div>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </div>
    );
}

export default Login;