import { put, takeEvery, all, call } from "redux-saga/effects";
import { createRoutine } from "redux-saga-routines";
import { GET_POST_ASYNCHSAGA } from "../Stores/Post/Types";
import API from "../api/fakeapi";

export const postsRoutine = createRoutine(GET_POST_ASYNCHSAGA);

// const routinePostsPayload = {
//   trigger: (payload) => ({
//     posts:payload.data,
//     hasError: false,
//     hasLoadingPosts: false,
//     errorMessage: false,
//   }), // we may use payload creator to extend payload
//   // request: ({ id }) => ({ id }), // or to filter its values
//   success: (payload) => ({hasLoadingPosts: false,posts:payload.data}), // or to change payload on the fly
//   failure: (payload) => ({
//     errorMessage: payload.error,
//     hasError: true,

//   }), // or to do all of these at once
// };
export function* post() {
  console.log("Hello Sagas!");
}
export function* getApi() {
  return yield call(API.getPosts);
}
export function* getPostsWorker() {
  try {
    const { data } = yield call(getApi);
    console.log('data',data)
    if (data) {
      yield put(postsRoutine.success({ posts: data }));
      console.log('datadisp',data)
    }
  } catch (error) {
    yield put(postsRoutine.failure(error.message));
    console.log('error',error)
  }
}
export function* apiPostWatcher() {
  yield takeEvery(postsRoutine.REQUEST, getPostsWorker);
}

export default function* rootSaga() {
  yield all([post(), apiPostWatcher()]);
}
