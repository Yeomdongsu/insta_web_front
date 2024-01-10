import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function Following(props) {

  const nav = useNavigate();
  let jwtToken = localStorage.getItem("jwtToken");
  let myId = localStorage.getItem("id");

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{fontSize:"20px", fontWeight:"600"}}>
          Following
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          props.myFollowingList.map((following, i) => {
            return (
              <div style={{marginBottom:"15px", display:"flex", alignItems:"center"}} key={i}>
                  <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"30px"}}/>
                  <span style={{margin:"0 10px 0 30px", fontSize:"17px", flex:"1", textAlign:"center"}} onClick={() => {nav(`/myPage/${following.id}`); props.onHide();}}>{following.nickname}</span>
                  <span style={{color:"red", fontSize:"15px", cursor:"pointer"}} onClick={() => {
                    if (props.userId != myId){
                      return alert("본인 계정만 가능합니다.");
                    }

                    let confirm = window.confirm("팔로잉을 취소 하시겠습니까?");
                    if (confirm == false) return;
                    
                    axios.delete(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/follow/${following.id}`,
                    { headers: { Authorization: `Bearer ${jwtToken}`}})
                    .then((res) => {
                      props.followingList();
                    })
                    .catch((e) => console.log(e.response.data.error));
                  }}>팔로잉</span>
              </div>
            );
          })
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Following;