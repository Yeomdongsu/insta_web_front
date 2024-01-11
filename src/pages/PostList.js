import React from 'react';
import Post from './Post'; // 각 포스트를 나타내는 컴포넌트
import "./../css/PostList.css";

function PostList(props) {
  return (
    <div className="post-list">
      {
        props.userInfo && props.userInfo.length > 0 && props.userInfo[0].postingId === -1 ? (
          <div style={{fontWeight:"700", color:"blue"}}>작성한 글이 없습니다.</div>
        ) : (
          props.userInfo.map((post, i) => (
            <Post key={i} imageUrl={post.imageUrl} caption={post.content} postingId={post.postingId} myPageInfo={props.myPageInfo}/>
          ))
        ) 
      }
    </div>
  );
}

export default PostList;
