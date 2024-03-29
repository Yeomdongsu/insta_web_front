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
import PostDetailModal from './PostDetailModal';

function MyPage(props) {

    let {userId} = useParams();
    
    const nav = useNavigate();
    const jwtToken = localStorage.getItem("jwtToken");
    const myId = localStorage.getItem("id");

    const [editModal, setEditModal] = useState(false);
    const [postingModal, setPostingModal] = useState(false);

    const [follower, setFollow] = useState(false);
    let [myFollowerList, setMyFollowerList] = useState([]);

    const [following, setFollowing] = useState(false);
    let [myFollowingList, setMyFollowingList] = useState([]);

    const [userInfo, setUserInfo] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (jwtToken == null) return nav("/");

        myPageInfo();
        setLoading(false);
    }, [userId, myFollowerList, myFollowingList]);

    function myPageInfo(){
        axios.get(`${process.env.REACT_APP_URL}/myPage/${userId}`, 
        { headers: { Authorization: `Bearer ${jwtToken}`}})
        .then((res) => {
            // console.log(res.data.items);
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

    function followerList(){
        axios.get(`${process.env.REACT_APP_URL}/follower/${userId}`,
        { headers: { Authorization: `Bearer ${jwtToken}`}}) 
        .then((res) => {
            console.log(res.data.followers);
            const followData = res.data.followers.map(user => ({
                id: user.id,
                nickname: user.nickname,
                isFollow: user.isFollow,
            }))
            setMyFollowerList(followData);
        })
        .catch((e) => {
            console.log(e);
        });
    }
    
    function followingList(){
        axios.get(`${process.env.REACT_APP_URL}/followee/${userId}`,
        { headers: { Authorization: `Bearer ${jwtToken}`}}) 
        .then((res) => {
            console.log(res.data.following);
            const followingData = res.data.following.map(user => ({
                id: user.id,
                nickname: user.nickname,
            }))
            setMyFollowingList(followingData);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return (
        <>
            <Header />
            {loading ? (
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <img src={process.env.PUBLIC_URL + '/loading.gif'} alt="로딩 중" style={{ width:"500px", height:"500px" }} />
                    </div>
                ) : (
                <div className="my-page">
                    <div className="profile">
                        <FontAwesomeIcon icon={faCircleUser} className='profile-image'/>
                        {/* 사용자 통계 */}
                        <div>
                            <span style={{fontWeight:"600", fontSize:"20px", color:"#007bff"}}>{userInfo.length > 0 && userInfo[0].userNickname}</span>의 게시물
                            <div className="user-stats">
                                <div style={{padding:"25px 35px 35px 25px"}}>
                                    <strong>게시물</strong>
                                    <p>{userInfo.length > 0 && userInfo[0].postingCnt}</p>
                                </div>
                                <div style={{padding:"25px 35px 35px 25px", cursor:"pointer"}} onClick={() => {followerList(); setFollow(!follower);}}>
                                    <strong>팔로워</strong>
                                    <p>{userInfo.length > 0 && userInfo[0].followersCnt}</p>
                                </div>
                                {follower && <Follower show={follower} onHide={() => setFollow(!follower)} myFollowerList={myFollowerList} followerList={followerList} userId={userId}/>}
                                <div style={{padding:"25px 35px 35px 25px", cursor:"pointer"}} onClick={() => {followingList(); setFollowing(!following);}}>
                                    <strong>팔로잉</strong>
                                    <p>{userInfo.length > 0 && userInfo[0].followingCnt}</p>
                                </div>
                                {following && <Following show={following} onHide={() => setFollowing(!following)} myFollowingList={myFollowingList} followingList={followingList} userId={userId}/>}
                            </div>
                        </div>
                        {myId === userId && 
                        <div style={{paddingLeft:"28px", paddingTop:"18px"}}>
                            <div style={{background:"lightgray", padding:"10px", marginLeft:"15px", fontSize:"15px", cursor:"pointer"}} onClick={() => setEditModal(!editModal)}>내정보 수정</div>
                            {editModal && <MyPageEditModal show={editModal} onHide={() => setEditModal(!editModal)} userInfo={userInfo[0]} setUserInfo={setUserInfo} myPageInfo={myPageInfo}/>}
                            <div style={{background:"black", color:"white", padding:"10px", marginLeft:"15px", fontSize:"15px", cursor:"pointer", textAlign:"center", marginTop:"10px"}} onClick={() => setPostingModal(!postingModal)}>글쓰기</div>
                            {postingModal && <MyPagePostingModal show={postingModal} onHide={() => setPostingModal(!postingModal)} myPageInfo={myPageInfo}/>}
                        </div>
                        }
                    </div>
                    <div className="posts">
                        <PostList userInfo={userInfo} myPageInfo={myPageInfo}/>
                    </div>
                </div>    
            )}
        </>
    );
}

export default MyPage;