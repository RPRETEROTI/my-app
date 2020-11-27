import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { ADD, GET_POST, GET_POST_ASYNCH, LOADING } from "./Types";

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

export const fetchPosts = createAsyncThunk(GET_POST_ASYNCH, async() => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response;
});
