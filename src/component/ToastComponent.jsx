import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toast } from "react-bootstrap";
export default function ToastComponent() {
  const { isError, isSuccess, errorMessage } = useSelector(
    (state) => state.auth
  );
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isError || isSuccess) {
      setShow(true);
    }
  }, [isError, isSuccess]);
  return (
    <Toast
      bg={isSuccess ? "success" : "danger"}
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Body className="text-white">
        {(isSuccess && "Login Success") || (isError && `${errorMessage}`)}
      </Toast.Body>
    </Toast>
  );
}
