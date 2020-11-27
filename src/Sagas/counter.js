import { allowedNodeEnvironmentFlags } from 'process';
import { put, takeEvery,all,call } from 'redux-saga/effects'
import { increment, multiple,incrementAsynch } from "../Stores/Counter/Actions";

export function* counter() {
  console.log("Hello Sagas!");
}
const delay = (ms) => new Promise(res => setTimeout(res, ms))
export function* incrementWorker() {
yield delay(1000);
yield put({increment})
}
export function* incrementWatcher() {
  yield call(delay(1000));
  yield takeEvery({incrementAsynch,incrementWorker})
  }
  export default function* rootSaga(){
    yield all([counter(),incrementWatcher()])
  }