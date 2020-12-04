import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import Loading from "./Loading";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
      setIsLoaded(true);
  }, []);
  
  
  return (
    <>
      { isLoaded ? <AppRouter /> : <Loading /> }
    </>
  );
};

export default App;
