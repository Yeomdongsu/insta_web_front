import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../css/Main.css";
import { faComment, faFaceSmile, faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown, faCircleUser, faHashtag, faHeartCircleCheck,} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Main2 from "./Main2";
import Header from "./Header";
import { useEffect, useState } from "react";
import MainComment from "./MainComment";
import LikeList from "./LikeList";
import axios from "axios";

function Main(){

    const nav = useNavigate();
    let [commentModal, setCommentModal] = useState(false);
    let [likeList, setLikeList] = useState(false);

    let [postList, setPostList] = useState([]);
    // console.log(postList);

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData(){
        axios.get("https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/posting?offset=0&limit=25")
        .then((res) => {
            // console.log(res.data.items);
            const postData = res.data.items.map(item => ({
                postId: item.postId,
                imageUrl: item.imageUrl,
                content: item.content,
                userId: item.userId,
                nickname: item.nickname,
                createdAt: item.createdAt,
                favoriteCnt: item.favoriteCnt,
                isFavorite: item.isFavorite,
            }));
            setPostList(postData);
        })
        .catch((e) => {
            alert(e.response.data.error);
        });
    }

    return (
        <>
            <Header />
            <main className="container wrap">
                <Main2 />   
                {
                    postList.map((post, i) => {
                        return (
                            <div className="feed_board" key={i}>
                            <article className="feed">
                                <div className="new_poster">
                                    <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"23px"}}/>
                                    <span href="#n" className="poster_id txt_id">{post.nickname}</span>
                                    <FontAwesomeIcon icon={faCaretDown} style={{fontSize:"20px", cursor:"pointer"}}/>
                                </div>

                                <section className="feed_imgs">
                                    <div style={{textAlign:"center", height:"500px", borderTop:"px solid lightgray"}}><img src={post.imageUrl} /></div>
                                </section>       
                                    <div className="interactions">
                                        <div className="my_emotion">
                                            {post.isFavorite == 0 ? (
                                                <FontAwesomeIcon icon={faHeart} style={{fontSize:"22px", paddingRight:"12px", cursor:"pointer"}} onClick={() => {
                                                    axios.post(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/favorite/${post.postId}`)
                                                    .then((res) => {console.log(res.data.result); fetchData();})
                                                    .catch((e) => alert(e.response.data.error));
                                                }}/>
                                            ) : (
                                                <FontAwesomeIcon icon={faHeartCircleCheck} style={{fontSize:"22px", paddingRight:"12px", cursor:"pointer"}} onClick={() => {
                                                    axios.delete(`https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/favorite/${post.postId}`)
                                                    .then((res) => {console.log(res.data.result); fetchData();})
                                                    .catch((e) => alert(e.response.data.error));
                                                }}/>
                                            )}
                                            
                                            <FontAwesomeIcon icon={faComment} style={{fontSize:"22px", cursor:"pointer"}}/>
                                        </div>
                                    </div>
                                    
                                    {/* 좋아요 부분 */}
                                    <p style={{paddingLeft:"17px", marginBottom:"5px", marginTop:"10px"}}>
                                        <FontAwesomeIcon icon={faFaceSmile} style={{width:"20px", paddingRight:"5px"}}/>
                                        {post.favoriteCnt == 0 ? (
                                            <span className="like_num txt_id">좋아요 {post.favoriteCnt}개</span>
                                        ) : (
                                            <span className="like_num txt_id" onClick={() => setLikeList(!likeList)}>{post.favoriteCnt}명이 좋아합니다.</span>
                                        )}
                                        {likeList && <LikeList show={likeList} onHide={() => setLikeList(!likeList)}/>}
                                    </p>
                                
                                {/* 게시글 내용 부분 */}
                                <section className="feed_txt">   
                                    <span href="#n" className="txt_id">{post.nickname}</span>
                                    <span>{post.content}</span>
                                    {/* <div style={{paddingTop:"5px"}}><FontAwesomeIcon icon={faHashtag} style={{marginRight:"5px"}}/><span style={{color:"blue", fontWeight:"500"}}>ddsada</span></div>     */}
                                </section>

                                {/* 댓글 부분 */}
                                {/* <div className="comments">
                                    <div id="listComment" className="list_comment">
                                        <p className="txt_comment">
                                            <span>
                                                <span href="#n" className="txt_id">follow ID</span>
                                                <span>나는 냥냥</span>
                                            </span>
                                        </p>
                                    </div>
                                    <form id="post" className="post_comment">
                                        <FontAwesomeIcon icon={faUser} style={{fontSize:"18px", paddingRight:"7px"}}/>
                                        <div style={{cursor:"pointer", fontSize:"15px", color:"gray"}} onClick={() => setCommentModal(!commentModal)}>댓글 달기...</div>
                                    </form> 
                                    {commentModal && <MainComment commentModal={commentModal} setCommentModal={setCommentModal}/>}
                                </div> */}
                            </article>
                        </div>

                        );
                    })
                }
                
            </main>
        </>
    );
}

export default Main;