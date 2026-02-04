import { useState, useEffect } from "react";
import Card from "./components/Card";

function App() {
  const [count, setCount] = useState(() => {
    return Number(localStorage.getItem("count")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  return (
    <>
      <div Display="flex">
        <Card image="/luffy.png" />
        <button 
          onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
        <button 
          onClick={() => setCount(count - 1)}>
          Count: {count}
        </button>
        
      </div>
      
    </>
  );
}

export default App;