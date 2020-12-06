import React, { useState, useEffect } from "react";
import { dbService } from '../fbase';
import AOS from "aos";
import "aos/dist/aos.css";
import AppRouter from "./Router";
import Loading from "./Loading";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (dbService) {
      setIsLoaded(true);
    };
    AOS.init();
    AOS.refresh();
  }, []);
  
  return (
    <>
      { isLoaded ? <AppRouter /> : <Loading /> }
    </>
  );
};

export default App;
