import React, { useState } from "react";
import ScheduleTable from "../components/Tables/ScheduleTable";
import LoadTable from "../components/Tables/LoadTable";

const MainPage = () => {
  const [calculatedData, setCalculatedData] = useState(null);
  const [calculationsDone, setCalculationsDone] = useState(false);

  const handleCalculate = (data) => {
    setCalculatedData(data);
    setCalculationsDone(true);
    console.log("data", data);
  };

  return (
    <div>
      <ScheduleTable onCalculate={handleCalculate} />
      <LoadTable data={calculatedData} calculationsDone={calculationsDone} />
    </div>
  );
};

export default MainPage;
