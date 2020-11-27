import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { add, getPostThunk } from "./Actions";
import { nanoid } from "nanoid";
import { isEqual } from "lodash";


export const Post: React.FC<any> = () => {
  const posts: any = useSelector((state: RootState) => state.Posts.posts);
  const postR: any = posts && posts.length > 0 && posts[0].posts;
  console.log("posts", posts);
  console.log("postsl", posts.length);
  //  const postsArray=Object.entries(posts).map(key=>[Number(key),posts[Number(key)]])
  // //  const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];
  //  console.log("posts1", posts);

  // console.log("posts", postsArray);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("");
  // console.log('postx',Object.values(posts))

  const postsToRender = postR
    ? postR.map((p: any) => <div key={p.id}>{p.title}-</div>)
    : null;

  console.log("postRendered", postsToRender);

  // React.useEffect(() => {
  //   dispatch(getPostThunk("https://jsonplaceholder.typicode.com/posts"))
  // }, [posts,dispatch]);

  return (

    <React.Fragment>
      {posts && posts.length > 0 && postsToRender}
      <button
        className="py-2"
        onClick={() => {
          dispatch(getPostThunk("https://jsonplaceholder.typicode.com/posts"));
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
