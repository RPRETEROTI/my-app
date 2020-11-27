import INITIAL_STATE from "./InitialState";
import { INCREMENT, MULTIPLICATE,INCREMENT_ASYNCH } from "./Types";
import _ from "lodash";

export function reducer(state = INITIAL_STATE, action) {
  // const newState = _.cloneDeep(INITIAL_STATE);
  const newState = {...state};

  console.log("newStatec", newState);
  // const newState = INITIAL_STATE;
  switch (action.type) {
    case INCREMENT:
      newState.value = Number(newState.value) + Number(action.payload.value);
      return newState;
      case INCREMENT_ASYNCH:
        newState.value = Number(newState.value) + Number(action.payload.value);
        return newState;
    case MULTIPLICATE:
      newState.value = newState.value * +action.payload.value;
      return newState;
    default:
      return state;
  }
}
