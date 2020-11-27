import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import {
  ADD,
  GET_POST,
  GET_POST_ASYNCH,
  GET_POST_ASYNCHSAGA,
  LOADING,
} from "./Types";

export const add = (id: any, postTitle: string) => ({
  type: ADD,
  payload: {
    id,
    title: postTitle,
  },
});
export const getPostsAsynch = (posts: any) => ({
  type: GET_POST,
  payload: {
    posts: posts,
  },
});

// export const getPostsAsynchSaga = (
//   posts: any
//   // hasLoading: boolean,
//   // hasError: boolean,
//   // errorMessage:any
// ) => ({
//   type: GET_POST_ASYNCHSAGA,
//   payload: {
//     posts: posts,
//     // hasLoadingPosts: hasLoading ? hasLoading : false,
//     // hasError: hasError ? hasError : false,
//     // errorMessage:errorMessage
//   },
// });

// const routinePostsPayload = {
//   trigger: (payload) => ({
//     ...payload,
//     hasError: false,
//     hasLoadingPosts: false,
//     errorMessage: false,
//   }), // we may use payload creator to extend payload
//   // request: ({ id }) => ({ id }), // or to filter its values
//   success: (payload) => ({ ...payload, data: parseData(payload.data) }), // or to change payload on the fly
//   failure: (payload) => ({
//     errorMessage: parseError(payload.error),
//     error: true,
//   }), // or to do all of these at once
// };

export const loading = (value: boolean) => {
  return { type: LOADING, payload: value };
};

export const getPostThunk = (url: string) => {
  return (dispatch: Dispatch) => {
    dispatch(loading(true));
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          dispatch(loading(false));
          dispatch(getPostsAsynch(response));
        }, 2000);
      });
  };
};

export const fetchPosts = createAsyncThunk(GET_POST_ASYNCH, async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response;
});
