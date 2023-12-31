import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../css/Main2.css";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

function Main2(){
    return (
        <div style={{width:"100%"}}>
            <div className="div_fix">
                <h4 style={{ margin:"0 0 20px 0", color:"red"}}>회원님을 위한 추천</h4>
                <div className="recommend">
                    <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"23px"}}/>
                    <span className="user_id">회원 13223</span>
                    <span style={{color:"blue", fontSize:"15px"}} onClick={() => {
                        let confirm = window.confirm("팔로우 하시겠습니까?");
                        if (confirm == true){
                            
                        }
                    }}>팔로우</span>
                </div>
                <div className="recommend">
                    <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"23px"}}/>
                    <span className="user_id">회원 1322323</span>
                    <span style={{color:"blue", fontSize:"15px"}}>팔로우</span>
                </div>
                <div className="recommend">
                    <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"23px"}}/>
                    <span className="user_id">회원 1332378223</span>
                    <span style={{color:"blue", fontSize:"15px"}}>팔로우</span>
                </div>
                <div className="recommend">
                    <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"23px"}}/>
                    <span className="user_id">회원 1332378223</span>
                    <span style={{color:"blue", fontSize:"15px"}}>팔로우</span>
                </div>       
            </div>
        </div>
    );
}

export default Main2;