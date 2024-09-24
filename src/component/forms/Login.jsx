import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth/authActions";

import { closeModal } from "../../store/modalSlice";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import lock from "../../assets/lock.svg";
import eye from "../../assets/eye.svg";
import eye_slash from "../../assets/eye-slash.svg";
import person from "../../assets/person.svg";

export default function LogIn() {
  const {isOpen} = useSelector((state) => state.modal);
  const { loading, isSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const closeModelHandler = () => {
    dispatch(closeModal());
  };
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function clickLogInButton() {
    dispatch(loginUser(inputData));
    
  }
  useEffect(() => {
    if (isSuccess) {
      dispatch(closeModal()); // Close modal if login is successful
    }
  }, [isSuccess, dispatch]);
  return (
    <>
      <Modal show={isOpen} onHide={closeModelHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              <img src={person} alt="" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={inputData.username}
              onChange={(e) => {
                setInputData({ ...inputData, username: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mt-2">
            <InputGroup.Text id="basic-addon1">
              <img src={lock} alt="" />
            </InputGroup.Text>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={inputData.password}
              onChange={(e) => {
                setInputData({ ...inputData, password: e.target.value });
              }}
            />
            <InputGroup.Text
              id="basic-addon1"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <img src={eye} alt="" />
              ) : (
                <img src={eye_slash} alt="" />
              )}
            </InputGroup.Text>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModelHandler}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={
              inputData.username === "" || inputData.password === "" || loading
            }
            onClick={clickLogInButton}
          >
            {loading ? "loading..." : "Login"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
