import { Button } from "react-bootstrap";

function MainComment(props) {
  return (
    <div>
        <input size={47} style={{marginTop:"5px", marginBottom:"5px"}}/>
        <Button variant="dark" style={{width:"60px", height:"35px", margin:"0 0 4px 5px", padding:"5px"}} onClick={() => {
            let confirm = window.confirm("작성하시겠습니까?");
            if (confirm == true){
                window.alert("작성되었습니다.");
                props.setCommentModal(!props.commentModal);
            }
        }}>작성</Button>
    </div>
  );
}

export default MainComment;