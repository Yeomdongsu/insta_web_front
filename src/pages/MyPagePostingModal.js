import axios from 'axios';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyPagePostingModal(props) {
    const jwtToken = localStorage.getItem("jwtToken");

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
      if (file == null || postContent == ""){
        return alert("사진과 내용 모두 입력하세요.");
      }

      let confirm = window.confirm("작성하시겠습니까?");
      if (confirm == true){
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("content", postContent);

        axios.post("https://dpj8rail59.execute-api.ap-northeast-2.amazonaws.com/posting", formData, 
        { headers: { Authorization: `Bearer ${jwtToken}`}}) 
        .then((res) => {
            console.log(res.data);
        })
        .catch((e) => {
            console.log(e);
        });
      }

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
                <Form.Control type="file" accept='image/*' onChange={handleFileChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{fontWeight:"600"}}>게시글 내용을 작성하세요.</Form.Label>
                <Form.Control as="textarea" rows={2} onChange={handlePostContentChange}/>
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>닫기</Button>
        <Button onClick={handlePostSubmit}>작성</Button>  
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default MyPagePostingModal;