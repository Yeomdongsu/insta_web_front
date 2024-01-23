import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../css/Main2.css";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Main2(props){

    const nav = useNavigate();
    // console.log(props.userList);
    return (
        <div style={{width:"100%"}}>
            <div className="div_fix">
                <h4 style={{ margin:"0 0 20px 0", color:"red"}}>회원님을 위한 추천</h4>
                {
                    props.userList.map((user, i) => {
                        return (
                            <div className="recommend" key={i}>
                                <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"23px"}}/>
                                <span className="user_id" style={{cursor:"pointer"}} onClick={() => nav(`/myPage/${user.id}`)}>{user.nickname}</span>
                                <span style={{color:"blue", fontSize:"15px"}} onClick={() => {
                                    let confirm = window.confirm("팔로우 하시겠습니까?");
                                    if (confirm == false) return;
                
                                    axios.post(`${process.env.REACT_APP_URL}/follow/${user.id}`,
                                    {}, { headers: { Authorization: `Bearer ${props.jwtToken}`}})
                                    .then((res) => {
                                      console.log(res.data);
                                      props.fetchDataMain2();
                                      props.fetchData();
                                    })
                                    .catch((e) => alert(e.response.data.error));
                                }}>팔로우</span>
                            </div>
                        );
                    })
                }                  
            </div>
        </div>
    );
}

export default Main2;