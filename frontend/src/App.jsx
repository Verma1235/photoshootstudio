import { useState } from "react";
import { UserDashboard } from "./pages/dashboard.jsx";
import { TechQvAi } from "./pages/TechQvAi.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserDashboard/>
      <TechQvAi/>
    </>
  );
}

export default App;
