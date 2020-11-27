import { INCREMENT,MULTIPLICATE,INCREMENT_ASYNCH } from "./Types";

export const increment = (incrementDouble) => ({
  type: INCREMENT,
  payload: {
    value: incrementDouble,
  },
});
export const multiple = (multipleValue) => ({
  type: MULTIPLICATE,
  payload: {
    value: multipleValue,
  },
});

export const incrementAsynch = (incrementDouble) => ({
  type: INCREMENT_ASYNCH,
  payload: {
    value: incrementDouble,
  },
});
