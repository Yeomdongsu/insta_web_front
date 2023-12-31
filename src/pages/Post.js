import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

function Post({ imageUrl, caption }) {

  return (
    <div className="post">
        {/* <FontAwesomeIcon icon={faEllipsis} style={{ float:"right", height:"20px", margin:"7px 10px 7px", cursor:"pointer"}} /> */}
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic" style={{float:"right", border:"none", width:"30px"}}></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              let confirm = window.confirm("게시글을 수정하시겠습니까?");
              if (confirm == true){
                window.alert("수정되었습니다.");
              }
            }}>글 수정</Dropdown.Item>
            <Dropdown.Item onClick={() => {
              let confirm = window.confirm("게시글을 삭제하시겠습니까?");
              if (confirm == true){
                window.alert("삭제되었습니다.");
              }
            }}>글 삭제</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <img src={imageUrl} alt="포스트 이미지" className="post-image" />
        <p className="post-caption">{caption}</p>
    </div>
  );
}

export default Post;