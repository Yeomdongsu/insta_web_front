import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function LikeList(props) {

  const nav = useNavigate();

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
                <span style={{margin:"0 10px 0 30px", fontSize:"17px", flex:"1", textAlign:"center", cursor:"pointer"}} onClick={() => {props.onHide(); nav(`/myPage/${user.userId}`); }}>{user.nickname}</span>
                {user.isFollow == 0 ? (
                  <span style={{color:"blue", fontSize:"15px", cursor:"pointer"}} onClick={() => {
                    let confirm = window.confirm("팔로우 하시겠습니까?");
                    if (confirm == false) return;

                    axios.post(`${process.env.REACT_APP_URL}/follow/${user.userId}`,
                    {}, { headers: { Authorization: `Bearer ${props.jwtToken}`}})
                    .then((res) => {
                      console.log(res.data);

                      props.myPageInfo();
                      props.onHide();
                    })
                    .catch((e) => alert(e.response.data.error));
                  }}>팔로우</span>
                ) : (
                  <span style={{color:"red", fontSize:"15px", cursor:"pointer"}} onClick={() => {
                    let confirm = window.confirm("팔로잉을 취소 하시겠습니까?");
                    if (confirm == false) return;
                    
                    axios.delete(`${process.env.REACT_APP_URL}/follow/${user.userId}`,
                    { headers: { Authorization: `Bearer ${props.jwtToken}`}})
                    .then((res) => {
                      console.log(res.data);
                      const updatedLikeList = props.likeList.map((item) =>
                      item.userId === user.userId ? { ...item, isFollow: 0 } : item
                      );
                      props.setLikeList(updatedLikeList);

                      props.myPageInfo();
                    })
                    .catch((e) => console.log(e.response));
                  }}>팔로잉</span>
                )}
                
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