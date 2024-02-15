import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import "./../css/PostList.css";
import PostDetailModal from './PostDetailModal';
import axios from 'axios';

function Post({ imageUrl, caption, postingId, myPageInfo }) {

  const jwtToken = localStorage.getItem("jwtToken");

  const [showModal, setShowModal] = useState(false);

  function deletePost(){
    let confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm == true){
      axios.delete(`${process.env.REACT_APP_URL}/posting/${postingId}`,  
      { headers: { Authorization: `Bearer ${jwtToken}`}})
      .then((res) => {
        // console.log(res.data);
        // window.alert("해당 글이 삭제되었습니다.");
        myPageInfo();
      })
      .catch((e) => console.log(e));
    } 
  }

  return (
    <div className="post">
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic" style={{float:"right", border:"none", width:"30px"}}></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={deletePost}>글 삭제</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <img src={imageUrl} alt="포스트 이미지" className="post-image" onClick={() => setShowModal(!showModal)}/>
        <p className="post-caption">{caption}</p>
        {showModal && <PostDetailModal show={showModal} onHide={() => setShowModal(false)} postingId={postingId} myPageInfo={myPageInfo}/>}
    </div>
  );
}

export default Post;