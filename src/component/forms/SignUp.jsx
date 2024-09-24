import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../store/auth/authActions";
import { closeModal } from "../../store/modalSlice";

import lock from "../../assets/lock.svg";
import eye from "../../assets/eye.svg";
import eye_slash from "../../assets/eye-slash.svg";
import person from "../../assets/person.svg";
import email from "../../assets/email.svg";

export default function SignUp() {
  const { isOpen } = useSelector((state) => state.modal);
  const { loading, isSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);
  const [inputData, setInputData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    image: null,
  });

  // Handle closing the modal after successful signup
  useEffect(() => {
    if (isSuccess) {
      dispatch(closeModal());
    }
  }, [isSuccess, dispatch]);

  function clickSignUpButton() {
    const formData = new FormData();
    formData.append("username", inputData.username);
    formData.append("name", inputData.name);
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);

    // Append image file if selected
    if (inputData.image) {
      formData.append("image", inputData.image);
    }

    // Dispatch the sign-up action with the form data
    dispatch(signUpUser(formData));
  }

  return (
    <>
      <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              <img src={person} alt="username icon" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={inputData.username}
              onChange={(e) =>
                setInputData({ ...inputData, username: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup className="mt-2">
            <Form.Control
              placeholder="Name"
              aria-label="Name"
              value={inputData.name}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup className="mt-2">
            <InputGroup.Text id="basic-addon1">
              <img src={email} alt="email icon" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Email"
              aria-label="Email"
              value={inputData.email}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup className="mt-2">
            <InputGroup.Text id="basic-addon1">
              <img src={lock} alt="password icon" />
            </InputGroup.Text>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={inputData.password}
              onChange={(e) =>
                setInputData({ ...inputData, password: e.target.value })
              }
            />
            <InputGroup.Text
              id="basic-addon1"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <img src={eye} alt="show password" />
              ) : (
                <img src={eye_slash} alt="hide password" />
              )}
            </InputGroup.Text>
          </InputGroup>

          <InputGroup className="mt-2">
            <Form.Control
              type="file"
              ref={fileInputRef}
              onChange={(e) =>
                setInputData({ ...inputData, image: e.target.files[0] })
              }
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={
              inputData.username === "" ||
              inputData.name === "" ||
              inputData.email === "" ||
              inputData.password === "" ||
              loading
            }
            onClick={clickSignUpButton}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
