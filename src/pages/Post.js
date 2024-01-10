import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import "./../css/PostList.css";
import PostDetailModal from './PostDetailModal';

function Post({ imageUrl, caption, postingId }) {

  const [showModal, setShowModal] = useState(false);

  function updatePost(){
    let confirm = window.confirm("게시글을 수정하시겠습니까?");
    if (confirm == true){
      window.alert("수정되었습니다.");
    } 
  }

  function deletePost(){
    let confirm = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirm == true){
      window.alert("삭제되었습니다.");
    } 
  }

  return (
    <div className="post">
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic" style={{float:"right", border:"none", width:"30px"}}></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={updatePost}>글 수정</Dropdown.Item>
            <Dropdown.Item onClick={deletePost}>글 삭제</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <img src={imageUrl} alt="포스트 이미지" className="post-image" onClick={() => setShowModal(!showModal)}/>
        <p className="post-caption">{caption}</p>
        {showModal && <PostDetailModal show={showModal} onHide={() => setShowModal(false)} postingId={postingId}/>}
    </div>
  );
}

export default Post;