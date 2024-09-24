import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SignUp from "./forms/SignUp";
import Login from "./forms/Login";
import AddPost from "./modal/AddPost";

import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../store/modalSlice";
import { clearState } from "../store/auth/authSlice";

import ToastComponent from "./ToastComponent";
import { Dropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const { componentName } = useSelector((state) => state.modal);
  const { userInfo, userToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const componentHandler = () => {
    if (componentName === "login") return <Login />;
    if (componentName === "signup") return <SignUp />;
    if (componentName === "addpost") return <AddPost />;

    return null;
  };
  const usernameFirstLetter = userInfo?.username.charAt(0).toUpperCase();
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary d-flex align-center"
        style={{ boxShadow: "0 0 1px" }}
      >
        <Container fluid>
          <Row className="d-flex justify-content-center align-items-center">
            <Col>
              <Navbar.Brand as={Link} to="/">
                Tarmezz
              </Navbar.Brand>
            </Col>
            <Col>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </Col>
            <Col>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
            </Col>
          </Row>
          {userToken ? (
            <Row>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      background: "transparent",
                      border: "none",
                      height: "50px",
                    }}
                  >
                    {typeof userInfo.profile_image === "string" &&
                    userInfo.profile_image ? (
                      <Image
                        src={userInfo.profile_image}
                        style={{ width: "40px", height: "40px" }}
                      />
                    ) : (
                      <div className="userFirstStyle">
                        {usernameFirstLetter}
                      </div>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.ItemText>@{userInfo.username}</Dropdown.ItemText>
                    <Dropdown.Item>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          dispatch(clearState());
                        }}
                      >
                        Log Out
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <Button
                  variant="success"
                  onClick={() => dispatch(openModal("login"))}
                >
                  Login
                </Button>
              </Col>
              <Col>
                <Button
                  variant="success"
                  onClick={() => dispatch(openModal("signup"))}
                >
                  SignUp
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      </Navbar>
      {userToken && (
        <Button
          variant="primary"
          className="addPost"
          onClick={() => dispatch(openModal("addpost"))}
        >
          Add
        </Button>
      )}
      {componentHandler()}
      <ToastComponent />
    </>
  );
};
export default NavbarComponent;
