import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost, getAllPosts } from "../../store/post/postActions";
import { closeModal } from "../../store/modalSlice";

export default function EditPost() {
  const { isOpen, postId } = useSelector((state) => state.modal);
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Initialize state
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
    image: null,
  });

  // Update inputData whenever postId changes
  useEffect(() => {
    if (postId) {
      setInputData({
        title: postId.title || "",
        body: postId.body || "",
        image: null,
      });
    }
  }, [postId]);

  // Handle edit post action
  function handleEditPost() {
    dispatch(
      editPost({
        id: postId.id,
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
        console.error("Error editing post:", err); // Log any errors
      });
  }

  return (
    <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <Form.Control
            placeholder="Title"
            value={inputData.title}
            onChange={(e) =>
              setInputData({ ...inputData, title: e.target.value })
            }
          />
        </InputGroup>
        <InputGroup className="mt-2">
          <Form.Control
            placeholder="Body"
            value={inputData.body}
            onChange={(e) =>
              setInputData({ ...inputData, body: e.target.value })
            }
          />
        </InputGroup>
        <InputGroup className="mt-2">
          <Form.Control
            type="file"
            accept="image/*"
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
          disabled={!inputData.body} // Disable button if body is empty
          onClick={handleEditPost}
        >
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
