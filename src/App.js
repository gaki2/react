import React from 'react';
import './style.css';
import { combineReducers, createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

function reducer(state, action) {
  if (state === undefined) {
    return {
      number: 0,
    };
  }
  const newState = { ...state };
  switch (action.type) {
    case "INCREASE":
      newState.number += 1;
      return newState
    case "DECREASE":
      newState.number -= 1;
      return newState
    default:
      return newState;
  }
}

function colorreducer(state, action) {
  if (state === undefined) {
    return {
      color: "black",
    }
  }
  const newState = {...state};

  switch (action.type) {
    case "CHANGE":
      newState.color = "yellow";
      return newState;
    case "BACK":
      newState.color = "black";
      return newState;
    default:
      return newState;
  }
}

const configurestore = combineReducers({
  colorreducer, reducer
})

const store = createStore(configurestore);

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <DisplayNumber />
        <Button></Button>
        <DisplayColor />
      </div>
    </Provider>
  );
}

function DisplayNumber() {
  const number = useSelector((state) => state.reducer.number);
  return <h1>{number}</h1>;
}

function Button() {
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={() => dispatch({type: "INCREASE"})}>+</button>
      <button onClick={() => dispatch({type: "DECREASE"})}>-</button>
      <button onClick={() => dispatch({type: "CHANGE"})}>Change</button>
      <button onClick={() => dispatch({type: "BACK"})}>Back</button>
    </>
  )
}

function DisplayColor() {
  const color = useSelector((state) => state.colorreducer.color)
  return <div style={{width: "300px", height: "300px", background: `${color}`}}></div>
}
