import React from "react";
import {
  tableHeaders,
  scheduleTableData,
  dropdownOptions,
} from "../utils/helper";
import Dropdown from "../Dropdown/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { selectStaff } from "../Redux/staffActions.js";

const ScheduleTable = ({ onCalculate }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const selectedStaff = useSelector((state) => state.staff.selectedStaff);
  const dispatch = useDispatch();
  const handleScheduleOptionChange = (day, newValue, index) => {
    dispatch(selectStaff({ day, newValue, index }));
  };

  const calculateTotal = (staffMember) => {
    let total = 0;
    for (const day of Object.keys(selectedStaff)) {
      total += selectedStaff[day][staffMember] === "" ? 0 : 1;
    }
    return total;
  };

  const handleCalculate = (event, selectedStaff) => {
    onCalculate(selectedStaff);
  };

  return (
    <div>
      <table>
        <caption>Schedule</caption>
        <thead>
          <tr>
            {tableHeaders.scheduleTable.items.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            {tableHeaders.scheduleTable.days.map((day, dayIndex) => (
              <th key={dayIndex}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduleTableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.TimeSlot}</td>
              {days.map((day, dayIndex) => (
                <td key={dayIndex}>
                  {day === "Time Slot" ? (
                    "-"
                  ) : (
                    <Dropdown
                      options={dropdownOptions}
                      onChange={(e) =>
                        handleScheduleOptionChange(
                          day,
                          e.target.value,
                          rowIndex
                        )
                      }
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={(event) => handleCalculate(event, selectedStaff)}>
        Calculate
      </button>
    </div>
  );
};

export default ScheduleTable;
