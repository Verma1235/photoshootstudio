import { useState } from "react";
import { UserDashboard } from "./pages/dashboard.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserDashboard></UserDashboard>
    </>
  );
}

export default App;
