import { useRouter } from "next/router";

import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import {useNavigate} from "react/"
import {
  closeCommentModal,
  closeLogInModal,
  openSignUpModal,
} from "@/redux/modalSlice";
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { setUser } from "@/redux/userSlice";

function AuthModal() {
  const router = useRouter();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const isOpen = useSelector((state) => state.modals.logInModalOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      //handle redux actions
      dispatch(
        setUser({
          email: currentUser.email,
        })
      );
    });

    return unsubscribe;
  }, []);
  async function handleSignIn() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (location.pathname === "/") {
        router.push("/for-you");
      }
      // router.reload();
      dispatch(closeLogInModal());
    } catch (e) {
      console.error(e);
      alert("An error occurred: " + e.message);
    }
  }
  async function handleGoogleSignIn() {
    const user = "";
    
    try {
      const result = signInWithPopup(auth, provider);
      const user = result.user;
      // router.reload();
      dispatch(closeLogInModal());
      router.push("/for-you");

    } catch (e) {
      console.error(e);
      alert("An error occurred: " + e.message);
    }
    if (user) {
      router.push("/for-you");
      if (location.pathname === "/") {
      }
    }
  }
  async function handleTestSignUp() {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      "testuser@test.com",
      "123456"
    );
    router.push("/for-you");
    // router.reload();
    dispatch(closeLogInModal());
  }
  return (
    <div>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeLogInModal())}
      >
        <div
          className="w-[60%] h-[400px] 
        bg-white text-black md:w-[400px] md:h-[520px] 
         border border-gray-700 rounded-lg flex flex-col text-center justify-center"
        >
          <div className="p-[24px] flex flex-col space-y-5 ">
            <h2 className="text-lg font-bold text-[#032b41] mb-[24px]">
              Log in to Summarist
            </h2>
            <div className="bg-[#3a579d] flex items-center cursor-pointer p-1 rounded-md">
              {" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 p-1 rounded-md h-10 text-white"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
              </svg>
              <h3 className="ml-20 text-white " onClick={handleTestSignUp}>
                Login as Guest
              </h3>
            </div>
            <h3>or</h3>
            <div className=" bg-[#4285f4] flex items-center cursor-pointer p-1 rounded-md">
              <img
                src="/assets/google.png"
                className="w-9 bg-white p-1 rounded-md"
              />
              <h3
                className="ml-20 text-white rounded-md"
                onClick={handleGoogleSignIn}
              >
                Login with Google
              </h3>
            </div>
            <input
              className="w-[100%] h-[36px] border-2 border-solid boder-gray-300 rounded-md p-3"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <input
              className="w-[100%] h-[36px] border-2 border-solid boder-gray-300 rounded-md p-3"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-[100%] bg-[#2bd97c] h-[40px] rounded-md"
              onClick={handleSignIn}
            >
              Login
            </button>
            <button className="w-[100%]">Forgot your password</button>
            <button
              className="w-[100%]"
              onClick={() => {
                dispatch(openSignUpModal());
                dispatch(closeLogInModal());
              }}
            >
              Don't have an account{" "}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AuthModal;
