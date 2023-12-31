import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Following(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{fontSize:"20px", fontWeight:"600"}}>
          Following
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{marginBottom:"15px"}}>
            <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"30px"}}/>
            <span style={{margin:"0 10px 0 30px", fontSize:"17px"}}>회원 1332378223</span>
            <span style={{color:"red", fontSize:"15px", marginLeft:"20px"}}>팔로우</span>
        </div>
        <div style={{marginBottom:"15px"}}>
            <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"30px"}}/>
            <span style={{margin:"0 10px 0 30px", fontSize:"17px"}}>회원 1332378223</span>
            <span style={{color:"blue", fontSize:"15px", marginLeft:"20px"}}>팔로우</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Following;