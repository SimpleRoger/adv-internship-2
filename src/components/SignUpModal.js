import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeCommentModal, closeSignUpModal } from "@/redux/modalSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { useRouter } from "next/router";

function SignUpModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.signUpModalOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function handleSignUp() {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/for-you");
    } catch (e) {
      console.error(e);
      alert("An error occurred: " + e.message);
    }
  }
  
  return (
    <div>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeSignUpModal())}
      >
        <div
          className="w-[60%] h-[200px] 
        bg-white text-black md:w-[400px] md:h-[420px] 
         border border-gray-700 rounded-lg flex flex-col text-center justify-center"
        >
          <div className="p-[24px] flex flex-col space-y-5 ">
            <h2 className="text-lg font-bold text-[#032b41] mb-[24px]">
              Sign Up to Summarist
            </h2>
            <div className=" bg-[#4285f4] flex items-center cursor-pointer p-1 rounded-md">
              <img
                src="/assets/google.png"
                className="w-9 bg-white p-1 rounded-md"
              />
              <h3 className="ml-20 text-white rounded-md">Login with Google</h3>
            </div>
            <input
              className="w-[100%] h-[36px] border-2 border-solid boder-gray-300 rounded-md p-3"
              placeholder="Email Address"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-[100%] h-[36px] border-2 border-solid boder-gray-300 rounded-md p-3"
              placeholder="Password"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-[100%] bg-[#2bd97c] h-[40px] rounded-md"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <button className="w-[100%]">Forgot your password</button>
            <button className="w-[100%]">Don't have an account </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SignUpModal;
