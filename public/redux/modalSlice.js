import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpModalOpen: false,
  logInModalOpen: false,
  commentModalOpen: false,

  commentTweetDetails: {
    id: null,
    tweet: null,
    photoUrl: null,
    username: null,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModalOpen = false;
    },
    openLogInModal: (state) => {
      state.logInModalOpen = true;
    },
    closeLogInModal: (state) => {
      state.logInModalOpen = false;
    },
    openCommentModal: (state) => {
      state.commentModalOpen = true;
    },
    closeCommentModal: (state) => {
      state.commentModalOpen = false;
    },
    setCommentTweet: (state, action) => {
      state.commentTweetDetails.name = action.payload.name;
      state.commentTweetDetails.username = action.payload.username;
      state.commentTweetDetails.id = action.payload.id;
      state.commentTweetDetails.photoUrl = action.payload.photoUrl;
      state.commentTweetDetails.tweet = action.payload.tweet;
    },
  },
});

export const {
  openSignUpModal,
  closeSignUpModal,
  openLogInModal,
  closeLogInModal,
  openCommentModal,
  closeCommentModal,
  setCommentTweet,
} = modalSlice.actions;

export default modalSlice.reducer;