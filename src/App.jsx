import React, { useState } from "react";
import AttendanceForm from "./AttendanceForm";
import Statistics from "./Statistics";

function App() {
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = () => setRefresh(prev => prev + 1);

  return (
    <div>
      <h1>Электронный учёт посещаемости</h1>
      <AttendanceForm onSave={triggerRefresh} />
      <hr />
      <Statistics refreshKey={refresh} />
    </div>
  );
}

export default App;
