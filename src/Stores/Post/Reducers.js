import INITIAL_STATE from "./InitialState";
import _ from "lodash";
import { postsRoutine } from "../../Sagas/posts";

import { ADD, GET_POST, LOADING, GET_POST_ASYNCH } from "./Types";
export function reducer(state = _.cloneDeep(INITIAL_STATE), action) {
  const newState = { ...state };
  console.log("newState", newState);
  switch (action.type) {
    case ADD:
      newState.posts.push({
        id: action.payload.id,
        title: action.payload.title,
      });
      return newState;
    case LOADING:
      newState.loading = action.payload;
      return newState;
    case GET_POST:
      // Object.values(newState.posts).push({
      //   posts: action.payload.posts,
      // });
      // Object.assign(newState.posts,action.payload.posts)
      newState.posts.push({ posts: action.payload.posts });
      return newState;
    case GET_POST_ASYNCH:
      newState.posts.push({ posts: action.payload.posts });
      return newState;
    case postsRoutine.REQUEST:
      newState.posts = [];
      newState.hasError = false;
      newState.status= 'loading';
      newState.errorMessage = false;
      return newState;
    case postsRoutine.SUCCESS:
      newState.status = 'success';
      newState.posts.push({ posts: action.payload.posts });
      return newState;
    case postsRoutine.FAILURE:
      newState.posts = [];
      newState.hasError = true;
      // newState.errorMessage = action.payload.error;
      return newState;
    // case postsRoutine.FULFILL:
    //   newState.posts.push({ posts: action.payload.posts });
    //   return newState;
    default:
      return state;
  }
}
