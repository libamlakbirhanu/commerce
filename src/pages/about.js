import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/counterSlice";
import CAN from "../casl/can";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN, USER } from "../graphql/queries";
import { user } from "../store";

const changeEmail = () => {
  user({
    ...user(),
    email: "libe@libe.com",
  });
};

function About() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // const { data } = useQuery(IS_LOGGED_IN);
  const { data } = useQuery(USER);

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
      <div>
        <h1 onClick={changeEmail}>{data?.user?.email}</h1>
      </div>
    </div>
  );
}

export default About;
