import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../css/Main.css";
import { faComment, faFaceSmile, faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown, faCircleUser, faHashtag,} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Main2 from "./Main2";
import Header from "./Header";
import { useState } from "react";
import MainComment from "./MainComment";
import LikeList from "./LikeList";

function Main(){

    const nav = useNavigate();
    let [commentModal, setCommentModal] = useState(false);
    let [likeList, setLikeList] = useState(false);

    return (
        <>
            <Header />
            <main className="container wrap">
                <Main2 />    

                <div className="feed_board">
                    <article className="feed">
                        <div className="new_poster">
                            <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"23px"}}/>
                            <span href="#n" className="poster_id txt_id">작성자 ID</span>
                            <FontAwesomeIcon icon={faCaretDown} style={{fontSize:"20px", cursor:"pointer"}}/>
                        </div>

                        <section className="feed_imgs">
                            <div style={{textAlign:"center", height:"500px", borderTop:"px solid lightgray"}}><img src={process.env.PUBLIC_URL + '/logo192.png'} /></div>
                        </section>       
                            <div className="interactions">
                                <div className="my_emotion">
                                    <FontAwesomeIcon icon={faHeart} style={{fontSize:"22px", paddingRight:"12px", cursor:"pointer"}}/>
                                    <FontAwesomeIcon icon={faComment} style={{fontSize:"22px", cursor:"pointer"}}/>
                                </div>
                            </div>
                            
                            {/* 좋아요 부분 */}
                            <p style={{paddingLeft:"17px", marginBottom:"5px", marginTop:"10px"}}>
                                <FontAwesomeIcon icon={faFaceSmile} style={{width:"20px", paddingRight:"5px"}}/>
                                <span href="#n" className="like_num txt_id" onClick={() => setLikeList(!likeList)}>10명</span>
                                {likeList && <LikeList show={likeList} onHide={() => setLikeList(!likeList)}/>}
                                이 좋아합니다
                            </p>
                        
                        {/* 게시글 내용 부분 */}
                        <section className="feed_txt">   
                            <span href="#n" className="txt_id">User ID</span>
                            <span>건방진 고양이. 나의 찍찍 펀치를 받아라. 건방진 고양이. 나의 찍찍 펀치를 받아라.</span>
                            <div style={{paddingTop:"5px"}}><FontAwesomeIcon icon={faHashtag} style={{marginRight:"5px"}}/><span style={{color:"blue", fontWeight:"500"}}>ddsada</span></div>    

                        </section>
                        {/* 댓글 부분 */}
                        <div className="comments">
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
                        </div>
                    </article>
                </div>
            </main>
        </>
    );
}

export default Main;