import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MainCommentListModal(props) {

    // console.log(props.commentList);
    // console.log(props.postId);
    const nickname = localStorage.getItem("nickname")

    return (
      <Modal
        {...props}
        size="lr"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{fontSize:"20px", fontWeight:"600"}}>
            댓글 모두 보기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                props.commentList.map((comment, i) => {
                    return (
                        <div style={{ marginBottom: "15px", display: "flex", alignItems: "center"}} key={i}>
                            <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "60px" }} />
                            <div style={{ marginLeft: "20px" }}>
                                <span style={{ fontSize: "17px", fontWeight: "600", color:"blue" }}>{comment.nickname}</span>
                                <span style={{ marginLeft: "10px", fontSize: "14px", color: "gray" }}>{comment.createdAt}</span>
                                <p style={{ marginTop: "5px", fontSize: "15px", fontWeight:"600" }}>{comment.comment}</p>
                            </div>
                            {nickname == comment.nickname && 
                                <button style={{ fontSize: "14px", color: "red", cursor: "pointer", border: "none", background: "none", paddingBottom:"41px" }} onClick={() => {
                                    let confirm = window.confirm("삭제 하시겠습니까?");
                                    if (confirm == false) return;
                                    
                                    axios.delete(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/comment/${comment.commentId}`,
                                    { headers: { Authorization: `Bearer ${props.jwtToken}`}})
                                    .then((res) => {
                                    console.log(res.data);
                                    const updatedCommentList = props.commentList.filter((c) => c.commentId !== comment.commentId);
                                    props.setCommentList(updatedCommentList);
                                    props.fetchData();
                                    alert("삭제되었습니다.");
                                    })
                                    .catch((e) => console.log(e));
                                }}>삭제</button>
                            }
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

export default MainCommentListModal;  