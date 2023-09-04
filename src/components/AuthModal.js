import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeCommentModal, closeLogInModal } from "@/redux/modalSlice";

function AuthModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.logInModalOpen);

  return (
    <div>
      <Modal open={isOpen} onClose={() => dispatch(closeLogInModal())}>
        <div
          className="w-[90%] h-[600px] 
        bg-black text-white md:w-[560px] md:h-[660px] 
         border border-gray-700 rounded-lg flex justify-center"
        >
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
