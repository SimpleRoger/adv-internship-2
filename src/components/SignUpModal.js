import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCommentModal,
  closeSignUpModal,
  openLogInModal,
} from "@/redux/modalSlice";

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
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  async function handleSignUp() {
    try {
      setLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      dispatch(closeSignUpModal());
      router.push("/for-you");
    } catch (e) {
      console.error(e);
      setErrorMessage(e.message);
      setLoading(false);
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
          className="w-[60%] h-fit  
        bg-white text-black md:w-[400px] 
         border border-gray-700 rounded-lg flex flex-col text-center justify-center"
        >
          <div className="p-[24px] flex flex-col space-y-5 ">
            <h2 className="text-lg font-bold text-[#032b41] mb-[24px]">
              Sign Up to Summarist
            </h2>
            <h2>
              {errorMessage && (
                <p className="text-red-500 p-0 m-0">{errorMessage}</p>
              )}
            </h2>
            <div
              className=" bg-[#4285f4] flex items-center cursor-pointer p-1 rounded-md
             hover:bg-gray-500 transition  duration-300 ease-in-out"
            >
              <img
                src="/assets/google.png"
                className="w-9 bg-white p-1 rounded-md"
              />
              <h3
                className="ml-20 text-white rounded-md
             "
              >
                Login with Google
              </h3>
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
              className="w-[100%] bg-[#2bd97c] h-[40px] rounded-md
              hover:bg-gray-200 transition  duration-300 ease-in-out"
              onClick={handleSignUp}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-900 mx-auto"></div>
              ) : (
                <>Sign Up</>
              )}{" "}
            </button>
            <button className="w-[100%]">Forgot your password</button>
            <button
              className="w-[100%]"
              onClick={() => {
                dispatch(closeSignUpModal());
                dispatch(openLogInModal());
              }}
            >
              Log in{" "}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SignUpModal;
