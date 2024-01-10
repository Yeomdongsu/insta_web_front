import React, { useState, useEffect } from 'react';
import { Badge, Button, Image, Modal } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './../css/PostDetailModal.css'; // CSS 파일을 import
import axios from 'axios';

function PostDetailModal({ show, onHide, postingId }) {
  const [modalEntered, setModalEntered] = useState(false);

  const jwtToken = localStorage.getItem("jwtToken");
  const [detailPostInfo, setDetailPostInfo] = useState({});
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    // 모달이 열릴 때 애니메이션을 위해 modalEntered 상태 변경
    setModalEntered(show);
    detailPost();
  }, [show]);

  function detailPost(){
    axios.get(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/posting/${postingId}`, 
        { headers: { Authorization: `Bearer ${jwtToken}`}})
        .then((res) => {
            let data = {...res.data.post[0]};
            setDetailPostInfo(data);

            if (res.data.tag.length == 0){
                return;
            }

            const formattedTags = res.data.tag.map((tag) => ` ${tag} `)
            setTagList(formattedTags);
        })
        .catch((e) => {
            console.log(e.response.data.error);
        });
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
    //   size="lg"
      style={{width:"500px", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    //   centered
      backdrop="static"
      className="post-detail-modal"
    >
      <CSSTransition
        in={modalEntered}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div>
          <Modal.Header closeButton>
            <Modal.Title style={{fontSize:"21px", fontWeight:"600"}}>게시글 상세보기</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* 이미지 표시 */}
            <div style={{textAlign:"center"}}>
                <Image src={detailPostInfo.imageUrl} style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px'}}/>
            </div>
            {/* 닉네임, 작성일 및 내용 표시 */}
            <div className="post-info">
              <span className="nickname">{detailPostInfo.nickname}</span>
              <span className="created-at">{detailPostInfo.createdAt}</span>
              <p className="post-content">{detailPostInfo.content}</p>
            </div>

            {/* 태그 표시 */}
              {tagList.length == 0 ? (<div>태그가 존재하지 않는 포스팅입니다.</div>) : 
              (<div className="tag-list">
                {tagList.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="tag">
                        {tag}
                    </Badge>))}
                </div>)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={onHide}>닫기</Button>
        </Modal.Footer>
        </div>
      </CSSTransition>
    </Modal>
  );
}

export default PostDetailModal;
