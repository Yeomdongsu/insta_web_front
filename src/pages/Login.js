import { useState } from "react";
import "./../css/Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Login(){

    const nav = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUp(!isSignUp);
    };
    
    return (
        <div className="formContainer">
            <div className={`signin ${isSignUp ? 'moveup' : ''}`}>
                <form action="#">
                    <div className="logo">
                        <FontAwesomeIcon icon={faCircleUser} onClick={() => nav("/main")}/>
                    </div>
                    <div className="input-group">
                        <i className="fa fa-envelope"></i>
                        <input type="email" placeholder="Email" />
                    </div>

                    <div className="input-group">
                        <i className="fa fa-unlock-alt"></i>
                        <input type="password" placeholder="Password" />
                    </div>
                    <button type="submit" >로그인</button>
                </form>
                <a href="#" id={`${isSignUp ? 'signup' : 'signin'}`} onClick={handleSignUpClick}>
                    {isSignUp ? '로그인' : '회원가입'}
                </a>
            </div>

            <div className={`signup ${isSignUp ? 'moveup' : ''}`}>
                <form action="#">
                    <div className="logo">
                        <FontAwesomeIcon icon={faCircleUser} />
                    </div>
                    <div className="input-group">
                        <i className="fa fa-user"></i>
                        <input type="text" placeholder="Nickname" />
                    </div>

                    <div className="input-group">
                        <i className="fa fa-envelope"></i>
                        <input type="text" placeholder="Email" />
                    </div>

                    <div className="input-group">
                        <i className="fa fa-unlock-alt"></i>
                        <input type="password" placeholder="Password" />
                    </div>
                    <div className="input-group">
                        <i className="fa fa-unlock-alt"></i>
                        <input type="password" placeholder="Retype-Password" />
                    </div>

                    <button type="submit">회원가입</button>
                </form>
            </div>
        </div>
    );
}

export default Login;