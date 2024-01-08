import React, { useEffect, useState } from 'react';
import './../css/MyPage.css'; 
import PostList from './PostList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import MyPageEditModal from './MyPageEditModal';
import MyPagePostingModal from './MyPagePostingModal';
import Follower from './Follower';
import Following from './Following';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function MyPage(props) {

    let {userId} = useParams();
    
    const nav = useNavigate();
    const jwtToken = localStorage.getItem("jwtToken");

    const [editModal, setEditModal] = useState(false);
    const [postingModal, setPostingModal] = useState(false);

    const [follower, setFollow] = useState(false);
    const [following, setFollowing] = useState(false);

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        if (jwtToken == null) return nav("/");

        myPageInfo();
    }, []);

    function myPageInfo(){
        axios.get(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/myPage/${userId}`, 
        { headers: { Authorization: `Bearer ${jwtToken}`}})
        .then((res) => {
            console.log(res.data.items);
            const userData = res.data.items.map(user => ({
                userId: user.userId,
                userNickname: user.userNickname,
                userEmail: user.userEmail,
                postingId: user.postingId,
                imageUrl: user.imageUrl,
                content: user.content,
                createdAt: new Date(user.createdAt + 'Z').toLocaleString('en-US', { timeZone: 'Asia/Seoul' }), // 한국 시간대로 변환
                postingCnt: user.postingCnt,
                followingCnt: user.followingCnt,
                followersCnt: user.followersCnt,
            }))
            setUserInfo(userData);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return (
        <>
            <Header />
            <div className="my-page">
                <div className="profile">
                    <FontAwesomeIcon icon={faCircleUser} className='profile-image'/>
                    {/* 사용자 통계 */}
                    <div className="user-stats">
                        <div style={{padding:"35px 35px 35px 30px"}}>
                            <strong>게시물</strong>
                            <p>{userInfo.length > 0 && userInfo[0].postingCnt}</p>
                        </div>
                        <div style={{padding:"35px", cursor:"pointer"}} onClick={() => setFollow(!follower)}>
                            <strong>팔로워</strong>
                            <p>{userInfo.length > 0 && userInfo[0].followersCnt}</p>
                        </div>
                        {follower && <Follower show={follower} onHide={() => setFollow(!follower)}/>}
                        <div style={{padding:"35px", cursor:"pointer"}} onClick={() => setFollowing(!following)}>
                            <strong>팔로잉</strong>
                            <p>{userInfo.length > 0 && userInfo[0].followingCnt}</p>
                        </div>
                        {following && <Following show={following} onHide={() => setFollowing(!following)}/>}
                    </div>
                    <div style={{paddingLeft:"30px"}}>
                        <div style={{background:"lightgray", padding:"10px", marginLeft:"15px", fontSize:"15px", cursor:"pointer"}} onClick={() => setEditModal(!editModal)}>내정보 수정</div>
                        {editModal && <MyPageEditModal show={editModal} onHide={() => setEditModal(!editModal)}/>}
                        <div style={{background:"black", color:"white", padding:"10px", marginLeft:"15px", fontSize:"15px", cursor:"pointer", textAlign:"center", marginTop:"10px"}} onClick={() => setPostingModal(!postingModal)}>글쓰기</div>
                        {postingModal && <MyPagePostingModal show={postingModal} onHide={() => setPostingModal(!postingModal)}/>}
                    </div>
                </div>
                <div className="posts">
                    <PostList userInfo={userInfo} />
                </div>
            </div>
        </>
    );
}

export default MyPage;