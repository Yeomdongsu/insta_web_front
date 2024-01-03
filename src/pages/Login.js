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
        axios.post("https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/user/register", formData)
        .then((res) => {
            alert("회원가입 성공!");
        })
        .catch((e) => {
            alert(e.response.data.error);
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
        axios.post("https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/user/login", formData2, { headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
            const jwtToken = res.data.access_token;
            localStorage.setItem("jwtToken", jwtToken);
            localStorage.setItem("nickname", res.data.nickname);
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