import { AnyAction, bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { INCREMENT, MULTIPLICATE } from "./Types";
import { RootState } from "../../app/store";
import { increment, multiple } from "./Actions";

function CounterWithConnect(props: any) {
  console.log("props", props);

  console.log("valueInitial", props.initialValue);
  const [valueplus, setValueplus] = React.useState('0');
  const [valueper, setValueper] = React.useState('0');
  console.log("valueplus", valueplus);
  console.log("valueper", valueper);

  return (
    <React.Fragment>
      <div>
        <input
          placeholder="incrementa il contatore"
          onChange={(e) => {
            setValueplus(e.target.value);
          }}
        />
        <button
          onClick={() => {
            props.increment(valueplus);
          }}
        >
          PlusButton
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            props.multiple(valueper);
          }}
        >
          IncrementButton
        </button>
        <input
          placeholder="moltiplica il contatore il contatore"
          onChange={(e) => {
            setValueper(e.target.value);
          }}
        />
      </div>
      <div>{props.initialValue}</div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: RootState) => ({
  initialValue: state.Counter.value,
});
const actionFunction = (dispatch: Dispatch) => {
  return {
    increment: () => dispatch(increment()),
    multiple: () => dispatch(multiple()),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ increment, multiple }, dispatch);
};

const actionsToDispatch = { increment, multiple };
const Counter = connect(
  mapStateToProps,
  actionsToDispatch
)(CounterWithConnect as any);
export default Counter;
