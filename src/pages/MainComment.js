import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";

function MainComment(props) {

  let [comment, setComment] = useState("");

  return (
    <div>
        <input size={47} style={{marginTop:"5px", marginBottom:"5px"}} onChange={(e) => setComment(e.target.value)} />
        <Button variant="dark" style={{width:"60px", height:"35px", margin:"0 0 4px 5px", padding:"5px"}} onClick={() => {
            if (comment == "") return window.alert("내용을 입력해주세요."); 
            
            // let confirm = window.confirm("작성하시겠습니까?");
            // if (confirm == true){
                
                axios.post(`${process.env.REACT_APP_URL}/comment/${props.postId}`, 
                { postComment: comment }, { headers: { Authorization: `Bearer ${props.jwtToken}`}})
                .then((res) => {
                  console.log(res);
                  props.fetchData();
                })
                .catch((e) => console.log(e));

                // window.alert("작성되었습니다."); 
                props.setCommentModal(!props.commentModal);
            // }
        }}>작성</Button>
    </div>
  );
}

export default MainComment;