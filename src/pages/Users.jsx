import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://tarmeezacademy.com/api/v1/users?limit=100")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <Container className="mx-10 mt-3">
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          rowGap: "15px",
        }}
      >
        {users.map((user, idx) => {
          const usernameFirstLetter = user.username.charAt(0).toUpperCase();
          return (
            <Card
              key={idx}
              style={{ width: "15rem", display: "flex", alignItems: "center" }}
            >
              {typeof user.profile_image === "string" && user.profile_image ? (
                <Card.Img
                  style={{ width: "100px", height: "120px" }}
                  src={user.profile_image}
                  thumbnail="true"
                />
              ) : (
                <div
                  className="userFirstStyle"
                  style={{ width: "100px", height: "120px" }}
                >
                  {usernameFirstLetter}
                </div>
              )}
              <Card.Body>
                <Card.Text>Username : {user.username}</Card.Text>
                <Card.Text>Name : {user.name}</Card.Text>
                <Card.Text>Comments : {user.comments_count}</Card.Text>
                <Card.Text>posts : {user.posts_count}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
        {error && <div>Error: {error.message}</div>}
      </div>
    </Container>
  );
}

export default Users;
