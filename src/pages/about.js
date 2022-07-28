import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/counterSlice";
import CAN from "../casl/can";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CARS, IS_LOGGED_IN, USER } from "../graphql/queries";
import { user } from "../store";
import { ADD_CAR } from "../graphql/mutations";

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
  // const { data } = useQuery(USER);
  const { loading, error, data } = useQuery(GET_CARS);
  const [addCar] = useMutation(ADD_CAR, {
    update(cache, { data: { addCar } }) {
      // update function using write query to add a new car

      // const { cars } = cache.readQuery({ query: GET_CARS });
      // cache.writeQuery({
      //   query: GET_CARS,
      //   data: { cars: [...cars.concat([addCar])] },
      // });

      // update function using update query to update a chached data

      cache.updateQuery({ query: GET_CARS }, (data) => ({
        cars: [...data.cars.concat([addCar])],
      }));

      // update function using modify to add a new car

      // cache.modify({
      //   fields: {
      //     cars: (cars = []) => {
      //       return cars.concat([addCar]);
      //     },
      //   },
      // });

      // update function using modify to modify a single field in a chache object

      // cache.modify({
      //   id: cache.identify(data?.cars[1]),

      //   fields: {
      //     name(cachedName) {
      //       return cachedName.toUpperCase();
      //     },
      //   },
      // });

      // update function using modify to delete an item in a chache

      // cache.modify({
      //   fields: {
      //     cars: (cars = [], { readField }) => {
      //       return cars.filter((car) => addCar._id !== readField('_id', car));
      //     }
      //   }
      // })
    },
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
      {/* <div>
        <h1 onClick={changeEmail}>{data?.user?.email}</h1>
      </div> */}

      <div>
        {loading ? (
          <p>loading...</p>
        ) : (
          data?.cars?.map((car) => <h1 key={car._id}>{car.name}</h1>)
        )}
      </div>

      <button
        onClick={() =>
          addCar({
            variables: {
              carInput: {
                _id: Math.ceil(Math.random() * 5 + 4),
                name: "libe",
              },
            },
          })
        }
      >
        add car
      </button>
    </div>
  );
}

export default About;
