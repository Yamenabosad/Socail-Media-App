import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import {
  getComments,
  setComments,
  addComment,
} from "../../store/commentsSlice";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Image } from "react-bootstrap";
import { useEffect, useState } from "react";

import CommentLoader from "../CommentLoader";
export default function Comment() {
  const [comment, setComment] = useState("");

  const { isOpen, postId } = useSelector((state) => state.modal);
  const { comments, isLoading } = useSelector((state) => state.comment);
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handelcloseComment = () => {
    dispatch(closeModal());
    dispatch(setComments());
  };
  useEffect(() => {
    if (postId) {
      dispatch(getComments(postId));
    }
  }, [postId, dispatch]);

  const addCommentCliced = () => {
    dispatch(
      addComment({
        body: comment,
        postId: postId,
        userToken,
      })
    ).then(() => {
      dispatch(getComments(postId));
    });
  };

  return (
    <>
      <Modal show={isOpen} onHide={handelcloseComment}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <>
              <CommentLoader />
              <CommentLoader />
              <CommentLoader />
            </>
          ) : (
            <div>
              {Array.isArray(comments?.comments) &&
                comments?.comments?.map((comment, index) => {
                  const usernameFirstLetter = comment.author.username
                    ?.charAt(0)
                    .toUpperCase();

                  return (
                    <div
                      key={index}
                      className="d-flex gap-2 align-items-center border-b-1"
                    >
                      {typeof comment.author.profile_image === "string" &&
                      comment.author.profile_image ? (
                        <Image
                          src={comment.author.profile_image}
                          style={{ width: "40px", height: "40px" }}
                          thumbnail
                        />
                      ) : (
                        <div className="userFirstStyle">
                          {usernameFirstLetter}
                        </div>
                      )}
                      <div className="comment-text">
                        <div className="mb-0 fw-bold">
                          @{comment.author.username}
                        </div>
                        <div className="color-secondary">{comment.body}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Form.Control
            style={{ width: "85%" }}
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button variant="primary" onClick={addCommentCliced}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
