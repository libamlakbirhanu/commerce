import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/counterSlice";
import CAN from "../casl/can";

function About() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        {CAN("decrement", "count") && (
          <button onClick={() => dispatch(decrement())}>Decrement</button>
        )}
      </div>
    </div>
  );
}

export default About;
