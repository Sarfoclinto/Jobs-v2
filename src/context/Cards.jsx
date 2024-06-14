import React, { createContext, useState, useEffect } from "react";

export const CardsContext = createContext();

function CardsContextProvider(props) {
  const [allCards, setAllCards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [onecard, setOneCard] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8001/all")
      .then((res) => {
        if (!res) {
          throw Error("Response not found");
        }
        return res.json();
      })
      .then((data) => {
        setAllCards(data);
        setOneCard(data[0]);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.log("Error: ", err.message);
      });
  }, []);
  return (
    <CardsContext.Provider
      value={{
        allCards,
        setAllCards,
        loading,
        setLoading,
        error,
        setError,
        onecard,
      }}
    >
      {props.children}
    </CardsContext.Provider>
  );
}

export default CardsContextProvider;
