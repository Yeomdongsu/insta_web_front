import React, { useState, useEffect } from 'react';
import { Badge, Button, Image, Modal } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './../css/PostDetailModal.css'; // CSS 파일을 import
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import LikeList from './LikeList';
import MainCommentListModal from './MainCommentListModal';
import MainComment from './MainComment';

function PostDetailModal({ show, onHide, postingId, myPageInfo }) {
  const [modalEntered, setModalEntered] = useState(false);

  const jwtToken = localStorage.getItem("jwtToken");
  const [detailPostInfo, setDetailPostInfo] = useState({});
  const [tagList, setTagList] = useState([]);

  let [likeList, setLikeList] = useState([]);
  let [likeListModal, setLikeListModal] = useState(false);

  let [commentList, setCommentList] = useState([]);
  let [commentListModal, setCommentListModal] = useState(false);

  let [commentModal, setCommentModal] = useState(false);

  useEffect(() => {
    // 모달이 열릴 때 애니메이션을 위해 modalEntered 상태 변경
    setModalEntered(show);
    detailPost();
    console.log(1);
    console.log(detailPostInfo);
  }, [show, likeList]);

  function detailPost(){
    axios.get(`${process.env.REACT_APP_URL}/posting/${postingId}`, 
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
      centered
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
              <span className="created-at">{new Date(detailPostInfo.createdAt + 'Z').toLocaleString('en-US', { timeZone: 'Asia/Seoul' })}</span>
              <p className="post-content">{detailPostInfo.content}</p>
            </div>

            {/* 태그 표시 */}
            {tagList.length == 0 ? (<div style={{marginTop:"10px", color:"blue", fontSize:"15px"}}>이미지에 탐지된 물체가 없습니다.</div>) : 
            (<div className="tag-list">
              <div style={{color:"red", fontSize:"15px", fontWeight:"600", paddingBottom:"5px"}}>이미지에 탐지된 물체</div> 
              {tagList.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="tag">
                      {tag}
                  </Badge>))}
              </div>)
            }

            {/* 좋아요 아이콘, 내가 좋아요 눌렀는지 여부에 따라 바뀌는 아이콘, 좋아요의 개수, 댓글 개수까지*/}
            <div className="interactions">
              {detailPostInfo.isFavorite === 0 ? (
                <FontAwesomeIcon
                    icon={faHeart}
                    style={{ fontSize: "22px", cursor: "pointer" }}
                    onClick={() => {
                      axios.post(`${process.env.REACT_APP_URL}/favorite/${detailPostInfo.postId}`, {}, { headers: { Authorization: `Bearer ${jwtToken}`}})
                      .then((res) => {console.log(res.data.result); detailPost();})
                      .catch((e) => console.log(e));
                    }}
                />
              ) : (
                <FontAwesomeIcon
                    icon={faHeartCircleCheck}
                    style={{ fontSize: "22px", cursor: "pointer" }}
                    onClick={() => {
                      axios.delete(`${process.env.REACT_APP_URL}/favorite/${detailPostInfo.postId}`, { headers: { Authorization: `Bearer ${jwtToken}`}})
                      .then((res) => {console.log(res.data.result); detailPost();})
                      .catch((e) => alert(e.response.data.error));
                    }}
                />
              )}
              {detailPostInfo.favoriteCnt === 0 ? (
                <span className="like-num">{detailPostInfo.favoriteCnt}명이 좋아합니다.</span>
              ) : (
                <span className="like-num" style={{cursor:"pointer"}}onClick={() => {
                  axios.get(`${process.env.REACT_APP_URL}/favorite/${detailPostInfo.postId}`,
                  { headers: { Authorization: `Bearer ${jwtToken}`}})
                  .then((res) => {
                      setLikeList(res.data.like_list);
                  })
                  .catch((e) => console.log(e));
                  setLikeListModal(!likeListModal);
              }}>{detailPostInfo.favoriteCnt}명이 좋아합니다.</span>
              )}
              {likeListModal && <LikeList show={likeListModal} onHide={() => setLikeListModal(!likeListModal)} likeList={likeList} setLikeList={setLikeList} jwtToken={jwtToken} myPageInfo={myPageInfo} hide={onHide}/>}
            </div>        

            {/* 댓글 개수 표시 */}
            <div className="comment-num" style={{cursor:"pointer"}} onClick={() => {
              axios.get(`${process.env.REACT_APP_URL}/comment/${detailPostInfo.postId}`,
              { headers: { Authorization: `Bearer ${jwtToken}`}})
              .then((res) => {
                  setCommentList(res.data.commentList);
              })
              .catch((e) => console.log(e));

              setCommentListModal(!commentListModal);
            }}>댓글 {detailPostInfo.commentCnt}개 모두 보기
            </div>
            {commentListModal && <MainCommentListModal show={commentListModal} onHide={() => setCommentListModal(!commentListModal)} commentList={commentList} setCommentList={setCommentList}/>}
          
            {/* 댓글 달기 */}
            <form className="post_comment" style={{marginLeft:"10px"}}>
                <FontAwesomeIcon icon={faUser} style={{fontSize:"18px", paddingRight:"7px"}}/>
                <div style={{cursor:"pointer", fontSize:"15px", color:"gray"}} onClick={() => setCommentModal(!commentModal)}>댓글 달기...</div>
            </form> 
            {commentModal && <MainComment commentModal={commentModal} setCommentModal={setCommentModal} jwtToken={jwtToken} fetchData={detailPost} postId={detailPostInfo.postId}/>}

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
