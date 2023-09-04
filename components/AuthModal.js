import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";

function AuthModal() {
  dispatch = useDispatch();
  return (
    <div>
      <Modal 
      open={isOpen} 
      onClose={() => dispatch(closeCommentModal())}>
        <div>
          <h2>Log in to Summarist</h2>
          <h3>Login as Guest</h3>
          <h3>or</h3>
          <h3>Login with Google</h3>
          <input />
          <input />
          <button>Login</button>
          <button>Forgot your password</button>
          <button>Don't have an account </button>
        </div>
      </Modal>
    </div>
  );
}

export default AuthModal;
