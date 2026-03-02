import { useMutation } from "@apollo/client/react";
import React, { useState } from "react";
import { ALL_AUTHORS, SET_BIRTH_YEAR } from "../queries";

const defaultVariables = {
  name: "",
  year: 1820,
};

export default function SetBirthYear({ authorsName }) {
  const [variables, setVariables] = useState(defaultVariables);
  const [setBirthYear] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ variables });
    setBirthYear({ variables });
    setVariables(defaultVariables);
  };

  return (
    <div>
      <div>
        <h3>Set BirthYear</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              name
              <select
                name="authorName"
                id="authorName"
                value={variables.name}
                onChange={({ target }) =>
                  setVariables((prev) => ({ ...prev, name: target.value }))
                }
              >
                <option value="" disabled>
                  select an author
                </option>
                {authorsName.map((a) => (
                  <option value={a} key={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              born{" "}
              <input
                type="number"
                min={1800}
                max={2020}
                value={variables.year}
                onChange={({ target }) =>
                  setVariables((prev) => ({ ...prev, year: target.value }))
                }
              />
            </label>
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
}
