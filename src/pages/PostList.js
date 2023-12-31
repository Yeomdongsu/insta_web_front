import React from 'react';
import Post from './Post'; // 각 포스트를 나타내는 컴포넌트
import "./../css/PostList.css";

function PostList() {
  // 가상의 포스트 데이터
  const posts = [
    {
        id: 1,
        imageUrl: 'https://placekitten.com/300/200',
        caption: '이것은 첫 번째 포스트입니다.',
    },
    {
        id: 2,
        imageUrl: 'https://placekitten.com/300/201',
        caption: '이것은 두 번째 포스트입니다.',
    },
    {
        id: 3,
        imageUrl: 'https://placekitten.com/300/202',
        caption: '이것은 두 번째 포스트입니다.',
    },  
    {
        id: 4,
        imageUrl: 'https://placekitten.com/300/204',
        caption: '이것은 두 번째 포스트입니다.',
    },  
    // 추가 포스트 데이터...
  ];

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} imageUrl={post.imageUrl} caption={post.caption} />
      ))}
    </div>
  );
}

export default PostList;
