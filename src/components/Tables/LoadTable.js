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
    if (!calculationsDone || !data) {
      return 0;
    }

    let totalWorkedDays = 0;

    for (const day of tableHeaders.scheduleTable.days) {
      if (data[day]) {
        const staffMemberItems = data[day].filter(
          (item) => item["employeeName"] === staffMember
        );
        totalWorkedDays += staffMemberItems.length;
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
                  (item) => item["employeeName"] === staffMember.StaffMember
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
