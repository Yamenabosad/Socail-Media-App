import { Container } from "react-bootstrap";
import NavbarComponent from "./component/NavbarComponent";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Container>
        <NavbarComponent />
      </Container>
      <Outlet />
    </>
  );
}

export default App;
