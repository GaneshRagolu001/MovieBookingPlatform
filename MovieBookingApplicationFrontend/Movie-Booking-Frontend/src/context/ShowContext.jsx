import { createContext, useContext, useState } from "react";

const ShowContext = createContext();

export function ShowProvider({ children }) {
  const [show, setShow] = useState(null);
  const [theater, setTheater] = useState(null);

  function addShowAndTheater(currentShow, currentTheater) {
    const prevshow = localStorage.getItem("show");
    const prevtheater = localStorage.getItem("theater");
    if (prevshow || prevtheater) {
      localStorage.removeItem("show");
      localStorage.removeItem("theater");
    }
    localStorage.setItem("show", JSON.stringify(currentShow));
    localStorage.setItem("theater", JSON.stringify(currentTheater));
    setShow(currentShow);
    setTheater(currentTheater);
  }

  return (
    <ShowContext.Provider value={{ show, theater, addShowAndTheater }}>
      {children}
    </ShowContext.Provider>
  );
}

export const ShowAndTheater = () => useContext(ShowContext);
