import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function LikeList(props) {

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
          좋아요 누른 회원
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          props.likeList.map((user, i) => {
            return (
              <div style={{marginBottom:"15px", display:"flex", alignItems:"center"}} key={i}>
                <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"30px"}}/>
                <span style={{margin:"0 10px 0 30px", fontSize:"17px", flex:"1", textAlign:"center"}}>{user.nickname}</span>
                <span style={{color:"blue", fontSize:"15px"}} onClick={() => {
                  axios.post(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/follow/${user.userId}`,
                  {}, { headers: { Authorization: `Bearer ${props.jwtToken}`}})
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((e) => alert(e.response.data.error));
                }}>팔로우</span>
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

export default LikeList;