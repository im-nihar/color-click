import React, { useEffect, useState } from "react";
import "./App.css";

let counter = 0;
let isAllSelected = false;
function App() {
  const [stateArray, setStateArray] = useState([]);

  useEffect(() => {
    if (stateArray.some((item) => !item.isSelected)) {
      isAllSelected = false;
    } else {
      isAllSelected = true;
    }
    if (isAllSelected && stateArray.length === 7) {
      stateArray.forEach((item, index) => {
        const newList = [...stateArray];
        setTimeout(() => {
          item.isSelected = false;
          setStateArray(newList);
        }, 1000 * (index + 1));
      });
    }
  }, [stateArray]);

  const getBox = (i, j) => {
    const list = [...stateArray];
    const selectedBox = list.find((item) => item.i === i && item.j === j);
    if (!selectedBox) {
      list.push({ i, j, isSelected: true, order: counter++ });
    }
    setStateArray(list);
  };

  function getBoxes() {
    const boxes = [0, 1, 2].map((i) => {
      return [0, 1, 2].map((j) => {
        if (!(i === 1 && j > 0)) {
          return (
            <div
              onClick={() => getBox(i, j)}
              style={{
                border: "1px solid red",
                height: 50,
                width: 50,
                backgroundColor:
                  stateArray.find(
                    (item) => item.i === i && item.j === j && item.isSelected
                  ) && "red",
              }}
            >
              {i} {j}
            </div>
          );
        }
        return <div></div>;
      });
    });
    return boxes;
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          height: 300,
          width: 300,
        }}
      >
        {getBoxes()}
      </div>
    </div>
  );
}

export default App;
