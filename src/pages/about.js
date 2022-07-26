import React from "react";
import { gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { client } from "../index";
import { decrement, increment } from "../redux/counterSlice";
import CAN from "../casl/can";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN, USER } from "../graphql/queries";
import { user } from "../store";

const changeEmail = () => {
  client.writeFragment({
    id: "User:ec9a7a2c-2e8c-48ed-808e-ccba71698fb2", // The value of the to-do item's cache ID

    fragment: gql`
      fragment NewUser on User {
        email
      }
    `,
    data: {
      email: "libe@mail.com",
    },
  });

  user({
    ...user(),
    email: "libe@libe.com"
  })
};

function About() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // const { data } = useQuery(IS_LOGGED_IN);
  const { data } = useQuery(USER);
  console.log(data)

  const user = client.readFragment({
    id: "User:ec9a7a2c-2e8c-48ed-808e-ccba71698fb2", // The value of the to-do item's cache ID

    fragment: gql`
      fragment MyUser on User {
        id
        email
      }
    `,
  });

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
