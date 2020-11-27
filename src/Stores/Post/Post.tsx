import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { add, getPostThunk } from "./Actions";
import { nanoid } from "nanoid";
import { postsRoutine } from "../../Sagas/posts";

export const Post: React.FC<any> = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.Posts.status);
  useEffect(() => {
    if (status === "idle") {
      dispatch(postsRoutine.request());
    }
  }, [status, dispatch]);
  const posts: any = useSelector((state: RootState) => state.Posts.posts);
  console.log("length", posts.length);

  const postR: any = posts && posts.length > 0 ? posts[0].posts : null;
  console.log("posts", posts);
  console.log("postsl", posts.length);

  const [value, setValue] = React.useState("");

  const postsToRender = postR
    ? postR.map((p: any) => <div key={p.id}>{p.title}-</div>)
    : null;

  console.log("postRendered", postsToRender);

  // React.useEffect(() => {
  //   dispatch(getPostThunk("https://jsonplaceholder.typicode.com/posts"))
  // }, [posts,dispatch]);

  return (
    <React.Fragment>
      {status === "loading" && <div>Loading...</div>}
      {posts && posts.length > 0 ? postsToRender : null}
      {posts && posts.length > 0 && console.log("postrtest", postR)}

      <button
        className="py-2"
        // thunk
        // onClick={() => {
        //   dispatch(getPostThunk("https://jsonplaceholder.typicode.com/posts"));
        // }}
        //saga
        onClick={() => {
          dispatch(postsRoutine.request());
        }}
      >
        Lancia l'api
      </button>
      <input
        onBlur={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch(add(nanoid(), value));
        }}
      >
        Aggiungi il post
      </button>
    </React.Fragment>
  );
};
