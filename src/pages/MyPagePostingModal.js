import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyPagePostingModal(props) {
    const [postContent, setPostContent] = useState('');
    const [file, setFile] = useState(null);
  
    const handlePostContentChange = (e) => {
      setPostContent(e.target.value);
    };
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };
  
    const handlePostSubmit = () => {
      console.log('Content:', postContent);
      console.log('File:', file);
  
      // 여기에 실제 게시글을 서버에 업로드하는 로직을 추가하세요.
  
      props.onHide();
    };

  return (
    <>
      <Modal
      {...props}
    //   size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{fontSize:"20px", fontWeight:"600"}}>
          게시글 작성
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label style={{fontWeight:"600"}}>사진을 선택해주세요.</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{fontWeight:"600"}}>게시글 내용을 작성하세요.</Form.Label>
                <Form.Control as="textarea" rows={2} />
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>닫기</Button>
        <Button onClick={() => {
            let confirm = window.confirm("작성하시겠습니까?");
            if (confirm == true){
                props.onHide();
            } 
        }}>작성</Button>  
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default MyPagePostingModal;