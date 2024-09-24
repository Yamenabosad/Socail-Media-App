import { Button, Card, Image, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal, setPostId } from "../store/modalSlice";
import { getAllPosts } from "../store/post/postActions";
import { resetPosts } from "../store/post/postSlice";
import ConfirmDelete from "../component/modal/ConfirmDelete";
import EditPost from "./modal/EditPost";
import Comment from "./comment/Comment";
import { throttle } from "lodash";
function CardComponent(props) {
  const { userInfo } = useSelector((state) => state.auth);
  const { componentName } = useSelector((state) => state.modal);
  const { isLoading, currentPage, hasMore } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  const componentHandler = () => {
    if (componentName === "deletePost") return <ConfirmDelete />;
    if (componentName === "editPost") return <EditPost />;
    if (componentName === "comment") return <Comment />;

    return null;
  };
  useEffect(() => {
    dispatch(getAllPosts({ page: 1 }));

    return () => {
      // Reset posts when component unmounts
      dispatch(resetPosts());
    };
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 300 &&
        !isLoading &&
        hasMore
      ) {
        dispatch(getAllPosts({ page: currentPage + 1 }));
      }
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, isLoading, hasMore, currentPage]);
  return (
    <>
      {isLoading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}
      {props.data?.map((post) => {
        const usernameFirstLetter = post.author.username
          .charAt(0)
          .toUpperCase();
        return (
          <Card key={post.id} border="secondary" className="mb-3 cardComponent">
            <Card.Header className="d-flex gap-3 align-items-center justify-content-between">
              <div className="d-flex gap-3 align-items-center">
                {typeof post.author.profile_image === "string" &&
                post.author.profile_image ? (
                  <Image
                    src={post.author.profile_image}
                    style={{ width: "40px", height: "40px" }}
                  />
                ) : (
                  <div className="userFirstStyle">{usernameFirstLetter}</div>
                )}

                <div>
                  <div className="mb-0 fw-bold">@{post.author.username}</div>
                  <div className="color-secondary">{post.created_at}</div>
                </div>
              </div>
              {userInfo && userInfo.id === post.author.id && (
                <div className="d-flex gap-3 align-items-center">
                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch(setPostId(post.id));
                      dispatch(openModal("deletePost"));
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      dispatch(setPostId(post));
                      dispatch(openModal("editPost"));
                    }}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </Card.Header>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <div>{post.body}</div>
              {typeof post.image === "string" && post.image && (
                <Image src={post.image} className="w-100" />
              )}
            </Card.Body>
            <Card.Footer
              style={{ cursor: "pointer" }}
              onClick={() => {
                // {
                //   post.comments_count === 0
                //     ? dispatch(setPostId(null))
                //     : dispatch(setPostId(post.id));
                // }
                dispatch(setPostId(post.id));
                dispatch(openModal("comment"));
              }}
            >
              {post.comments_count === 0
                ? "Add New Comment"
                : `(${post.comments_count}) Comments`}
            </Card.Footer>
          </Card>
        );
      })}

      {!hasMore && <p className="text-center">No more posts to load.</p>}
      {componentHandler()}
    </>
  );
}

export default CardComponent;