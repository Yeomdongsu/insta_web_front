import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyPageEditModal(props) {
  return (
    <Modal
      {...props}
    //   size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{fontSize:"20px", fontWeight:"600"}}>
          내 정보 수정
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{display:"table-caption"}}>
            <div>Email<input disabled size={57} style={{marginTop:"5px", marginBottom:"5px"}}/></div>
            <div>Nickname<input size={57} style={{marginTop:"5px", marginBottom:"5px"}}/></div>
            <div>비밀번호<input size={57} style={{marginTop:"5px", marginBottom:"5px"}}/></div>
            <div>비밀번호 확인<input size={57} style={{marginTop:"5px", marginBottom:"5px"}}/></div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>닫기</Button>
        <Button onClick={() => {
            window.alert("미완성"); props.onHide();
            // let confirm = window.confirm("수정하시겠습니까?");
            // if (confirm == true){
            //     props.onHide();
            // } 
        }}>수정</Button>  
      </Modal.Footer>
    </Modal>
  );
}

export default MyPageEditModal;