import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../css/Main.css";
import { faComment, faFaceSmile, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCircleUser, faHeartCircleCheck, faUser,} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Main2 from "./Main2";
import Header from "./Header";
import { useEffect, useState } from "react";
import MainComment from "./MainComment";
import LikeList from "./LikeList";
import axios from "axios";
import MainCommentListModal from "./MainCommentListModal";

function Main(){

    const nav = useNavigate();
    let [commentModal, setCommentModal] = useState(false);
    let [commentListModal, setCommentListModal] = useState(false);

    let [likeList, setLikeList] = useState([]);
    let [likeListModal, setLikeListModal] = useState(false);

    let [postList, setPostList] = useState([]);
    let [userList, setUserList] = useState([]);

    let [commentList, setCommentList] = useState([]);

    const [loading, setLoading] = useState(true);

    const jwtToken = localStorage.getItem("jwtToken");

    useEffect(() => {
        if (jwtToken == null) return nav("/");
        fetchData();
        fetchDataMain2();
        console.log(1);
    }, [likeList, commentList]);

    function fetchDataMain2(){
        axios.get("https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/user/login", 
        { headers: { Authorization: `Bearer ${jwtToken}`}})
        .then((res) => {
            const userData = res.data.userList.map(user => ({
                id: user.id,
                nickname: user.nickname,
            }))
            setUserList(userData);
            
        })
        .catch((e) => {
            console.log(e.response.data.error);
        });
    }

    function fetchData(){
        axios.get("https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/posting?offset=0&limit=25", 
        { headers: { Authorization: `Bearer ${jwtToken}`}})
        .then((res) => {
            const postData = res.data.items.map(item => ({
                postId: item.postId,
                imageUrl: item.imageUrl,
                content: item.content,
                userId: item.userId,
                nickname: item.nickname,
                createdAt: item.createdAt,
                favoriteCnt: item.favoriteCnt,
                isFavorite: item.isFavorite,
                commentCnt: item.commentCnt,
            }));
            setPostList(postData);
        })
        .catch((e) => {
            console.log(e.response.data.error);
        })
        .finally(() => {setLoading(false)});
    }

    return (
        <>
            <Header/>
            <main className="container wrap">
                <Main2 fetchData={fetchData} fetchDataMain2={fetchDataMain2} userList={userList} setUserList={setUserList} jwtToken={jwtToken}/>   
                
                {loading ? (
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <img src={process.env.PUBLIC_URL + '/loading.gif'} alt="로딩 중" style={{ width:"500px", height:"500px" }} />
                    </div>
                ) : (postList.length === 0 ? (
                        <div>
                            <div style={{margin:"10px 0 10px 60px", fontWeight:"600", color:"black", fontSize:"18px"}}>팔로잉한 회원이 없거나 글이 존재하지 않습니다.</div>
                            <img src={process.env.PUBLIC_URL + '/follow_null.jpg'} style={{height:"500px"}} onClick={() => alert("멍멍")}/>
                        </div>
                    ) : (
                        postList.map((post, i) => {
                            return (
                                <div className="feed_board" key={i}>
                                <article className="feed">
                                    <div className="new_poster">
                                        <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"23px"}}/>
                                        <span className="poster_id txt_id" onClick={() => nav(`/myPage/${post.userId}`)}>{post.nickname}</span>
                                    </div>
    
                                    <section className="feed_imgs">
                                        <div style={{textAlign:"center", height:"500px", borderTop:"px solid lightgray"}}><img src={post.imageUrl}/></div>
                                    </section>       
                                        <div className="interactions">
                                            <div className="my_emotion">
                                                {post.isFavorite == 0 ? (
                                                    <FontAwesomeIcon icon={faHeart} style={{fontSize:"22px", paddingRight:"12px", cursor:"pointer"}} onClick={() => {
                                                        axios.post(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/favorite/${post.postId}`, {}, { headers: { Authorization: `Bearer ${jwtToken}`}})
                                                        .then((res) => {console.log(res.data.result); fetchData();})
                                                        .catch((e) => console.log(e));
                                                    }}/>
                                                ) : (
                                                    <FontAwesomeIcon icon={faHeartCircleCheck} style={{fontSize:"22px", paddingRight:"12px", cursor:"pointer"}} onClick={() => {
                                                        axios.delete(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/favorite/${post.postId}`, { headers: { Authorization: `Bearer ${jwtToken}`}})
                                                        .then((res) => {console.log(res.data.result); fetchData();})
                                                        .catch((e) => alert(e.response.data.error));
                                                    }}/>
                                                )}
                                                
                                                <FontAwesomeIcon icon={faComment} style={{fontSize:"22px", cursor:"pointer"}} onClick={() => {
                                                    axios.get(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/comment/${post.postId}`,
                                                    { headers: { Authorization: `Bearer ${jwtToken}`}})
                                                    .then((res) => {
                                                        setCommentList(res.data.commentList);
                                                    })
                                                    .catch((e) => console.log(e));
    
                                                    setCommentListModal(!commentListModal);
                                                }}/>
                                            </div>
                                        </div>
                                        
                                        {/* 좋아요 부분 */}
                                        <p style={{paddingLeft:"17px", marginBottom:"5px", marginTop:"10px"}}>
                                            <FontAwesomeIcon icon={faFaceSmile} style={{width:"20px", paddingRight:"5px"}}/>
                                            {post.favoriteCnt == 0 ? (
                                                <span className="like_num txt_id">좋아요 {post.favoriteCnt}개</span>
                                            ) : (
                                                <span className="like_num txt_id" onClick={() => {
                                                    axios.get(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/favorite/${post.postId}`,
                                                    { headers: { Authorization: `Bearer ${jwtToken}`}})
                                                    .then((res) => {
                                                        setLikeList(res.data.like_list);
                                                        setLikeListModal(!likeListModal);
                                                    })
                                                    .catch((e) => console.log(e));
                                                    
                                                }}>{post.favoriteCnt}명이 좋아합니다.</span>
                                            )}
                                            {likeListModal && <LikeList show={likeListModal} onHide={() => setLikeListModal(!likeListModal)} likeList={likeList} setLikeList={setLikeList} jwtToken={jwtToken} myPageInfo={fetchData} fetchDataMain2={fetchDataMain2}/>}
                                        </p>
                                    
                                    {/* 게시글 내용 부분 */}
                                    <section className="feed_txt">   
                                        <span className="txt_id" onClick={() => nav(`/myPage/${post.userId}`)}>{post.nickname}</span>
                                        <span>{post.content}</span>
                                    </section>
    
                                    {/* 댓글 부분 */}
                                    <div className="comments">
                                        <div id="listComment" className="list_comment">
                                            <p className="txt_comment">
                                                <span className="txt_id" style={{color:"gray", fontSize:"14px"}} onClick={() => {
                                                    axios.get(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/comment/${post.postId}`,
                                                    { headers: { Authorization: `Bearer ${jwtToken}`}})
                                                    .then((res) => {
                                                        setCommentList(res.data.commentList);
                                                    })
                                                    .catch((e) => console.log(e));
    
                                                    setCommentListModal(!commentListModal);
                                                }}>댓글 {post.commentCnt}개 모두 보기</span>
                                            </p>
                                            {commentListModal && <MainCommentListModal show={commentListModal} onHide={() => setCommentListModal(!commentListModal)} commentList={commentList} setCommentList={setCommentList} />}
                                        </div>
                                        <form id="post" className="post_comment">
                                            <FontAwesomeIcon icon={faUser} style={{fontSize:"18px", paddingRight:"7px"}}/>
                                            <div style={{cursor:"pointer", fontSize:"15px", color:"gray"}} onClick={() => setCommentModal(!commentModal)}>댓글 달기...</div>
                                        </form> 
                                        {commentModal && <MainComment commentModal={commentModal} setCommentModal={setCommentModal} jwtToken={jwtToken} fetchData={fetchData} postId={post.postId}/>}
                                    </div>
                                </article>
                            </div>
    
                            );
                        })
                    )
                )}
                
            </main>
        </>
    );
}

export default Main;