import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyPageEditModal(props) {

  let jwtToken = localStorage.getItem("jwtToken");
  let niname = localStorage.getItem("nickname");
  // console.log(props.userInfo);
  const [updateNick, setUpdateNick] = useState({
    nickname: niname,
  });
  console.log(updateNick.nickname);

  // 카카오로그인 시
  const access_token = localStorage.getItem("access_token");

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{fontSize:"20px", fontWeight:"600"}}>
          내 정보 수정
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {access_token == null ? (
          <div style={{display:"table-caption"}}>
            <div>Email<input disabled size={57} style={{marginTop:"5px", marginBottom:"5px"}} value={props.userInfo.userEmail}/></div>
            <div>Nickname<input size={57} style={{marginTop:"5px", marginBottom:"5px"}} onChange={(e) => setUpdateNick(prevState => ({...prevState, nickname: e.target.value}))} value={updateNick.nickname} /></div>
          </div>
        ) : (
          <div style={{display:"table-caption"}}>
            <div>Email<input disabled size={57} style={{marginTop:"5px", marginBottom:"5px"}} value="카카오를 이용한 계정은 수정할 수 없습니다."/></div>
            <div>Nickname<input disabled size={57} style={{marginTop:"5px", marginBottom:"5px"}} value="카카오를 이용한 계정은 수정할 수 없습니다."/></div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>닫기</Button>
        {access_token == null ? (
          <Button onClick={() => {
            let confirm = window.confirm("수정하시겠습니까?");
            if (confirm == false) return;

            axios.post(`${process.env.REACT_APP_URL}/myPage/${props.userInfo.userId}`, {nickname:updateNick.nickname},  
            { headers: { Authorization: `Bearer ${jwtToken}`}})
            .then((res) => {
                // console.log(res.data);
                window.alert("닉네임이 수정되었습니다.");
                localStorage.setItem("nickname", updateNick.nickname);
                props.myPageInfo();
                props.onHide();
            })
            .catch((e) => {
                if (e.response && e.response.status === 500){
                  alert("이미 존재하는 닉네임입니다.");
                }
            });
        }}>수정</Button>  
        ) : (null)}
      </Modal.Footer>
    </Modal>
  );
}

export default MyPageEditModal;