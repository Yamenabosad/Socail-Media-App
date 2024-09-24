import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useDispatch, useSelector } from "react-redux";

import { closeModal } from "../../store/modalSlice";
import { deletePost, getAllPosts } from "../../store/post/postActions";

export default function ConfirmDelete() {
  const { isOpen, postId } = useSelector((state) => state.modal);
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const deletePostClicked = (postId) => {
    dispatch(deletePost({ id: postId, userToken: userToken }))
    .then(() => {
      dispatch(closeModal());
      dispatch(getAllPosts());
    })
    
  };


  return (
    <>
      <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex gap-3 align-items-center justify-content-center">
            Are You Sure
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer className="d-flex gap-3 align-items-center justify-content-center">
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deletePostClicked(postId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
33;
