import React, { useState, useEffect } from "react";
import { tableHeaders, loadTableData } from "../utils/helper";

const LoadTable = ({ data, calculationsDone }) => {
  const [filteredLoadTableData, setFilteredLoadTableData] = useState(
    loadTableData.filter((staffMember) => staffMember.StaffMember !== null)
  );

  useEffect(() => {
    setFilteredLoadTableData(
      loadTableData.filter((staffMember) => staffMember.StaffMember !== null)
    );
  }, [data]);

  const calculateTotalWorkedDays = (staffMember) => {
    let totalWorkedDays = 0;

    if (calculationsDone && data) {
      for (const day of tableHeaders.scheduleTable.days) {
        if (
          data[day] &&
          data[day].find((item) => item[staffMember] !== undefined)
        ) {
          totalWorkedDays++;
        }
      }
    }

    return totalWorkedDays;
  };

  return (
    <table>
      <caption>Load</caption>
      <thead>
        <tr>
          <th>Staff Member</th>
          {tableHeaders.scheduleTable.days.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {filteredLoadTableData.map((staffMember, index) => (
          <tr key={index}>
            <td>{staffMember.StaffMember}</td>
            {tableHeaders.scheduleTable.days.map((day, dayIndex) => (
              <td key={dayIndex}>
                {data &&
                data[day] &&
                data[day].find(
                  (item) => item[staffMember.StaffMember] !== undefined
                )
                  ? "Y"
                  : "-"}
              </td>
            ))}
            <td>{calculateTotalWorkedDays(staffMember.StaffMember)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LoadTable;
