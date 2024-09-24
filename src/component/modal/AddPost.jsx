

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, getAllPosts } from "../../store/post/postActions";

import { closeModal } from "../../store/modalSlice";

export default function AddPost() {
  const { isOpen } = useSelector((state) => state.modal);
  const { userToken } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({
    title: "",
    body: "",
    image: null,
  });

  function clickAddPostButton() {
    dispatch(
      addNewPost({
        title: inputData.title,
        body: inputData.body,
        image: inputData.image,
        userToken,
      })
    )
      .then(() => {
        dispatch(closeModal());
        dispatch(getAllPosts());
      })
      .catch((err) => {
        console.error("Error add post:", err);
      });
  }

  return (
    <>
      <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <Form.Control
              placeholder="Title"
              value={inputData.title}
              onChange={(e) => {
                setInputData({ ...inputData, title: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mt-2">
            <Form.Control
              placeholder="body"
              value={inputData.body}
              onChange={(e) => {
                setInputData({ ...inputData, body: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mt-2">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                setInputData({ ...inputData, image: e.target.files[0] });
              }}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={inputData.body === ""}
            onClick={clickAddPostButton}
          >
            {isLoading ? "Loading..." : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
